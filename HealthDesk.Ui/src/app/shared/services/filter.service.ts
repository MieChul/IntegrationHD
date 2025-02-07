import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilteringService {
  /**
   * Filters an array of objects based on multiple criteria, including date and time.
   *
   * @param data - The array of objects to filter.
   * @param filters - The filtering criteria.
   * @param dateFields - Array of date field configurations (optional).
   * @param emptyMeansAll - If true, empty filters do not exclude results (default: false).
   * @returns - The filtered array.
   */
  filter<T extends Record<string, any>>(
    data: T[],
    filters: { [key: string]: any },
    dateFields: { field: keyof T; range: [string | null, string | null] }[] = [],
    emptyMeansAll: boolean = false
  ): T[] {
    return data.filter(item => {
      // Apply generic filters
      for (const key in filters) {
        const filterValue = filters[key];

        // Skip empty filters only if emptyMeansAll is true
        if (emptyMeansAll && (filterValue == null || filterValue === '')) {
          continue;
        }

        if (typeof filterValue === 'string') {
          // Handle case-insensitive string matching
          const itemValue = item[key]?.toString().toLowerCase() || '';
          if (!itemValue.includes(filterValue.toLowerCase())) {
            return false;
          }
        } else {
          // Handle exact match for other types
          if (item[key] !== filterValue) {
            return false;
          }
        }
      }

      // Apply date and time filters
      for (const { field, range } of dateFields) {
        const [startDateStr, endDateStr] = range;
        const itemDateStr = item[field] as any;

        // Convert input dates to comparable formats
        const itemDate = this.parseDateTime(itemDateStr);
        const startDate = startDateStr ? this.parseDateTime(startDateStr) : null;
        const endDate = endDateStr ? this.parseDateTime(endDateStr) : null;

        if (isNaN(itemDate.getTime())) {
          return false; // Exclude invalid dates
        }

        // Handle single date filtering when only one boundary is present
        if (startDate && !endDate) {
          if (itemDate.toDateString() !== startDate.toDateString()) {
            return false;
          }
        } else if (!startDate && endDate) {
          if (itemDate.toDateString() !== endDate.toDateString()) {
            return false;
          }
        } else if (startDate && endDate) {
          // Inclusive range filtering
          if (itemDate < startDate || itemDate > endDate) {
            return false;
          }
        }
      }

      return true;
    });
  }

  /**
   * Parses a date string into a JavaScript Date object, supporting:
   * - ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
   * - Standard formats (MM/DD/YYYY, DD/MM/YYYY)
   * - 12-hour (hh:mm AM/PM) and 24-hour (HH:mm) time formats
   */
  private parseDateTime(dateStr: string): Date {
    if (!dateStr) return new Date(NaN); // Return invalid date

    // Attempt ISO format parsing
    if (!isNaN(Date.parse(dateStr))) {
      return new Date(dateStr);
    }

    // Handle 12-hour and 24-hour time formats
    const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM)?$/i;
    const match = dateStr.match(timeRegex);

    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const period = match[3];

      if (period) {
        // Convert 12-hour to 24-hour format
        if (period.toUpperCase() === 'PM' && hours !== 12) {
          hours += 12;
        } else if (period.toUpperCase() === 'AM' && hours === 12) {
          hours = 0;
        }
      }

      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    }

    // Attempt parsing as standard date format (e.g., MM/DD/YYYY or DD/MM/YYYY)
    const standardDate = new Date(dateStr);
    return isNaN(standardDate.getTime()) ? new Date(NaN) : standardDate;
  }
}
