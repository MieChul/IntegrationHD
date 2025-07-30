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

    // First, determine if any filter has actually been provided
    const hasGenericFilters = Object.values(filters).some(v => v != null && v !== '');
    const hasDateFilters = dateFields.some(df => df.range[0] != null || df.range[1] != null);
    const hasAnyFilter = hasGenericFilters || hasDateFilters;

    // If no filters are provided and emptyMeansAll is true, return the original data
    if (!hasAnyFilter && emptyMeansAll) {
      return data;
    }

    return data.filter(item => {
      // 1. Apply generic filters (AND logic: must match all provided filters)
      const matchesGenericFilters = Object.keys(filters).every(key => {
        const filterValue = filters[key];
        // If the filter is empty, it doesn't fail the condition
        if (filterValue == null || filterValue === '') {
          return true;
        }

        const itemValue = item[key]?.toString().toLowerCase() || '';
        if (typeof filterValue === 'string') {
          return itemValue.includes(filterValue.toLowerCase());
        } else {
          return item[key] === filterValue;
        }
      });

      // If a generic filter was applied and it failed, we can stop here
      if (hasGenericFilters && !matchesGenericFilters) {
        return false;
      }

      // 2. Apply date filters (AND logic: must match all provided date ranges)
      const matchesDateFilters = dateFields.every(dateFilter => {
        const { field, range } = dateFilter;
        const [startDateStr, endDateStr] = range;

        const itemDateStr = item[field] as string;
        const itemDate = this.parseDateTime(itemDateStr);

        // If the date in the item is invalid, it fails the filter
        if (!itemDate) return false;

        const startDate = startDateStr ? this.parseDateTime(startDateStr) : null;
        let endDate = endDateStr ? this.parseDateTime(endDateStr) : null;

        // Adjust the end date to include the entire day
        if (endDate) {
          endDate.setHours(23, 59, 59, 999);
        }

        const afterStartDate = !startDate || itemDate >= startDate;
        const beforeEndDate = !endDate || itemDate <= endDate;

        return afterStartDate && beforeEndDate;
      });

      return matchesGenericFilters && matchesDateFilters;
    });
  }

  /**
   * Corrected and robust date parsing function.
   * Prioritizes ISO format and explicitly handles dd-MM-yyyy.
   */
  private parseDateTime(dateStr: string): Date | null {
    if (!dateStr) {
      return null;
    }

    // Most reliable method: Parse ISO 8601 string (e.g., "2025-07-27T10:30:00.000Z")
    const isoDate = new Date(dateStr);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }

    // Fallback for dd-MM-yyyy format
    const parts = dateStr.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (parts) {
      // Month is 0-indexed in JavaScript Date objects
      return new Date(parseInt(parts[3]), parseInt(parts[2]) - 1, parseInt(parts[1]));
    }

    return null; // Return null for any other invalid format
  }
}