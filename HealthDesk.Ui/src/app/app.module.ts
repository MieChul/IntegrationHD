import { APP_INITIALIZER, NgModule } from '@angular/core';
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

export function initializeDatabase(databaseService: DatabaseService): () => Promise<void> {
    return () => databaseService.loadDatabase();
  }

@NgModule({
    declarations: [
        AppComponent
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
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        DatabaseService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeDatabase,
      deps: [DatabaseService],
      multi: true,
    }, // Register the interceptor
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
