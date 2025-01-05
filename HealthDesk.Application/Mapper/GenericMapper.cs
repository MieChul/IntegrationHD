using System.Collections;
using System.Reflection;

namespace HealthDesk.Application;

public static class GenericMapper
{
    public static TDestination Map<TSource, TDestination>(TSource source, TDestination destination = null)
        where TDestination : class, new()
    {
        if (source == null)
            throw new ArgumentNullException(nameof(source), "Source cannot be null");

        // Create a new instance of destination if not provided
        destination ??= new TDestination();

        var sourceProperties = typeof(TSource).GetProperties(BindingFlags.Public | BindingFlags.Instance);
        var destinationProperties = typeof(TDestination).GetProperties(BindingFlags.Public | BindingFlags.Instance);

        foreach (var sourceProperty in sourceProperties)
        {
            var destinationProperty = destinationProperties.FirstOrDefault(prop =>
                prop.Name == sourceProperty.Name &&
                prop.CanWrite &&
                AreTypesCompatible(sourceProperty.PropertyType, prop.PropertyType));

            if (destinationProperty != null)
            {
                var sourceValue = sourceProperty.GetValue(source);

                if (sourceValue == null) continue;

                // Handle collections
                if (IsList(sourceProperty.PropertyType))
                {
                    var sourceList = (IEnumerable)sourceValue;

                    // Ensure destination list is initialized
                    var destinationList = (IList)destinationProperty.GetValue(destination) ??
                                          (IList)Activator.CreateInstance(destinationProperty.PropertyType);

                    foreach (var item in sourceList)
                    {
                        if (IsComplexType(item.GetType()))
                        {
                            var destinationItem = Activator.CreateInstance(destinationProperty.PropertyType.GenericTypeArguments[0]);
                            Map(item, destinationItem);
                            destinationList.Add(destinationItem);
                        }
                        else
                        {
                            destinationList.Add(item);
                        }
                    }

                    destinationProperty.SetValue(destination, destinationList);
                }
                else if (IsComplexType(sourceProperty.PropertyType))
                {
                    // Handle complex nested objects
                    var destinationValue = destinationProperty.GetValue(destination) ??
                                           Activator.CreateInstance(destinationProperty.PropertyType);
                    Map(sourceValue, destinationValue);
                    destinationProperty.SetValue(destination, destinationValue);
                }
                else
                {
                    // Handle simple types
                    destinationProperty.SetValue(destination, sourceValue);
                }
            }
        }

        return destination;
    }

    private static bool AreTypesCompatible(Type sourceType, Type destinationType)
    {
        if (destinationType.IsAssignableFrom(sourceType)) return true;

        // Handle nullable types
        if (destinationType.IsGenericType && destinationType.GetGenericTypeDefinition() == typeof(Nullable<>))
        {
            return Nullable.GetUnderlyingType(destinationType) == sourceType;
        }

        return false;
    }

    private static bool IsList(Type type)
    {
        return type.IsGenericType && typeof(IEnumerable).IsAssignableFrom(type) && type != typeof(string);
    }

    private static bool IsComplexType(Type type)
    {
        return type.IsClass && type != typeof(string) && !IsList(type);
    }
}
