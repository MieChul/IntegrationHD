using System.Collections;
using System.Reflection;

namespace HealthDesk.Application
{
    public static class GenericMapper
    {
        public static TDestination Map<TSource, TDestination>(TSource source, TDestination destination = null)
            where TDestination : class, new()
        {
            if (source == null)
                throw new ArgumentNullException(nameof(source), "Source cannot be null");

            destination ??= new TDestination();

            var sourceProperties = typeof(TSource).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            var destinationProperties = typeof(TDestination).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (var sourceProperty in sourceProperties)
            {
                var destProp = destinationProperties.FirstOrDefault(prop => prop.Name == sourceProperty.Name && prop.CanWrite);
                if (destProp == null) continue;

                var sourceValue = sourceProperty.GetValue(source);
                if (sourceValue == null) continue;

                var sourceType = sourceProperty.PropertyType;
                var destType = destProp.PropertyType;

                try
                {
                    // Handle collections
                    if (IsList(sourceType) && IsList(destType))
                    {
                        var sourceList = (IEnumerable)sourceValue;
                        var destList = (IList)(Activator.CreateInstance(destType) ?? throw new InvalidOperationException());
                        var sourceItemType = sourceType.GetGenericArguments()[0];
                        var destItemType = destType.GetGenericArguments()[0];

                        foreach (var item in sourceList)
                        {
                            if (IsComplexType(sourceItemType) && IsComplexType(destItemType))
                            {
                                var destItem = Activator.CreateInstance(destItemType);
                                var mapMethod = typeof(GenericMapper)
                                    .GetMethod(nameof(Map))!
                                    .MakeGenericMethod(sourceItemType, destItemType);
                                var mappedItem = mapMethod.Invoke(null, new[] { item, destItem });
                                destList.Add(mappedItem);
                            }
                            else
                            {
                                destList.Add(ConvertIfNeeded(item, destItemType));
                            }
                        }
                        destProp.SetValue(destination, destList);
                    }
                    // Handle nested complex object
                    else if (IsComplexType(sourceType) && IsComplexType(destType))
                    {
                        var nestedDest = Activator.CreateInstance(destType);
                        Map(sourceValue, nestedDest);
                        destProp.SetValue(destination, nestedDest);
                    }
                    else if (!IsComplexType(sourceType) && IsComplexType(destType))
                    {
                        continue;
                    }
                    else
                    {
                        var convertedValue = ConvertIfNeeded(sourceValue, destType);
                        destProp.SetValue(destination, convertedValue);
                    }
                }
                catch
                {
                    continue;
                }
            }

            return destination;
        }

        private static object ConvertIfNeeded(object value, Type destinationType)
        {
            if (value == null) return null;
            var valueType = value.GetType();

            if (destinationType.IsAssignableFrom(valueType))
                return value;

            try
            {
                var underlyingType = Nullable.GetUnderlyingType(destinationType);
                if (underlyingType != null)
                    return Convert.ChangeType(value, underlyingType);

                return Convert.ChangeType(value, destinationType);
            }
            catch
            {
                return value;
            }
        }

        private static bool IsList(Type type)
        {
            return type.IsGenericType && typeof(IEnumerable).IsAssignableFrom(type) && type != typeof(string);
        }

        private static bool IsComplexType(Type type)
        {
            return type.IsClass && type != typeof(string);
        }
    }
}