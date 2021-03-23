import { Component, OnInit } from '@angular/core';
import {HabitatsService} from '../../../../core/habitats/habitats.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-habitats',
  templateUrl: './habitats.component.html',
  styleUrls: ['./habitats.component.scss']
})
export class HabitatsComponent implements OnInit {
  private data: any;
  private habitats: any;

  constructor(
    public habitatsService: HabitatsService,
  ) { }

  ngOnInit(): void {
    this.habitatsService.getAll().subscribe(
      data => {
        this.data = data;
        this.habitats = this.data.habitats;
      });
  }

}
