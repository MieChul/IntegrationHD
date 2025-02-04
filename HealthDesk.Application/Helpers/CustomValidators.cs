using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace HealthDesk.Application;


public class FutureDateAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is DateTime dateValue)
        {
            if (dateValue.Date < DateTime.Today)
            {
                return new ValidationResult("Appointment date cannot be in the past.");
            }
        }
        return ValidationResult.Success;
    }
}

public class TimeNotInPastAttribute : ValidationAttribute
{
    private readonly string _datePropertyName;

    public TimeNotInPastAttribute(string datePropertyName)
    {
        _datePropertyName = datePropertyName;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var dateProperty = validationContext.ObjectType.GetProperty(_datePropertyName);
        if (dateProperty == null)
        {
            return new ValidationResult($"Unknown property: {_datePropertyName}");
        }

        var dateValue = (DateTime?)dateProperty.GetValue(validationContext.ObjectInstance);
        if (dateValue == null)
        {
            return new ValidationResult("Date must be provided.");
        }

        if (value is string timeString)
        {
            if (DateTime.TryParseExact(timeString, "hh:mm tt", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedTime))
            {
                var appointmentDateTime = dateValue.Value.Date.Add(parsedTime.TimeOfDay);
                if (appointmentDateTime < DateTime.Now)
                {
                    return new ValidationResult("Appointment date and time cannot be in the past.");
                }
            }
            else
            {
                return new ValidationResult("Invalid time format. Expected format: hh:mm AM/PM");
            }
        }

        return ValidationResult.Success;
    }
}
