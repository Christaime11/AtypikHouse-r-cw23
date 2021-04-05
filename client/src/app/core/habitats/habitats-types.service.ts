import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabitatsTypesService {
  protected  baseUrl: string = environment.apiURL;
  localUrl = this.baseUrl + 'habitats/getAllTypeHabitats';


  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getHabitatsTypes() {
    return this.http.get(this.localUrl);
  }
}
