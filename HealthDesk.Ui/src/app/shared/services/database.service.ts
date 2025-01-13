import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database: {
    Drugs: string[];
    Strengths: string[];
    Frequency: string[];
    Systems: string[];
    Routes: string[];
    Forms: string[];
    Symptoms: string[];
    Vaccines: string[];
    Durations: string[];
    Tests: string[];
    Councils: string[];
  } = {
    Drugs: [],
    Strengths: [],
    Frequency: [],
    Systems: [],
    Routes: [],
    Forms: [],
    Symptoms: [],
    Vaccines: [],
    Durations: [],
    Tests: [],
    Councils: [],
  };

  private readonly CACHE_KEY = 'databaseCache';
  private isLoaded = false;

  async loadDatabase(): Promise<void> {
    if (this.isLoaded) return;

    // Check for cached data
    const cachedData = localStorage.getItem(this.CACHE_KEY);
    if (cachedData) {
      this.database = JSON.parse(cachedData);
      this.isLoaded = true;
      console.log('Loaded database from cache.');
      return;
    }

    // If no cache, load from XLSX
    const filePath = 'assets/db/database.xlsx';
    try {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      for (const sheetName of Object.keys(this.database)) {
        const sheet = workbook.Sheets[sheetName];
        if (sheet) {
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const columnA = data.slice(1).map((row: any) => row[0] as string); // Skip header row
          this.database[sheetName as keyof typeof this.database] = Array.from(
            new Set(columnA)
          ).filter((value) => value); // Remove duplicates and blanks
        }
      }

      // Cache the database for future use
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.database));
      this.isLoaded = true;
      console.log('Database loaded and cached successfully.');
    } catch (error) {
      console.error('Error loading database:', error);
    }
  }

  clearCache(): void {
    localStorage.removeItem(this.CACHE_KEY);
    this.isLoaded = false;
  }

  // Type-safe getters
  getDrugs(): string[] {
    return this.database.Drugs;
  }

  getStrengths(): string[] {
    return this.database.Strengths;
  }

  getFrequency(): string[] {
    return this.database.Frequency;
  }

  getSystems(): string[] {
    return this.database.Systems;
  }

  getRoutes(): string[] {
    return this.database.Routes;
  }

  getForms(): string[] {
    return this.database.Forms;
  }

  getSymptoms(): string[] {
    return this.database.Symptoms;
  }

  getVaccines(): string[] {
    return this.database.Vaccines;
  }

  getDurations(): string[] {
    return this.database.Durations;
  }

  getTests(): string[] {
    return this.database.Tests;
  }

  getCouncils(): string[] {
    return this.database.Councils;
  }
}
