import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';

import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';
import { SidebarComponent } from './components/side-nav/side-nav.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxMatTimepickerModule, NgxMatTimepickerToggleComponent } from 'ngx-mat-timepicker';
import { MatRadioModule } from '@angular/material/radio'; 
import { NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS, MAT_COLOR_FORMATS  } from '@angular-material-components/color-picker';

@NgModule({
  declarations: [
    LoaderComponent,
SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    TermsConditionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RecaptchaModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDatepickerModule, // Import Datepicker module
    MatNativeDateModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    NgxMatTimepickerModule,
    MatRadioModule,
    NgxMatColorPickerModule ,
    NgxMatTimepickerToggleComponent  
  ],
  exports: [
    LoaderComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    TermsConditionComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RecaptchaModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDatepickerModule, // Import Datepicker module
    MatNativeDateModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    NgxMatTimepickerModule,
    MatRadioModule,
    NgxMatColorPickerModule ,
    NgxMatTimepickerToggleComponent 
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ]
})
export class SharedModule { }
