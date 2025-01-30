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

      // Handle date sorting
      if (valueA instanceof Date || valueB instanceof Date) {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
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
}
