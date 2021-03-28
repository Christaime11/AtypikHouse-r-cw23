import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // 1


import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { HabitatsComponent } from './habitats/habitats.component';
import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';


const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'habitats',
        component: HabitatsComponent
      }
    ]
  }
]



@NgModule({
  declarations: [PublicComponent, HomeComponent, HabitatsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgbDatepickerModule,
    FormsModule,
    FeahterIconModule
  ]
})
export class PublicModule { }
