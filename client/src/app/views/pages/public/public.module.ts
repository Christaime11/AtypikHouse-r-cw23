import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { HabitatsComponent } from './habitats/habitats.component';


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
    CommonModule
  ]
})
export class PublicModule { }
