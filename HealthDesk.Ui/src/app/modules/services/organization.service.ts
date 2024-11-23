import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  db: any;

  constructor() {
    this.initDB();
  }

  async initDB() {
    this.db = await openDB('surveyDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('surveys')) {
          db.createObjectStore('surveys', { keyPath: 'id', autoIncrement: true });
        }
      }
    });
  }

  async saveSurvey(survey: any) {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readwrite');
    await tx.store.add(survey);
    await tx.done;
  }

  async getSurveyById(id: string) {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readonly');
    const survey = await tx.store.get(Number(id));
    return survey;
  }

  async saveResponse(surveyId: string, response: any) {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readwrite');
    const survey = await tx.store.get(Number(surveyId));
    survey.responses = survey.responses || [];
    survey.responses.push(response);
    await tx.store.put(survey);
  }

  async getSurveys() {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readonly');
    return await tx.store.getAll();
  }

  async deleteSurvey(surveyId: string) {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readwrite');
    await tx.store.delete(Number(surveyId));
    await tx.done;
  }

  async updateSurvey(id: string, updatedSurvey: any) {
    await this.initDB();
    const tx = await this.db.transaction('surveys', 'readwrite');
    await tx.store.put(updatedSurvey);  // Update the survey
    await tx.done;
  }
}
