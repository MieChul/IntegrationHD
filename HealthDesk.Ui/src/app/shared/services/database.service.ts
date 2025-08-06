import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import * as XLSX from 'xlsx';


interface BrandEntry {
  brand: string;
  drug: string;
  form: string;
  strength: string;
}

interface BrandDto {
  brandName: string;
  genericName: string;
  dosageForm: string;
  strength: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface SelfRecordEntry {
  recordType: string;
  unit: string;
}

interface InvestigationEntry {
  name: string;
  unit: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private http = inject(HttpClient);
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
    Foods: string[];
    Exercises: string[];
    Specializations: string[];
    Specialities: string[];
    Graduations: string[];
    HospitalServices: string[];
    PostGraduations: string[];
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
      Exercises: [],
      Specializations: [],
      Specialities: [],
      Graduations: [],
      PostGraduations: [],
      HospitalServices: []
    };

  private brandData: BrandEntry[] = [];
  private selfRecordData: SelfRecordEntry[] = [];
  private investigationData: InvestigationEntry[] = [];
  private readonly CACHE_KEY = 'databaseCache';
  private isLoaded = false;
  constructor() { }

  async loadDatabase(): Promise<void> {
    if (this.isLoaded) return;

    const cachedData = sessionStorage.getItem(this.CACHE_KEY);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      this.database = parsedData.database;
      this.brandData = parsedData.brandData || [];
      this.selfRecordData = parsedData.selfRecordData || [];
      this.investigationData = parsedData.investigationData || [];
      this.isLoaded = true;
      console.log('Loaded database from cache.');
      return;
    }

