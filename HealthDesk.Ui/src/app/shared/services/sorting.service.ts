import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  /**
   * Sorts an array of objects based on the specified column and direction.
   *
   * @param data - The array of objects to sort.
   * @param column - The column to sort by.
   * @param direction - The direction to sort ('asc' or 'desc').
   * @returns - The sorted array.
   */
  sort<T>(data: T[], column: string, direction: 'asc' | 'desc'): T[] {
    if (!data || !column) return data;

    return data.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      // Handle null or undefined values
      if (valueA == null) return direction === 'asc' ? 1 : -1;
      if (valueB == null) return direction === 'asc' ? -1 : 1;

      // Handle ISO 8601 date strings (e.g., "2025-02-04T00:00:00Z")
      if (this.isISODate(valueA) || this.isISODate(valueB)) {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // Handle regular Date objects
      if (valueA instanceof Date || valueB instanceof Date) {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // Handle time formats (hh:mm AM/PM and HH:mm)
      if (this.isTimeFormat(valueA) && this.isTimeFormat(valueB)) {
        const timeA = this.convertTimeTo24Hour(valueA);
        const timeB = this.convertTimeTo24Hour(valueB);
        return direction === 'asc' ? timeA - timeB : timeB - timeA;
      }

      // Handle numeric sorting
      if (!isNaN(parseFloat(valueA)) && !isNaN(parseFloat(valueB))) {
        const numA = parseFloat(valueA);
        const numB = parseFloat(valueB);
        return direction === 'asc' ? numA - numB : numB - numA;
      }

      // Default: Handle string sorting (case-insensitive)
      return valueA.toString().localeCompare(valueB.toString(), undefined, {
        numeric: true,
        sensitivity: 'base',
      }) * (direction === 'asc' ? 1 : -1);
    });
  }

  /**
   * Checks if the value is an ISO 8601 formatted date string.
   */
  private isISODate(value: any): boolean {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(value);
  }

  /**
   * Checks if the value is a time format (12-hour AM/PM or 24-hour)
   */
  private isTimeFormat(value: any): boolean {
    return typeof value === 'string' && /^(\d{1,2}):(\d{2})(\s?[APap][Mm])?$/.test(value);
  }

  /**
   * Converts time to 24-hour format in minutes.
   */
  private convertTimeTo24Hour(time: string): number {
    let hours: number, minutes: number;
    
    // Handle 12-hour format (e.g., "02:30 PM")
    if (/AM|PM/i.test(time)) {
      const [timePart, meridian] = time.split(' ');
      [hours, minutes] = timePart.split(':').map(Number);
      if (meridian.toUpperCase() === 'PM' && hours !== 12) hours += 12;
      if (meridian.toUpperCase() === 'AM' && hours === 12) hours = 0;
    } else {
      // Handle 24-hour format (e.g., "14:30")
      [hours, minutes] = time.split(':').map(Number);
    }

    return hours * 60 + minutes; // Convert to minutes for sorting
  }
}
