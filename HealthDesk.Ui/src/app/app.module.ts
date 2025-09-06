import { APP_INITIALIZER, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { DatabaseService } from './shared/services/database.service';
import { registerLocaleData } from '@angular/common';
import localeIn from '@angular/common/locales/en-IN';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AdOverlayComponent } from './shared/components/advertisement/ad-overlay.component';

export function initializeDatabase(databaseService: DatabaseService): () => Promise<void> {
    return () => databaseService.loadDatabase();
}

const IN_DATE_FORMATS = {
    parse: {
        dateInput: 'DD-MM-YYYY',
    },
    display: {
        dateInput: 'DD-MM-YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    declarations: [
        AppComponent,
        AdOverlayComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        RouterModule.forRoot([]),
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()), // Configure HttpClient with interceptors
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
        { provide: LOCALE_ID, useValue: 'en-IN' },
        { provide: MAT_DATE_FORMATS, useValue: IN_DATE_FORMATS },
        DatabaseService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeDatabase,
            deps: [DatabaseService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
