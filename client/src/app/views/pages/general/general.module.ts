import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { GeneralComponent } from './general.component';
import { ProfileComponent } from './profile/profile.component';
import { AddHabitatComponent } from './add-habitat/add-habitat.component';
import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';


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
  ]
})
export class GeneralModule { }
