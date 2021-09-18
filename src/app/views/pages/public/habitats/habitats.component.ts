import { Component, OnInit } from '@angular/core';
import { HabitatsService } from '../../../../core/habitats/habitats.service';
import { SlicePipe } from '@angular/common';
import axios from 'axios';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-habitats',
  templateUrl: './habitats.component.html',
  styleUrls: ['./habitats.component.scss']
})
export class HabitatsComponent implements OnInit {
  private data: any;
  habitats: any;
  ready = false

  constructor(
    private http: HttpClient,
    public habitatsService: HabitatsService,
  ) { }

  ngOnInit(): void {

    axios.get('http://localhost:1337/habitats').then(
      response => {
      console.log(response);
        this.habitats = response.data;
    });
  }

}
