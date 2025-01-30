import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilteringService {
  /**
   * Filters an array of objects based on multiple criteria, including date range.
   *
   * @param data - The array of objects to filter.
   * @param filters - The filtering criteria.
   * @param dateFields - Array of date field configurations (optional).
   * @returns - The filtered array.
   */
  filter<T extends Record<string, any>>(
    data: T[],
    filters: { [key: string]: any },
    dateFields: { field: keyof T; range: [string | null, string | null] }[] = []
  ): T[] {
    return data.filter(item => {
      // Apply generic filters
      for (const key in filters) {
        const filterValue = filters[key];

        // Skip empty filters
        if (filterValue == null || filterValue === '') {
          continue;
        }

        if (typeof filterValue === 'string') {
          // Handle string matching (case-insensitive)
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

      // Apply date range filters
      for (const { field, range } of dateFields) {
        const [startDate, endDate] = range.map(date => (date ? new Date(date) : null));
        const itemDate = new Date(item[field] as any);

        if (
          isNaN(itemDate.getTime()) || // Invalid date
          (startDate && itemDate < startDate) || // Exclude items before startDate if provided
          (endDate && itemDate > endDate)       // Exclude items after endDate if provided
        ) {
          return false;
        }
      }

      return true;
    });
  }
}
