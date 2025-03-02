import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

interface DrugEntry {
  name: string;
  dosageForm: string;
  strengthUnit: string;
}

interface SelfRecordEntry {
  recordType: string;
  unit: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database: {
    Drugs: string[];
    Strengths: string[];
    Frequencies: string[];
    Systems: string[];
    Routes: string[];
    Forms: string[];
    Symptoms: string[];
    Vaccines: string[];
    Durations: string[];
    Investigations: string[];
    Councils: string[];
    Assessments: string[];
    Colleges: string[];
    Brands: string[];
    SelfRecords: string[];
    Foods: string[]; // Changed to object array
    Exercises: string[]; // Changed to object array
  } = {
      Drugs: [],
      Strengths: [],
      Frequencies: [],
      Systems: [],
      Routes: [],
      Forms: [],
      Symptoms: [],
      Vaccines: [],
      Durations: [],
      Investigations: [],
      Councils: [],
      Assessments: [],
      Colleges: [],
      Brands: [],
      SelfRecords: [],
      Foods: [],
      Exercises: []
    };

  private drugData: DrugEntry[] = [];
  private selfRecordData: SelfRecordEntry[] = [];
  private readonly CACHE_KEY = 'databaseCache';
  private isLoaded = false;

  async loadDatabase(): Promise<void> {
    if (this.isLoaded) return;

    // Check for cached data
    const cachedData = sessionStorage.getItem(this.CACHE_KEY);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      this.database = parsedData.database;
      this.drugData = parsedData.drugData || [];
      this.selfRecordData = parsedData.selfRecordData || [];
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
          if (sheetName === 'Drugs') {
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            // Assuming the first row is a header and:
            // Column 0: drug name, Column 1: dosage form, Column 2: strength unit.
            const entries: DrugEntry[] = data
              .map((row: any) => ({
                name: row[0] as string,
                dosageForm: row[1] as string,
                strengthUnit: row[2] as string,
              }))
              .filter((entry) => entry.name); // Filter out rows without a drug name

            this.drugData = entries;
            // Populate the Drugs array with unique drug names.
            this.database.Drugs = Array.from(
              new Set(entries.map((entry) => entry.name))
            ).filter(Boolean);
          }
          else if (sheetName === 'SelfRecords') {
            // Load SelfRecords data
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            const entries: SelfRecordEntry[] = data
              .map((row: any) => ({
                recordType: row[0] as string,
                unit: row[1] as string,
              }))
              .filter((entry) => entry.recordType);

            this.selfRecordData = entries;
            this.database.SelfRecords = Array.from(new Set(entries.map((entry) => entry.recordType))).filter(Boolean);
          }
          else if (sheetName === 'Foods') {
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            // Assuming Column 0: Food name, Column 1: Calories
            this.database.Foods = data
              .map((row: any) => `${row[0]}: ${parseInt(row[1], 10)}`)
              .filter(entry => entry && !entry.includes('NaN'));
          }
          else if (sheetName === 'Exercises') {
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            // Assuming Column 0: Exercise name, Column 1: Calories burnt per minute
            this.database.Exercises = data
              .map((row: any) => `${row[0]}: ${parseInt(row[1], 10)}`)
              .filter(entry => entry && !entry.includes('NaN'));
          }
          else {
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            const columnA = data.map((row: any) => row[0] as string); // Skip header row
            this.database[sheetName as keyof typeof this.database] = Array.from(
              new Set(columnA)
            ).filter((value) => value); // Remove duplicates and blanks
          }
        }
      }

      // Cache the database for future use
      sessionStorage.setItem(this.CACHE_KEY, JSON.stringify({
        database: this.database,
        drugData: this.drugData,
        selfRecordData: this.selfRecordData
      }));
      this.isLoaded = true;
      console.log('Database loaded and cached successfully.');
    } catch (error) {
      console.error('Error loading database:', error);
    }
  }

  clearCache(): void {
    sessionStorage.removeItem(this.CACHE_KEY);
    this.isLoaded = false;
  }

  // Type-safe getters
  getDrugs(): string[] {
    return this.database.Drugs;
  }

  getStrengths(drugName: string,
    dosageForm: string): string[] {
    const strengthUnits = this.drugData
      .filter(
        (entry) => entry.name === drugName && entry.dosageForm === dosageForm
      )
      .map((entry) => entry.strengthUnit)
      .filter(Boolean);
    return Array.from(new Set(strengthUnits));
  }

  getFrequencies(): string[] {
    return this.database.Frequencies;
  }

  getSystems(): string[] {
    return this.database.Systems;
  }

  getRoutes(): string[] {
    return this.database.Routes;
  }

  getForms(drugName: string): string[] {
    const dosageForms = this.drugData
      .filter((entry) => entry.name === drugName)
      .map((entry) => entry.dosageForm)
      .filter(Boolean);
    return Array.from(new Set(dosageForms));
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

  getInvestigations(): string[] {
    return this.database.Investigations;
  }

  getCouncils(): string[] {
    return this.database.Councils;
  }

  getAssessments(): string[] {
    return this.database.Assessments;
  }

  getMedicalColleges(): string[] {
    return this.database.Colleges;
  }

  getDrugBrands(): string[] {
    return this.database.Brands;
  }

  getSelfRecords(): string[] {
    return this.database.SelfRecords;
  }

  getSelfRecordUnit(recordType: string): string | null {
    const record = this.selfRecordData.find((entry) => entry.recordType === recordType);
    return record ? record.unit : null;
  }

  getUnits() {
    return this.database.Strengths;
  }

  getDosageForms() {
    return this.database.Forms;
  }

  getFoodItems(): { name: string; calories: number }[] {
    return this.database.Foods.map((item: any) => {
      const [name, calories] = item.split(':');
      return {
        name: name.trim(),
        calories: Number(calories) || 0
      };
    });
  }

  getExercises(): { name: string; calories: number }[] {
    return this.database.Exercises.map((item: any) => {
      const [name, calories] = item.split(':');
      return {
        name: name.trim(),
        calories: Number(calories) || 0
      };
    });
  }
}