    try {
      const [apiBrands, workbook] = await Promise.all([
        this.fetchBrandsFromApi(),
        this.fetchWorkbook(),
      ]);

      this.processAndCombineBrandData(apiBrands, workbook);

      this.processOtherSheets(workbook);

      this.cacheDatabase();

      this.isLoaded = true;
      console.log('Database loaded from source and cached successfully.');
    } catch (error) {
      console.error('Error loading database:', error);
    }
  }

  private async fetchBrandsFromApi(): Promise<BrandEntry[]> {
    try {
      const response = await firstValueFrom(
        this.http.get<ApiResponse<BrandDto[]>>('/api/common/brands')
      );
      if (response && response.success) {
        return response.data.map(dto => ({
          brand: dto.brandName,
          drug: dto.genericName,
          form: dto.dosageForm,
          strength: dto.strength
        }));
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch brands from API:', error);
      return [];
    }
  }

  private async fetchWorkbook(): Promise<XLSX.WorkBook> {
    const filePath = 'assets/db/database.xlsx';
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    return XLSX.read(arrayBuffer, { type: 'array' });
  }

  private processAndCombineBrandData(apiBrands: BrandEntry[], workbook: XLSX.WorkBook): void {
    const combinedBrands = new Map<string, BrandEntry>();

    apiBrands.forEach(entry => {
      const key = `${entry.brand}|${entry.drug}|${entry.form}|${entry.strength}`.toLowerCase();
      combinedBrands.set(key, entry);
    });

    
    const sheet = workbook.Sheets['Drugs'];
    if (sheet) {
      const excelData = XLSX.utils.sheet_to_json<any>(sheet, { header: 1 });
      excelData.forEach((row: any[]) => {
        const entry: BrandEntry = {
          brand: row[0],
          drug: row[1],
          form: row[2],
          strength: row[3]
        };
        if (!entry.brand || !entry.drug) return; 

        const key = `${entry.brand}|${entry.drug}|${entry.form}|${entry.strength}`.toLowerCase();
        if (!combinedBrands.has(key)) {
          combinedBrands.set(key, entry);
        }
      });
    }

    this.brandData = Array.from(combinedBrands.values());

    this.database.Brands = [...new Set(this.brandData.map(e => e.brand))].sort();
    this.database.Drugs = [...new Set(this.brandData.map(e => e.drug))].sort();
    this.database.Forms = [...new Set(this.brandData.map(e => e.form))].sort();
    this.database.Strengths = [...new Set(this.brandData.map(e => e.strength))].sort();
  }

  private processOtherSheets(workbook: XLSX.WorkBook): void {
    for (const sheetName of Object.keys(this.database)) {
      if (['Brands', 'Drugs', 'Forms', 'Strengths'].includes(sheetName)) continue;

      const sheet = workbook.Sheets[sheetName];
      if (sheet) {
        if (sheetName === 'Investigations') {
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const entries: InvestigationEntry[] = data
            .map((row: any) => ({ name: row[0], unit: row[1] }))
            .filter(entry => entry.name);
          this.investigationData = entries;
          this.database.Investigations = [...new Set(entries.map(e => e.name))].filter(Boolean);
        } else if (sheetName === 'SelfRecords') {
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const entries: SelfRecordEntry[] = data
            .map((row: any) => ({ recordType: row[0], unit: row[1] }))
            .filter(entry => entry.recordType);
          this.selfRecordData = entries;
          this.database.SelfRecords = [...new Set(entries.map(e => e.recordType))].filter(Boolean);
        } else if (sheetName === 'Foods') {
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          this.database.Foods = data
            .map((row: any) => `${row[0]}: ${parseInt(row[1], 10)}`)
            .filter(entry => entry && !entry.includes('NaN'));
        } else if (sheetName === 'Exercises') {
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          this.database.Exercises = data
            .map((row: any) => `${row[0]}: ${parseInt(row[1], 10)}`)
            .filter(entry => entry && !entry.includes('NaN'));
        } else {
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const columnA = data.map((row: any) => row[0] as string);
          this.database[sheetName as keyof typeof this.database] = [...new Set(columnA)].filter(Boolean);
        }
      }
    }
  }

  private cacheDatabase(): void {
    sessionStorage.setItem(this.CACHE_KEY, JSON.stringify({
      database: this.database,
      brandData: this.brandData,
      selfRecordData: this.selfRecordData,
      investigationData: this.investigationData,
    }));
  }

  clearCache(): void {
    sessionStorage.removeItem(this.CACHE_KEY);
    this.isLoaded = false;
  }

  getBrands(): string[] {
    return this.database.Brands;
  }

  getDrugs(brand: string): string[] {
    const drugs = this.brandData
      .filter(entry => entry.brand === brand)
      .map(entry => entry.drug);
    return [...new Set(drugs)].sort();
  }

  getForms(brand: string, drug: string): string[] {
    const forms = this.brandData
      .filter(entry => entry.brand === brand && entry.drug === drug)
      .map(entry => entry.form);
    return [...new Set(forms)].sort();
  }

  getStrengths(brand: string, drug: string, form: string): string[] {
    const strengths = this.brandData
      .filter(entry => entry.brand === brand && entry.drug === drug && entry.form === form)
      .map(entry => entry.strength);
    return [...new Set(strengths)].sort();
  }

  getAllDrugs(): string[] {
    return this.database.Drugs;
  }

  getAllDosageForms(): string[] {
    return this.database.Forms;
  }

  getFrequencies = (): string[] => this.database.Frequencies;
  getSystems = (): string[] => this.database.Systems;
  getRoutes = (): string[] => this.database.Routes;
  getSymptoms = (): string[] => this.database.Symptoms;
  getVaccines = (): string[] => this.database.Vaccines;
  getDurations = (): string[] => this.database.Durations;
  getInvestigations = (): string[] => this.database.Investigations;
  getCouncils = (): string[] => this.database.Councils;
  getAssessments = (): string[] => this.database.Assessments;
  getMedicalColleges = (): string[] => this.database.Colleges;
  getSelfRecords = (): string[] => this.database.SelfRecords;
  getSpecializations = (): string[] => this.database.Specializations;
  getPostGraduations = (): string[] => this.database.PostGraduations;
  getGraduations = (): string[] => this.database.Graduations;
  getSpecialities = (): string[] => this.database.Specialities;
  getHospitalServcies = (): string[] => this.database.HospitalServices;


  getInvestigationUnit(name: string): string | null {
    return this.investigationData.find(e => e.name === name)?.unit ?? null;
  }

  getSelfRecordUnit(recordType: string): string | null {
    return this.selfRecordData.find(e => e.recordType === recordType)?.unit ?? null;
  }

  getFoodItems(): { name: string; calories: number }[] {
    return this.database.Foods.map((item: any) => {
      const [name, calories] = item.split(':');
      return { name: name.trim(), calories: Number(calories) || 0 };
    });
  }

  getExercises(): { name: string; calories: number }[] {
    return this.database.Exercises.map((item: any) => {
      const [name, calories] = item.split(':');
      return { name: name.trim(), calories: Number(calories) || 0 };
    });
  }
}