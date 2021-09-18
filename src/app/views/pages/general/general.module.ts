import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';
import { GeneralComponent } from './general.component';
import { ProfileComponent } from './profile/profile.component';
import { AddHabitatComponent } from './add-habitat/add-habitat.component';

// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'add-habitat',
        component: AddHabitatComponent
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralComponent, ProfileComponent, AddHabitatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    CommonModule,
    ReactiveFormsModule,
    ArchwizardModule,
    NgSelectModule,
    DropzoneModule, // Ngx-dropzone-wrapper
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class GeneralModule { }
