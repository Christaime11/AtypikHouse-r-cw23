import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


export class Habitat {
  title: any;
  description: any;
  nombreChambre: any;
  prixParNuit: any;
  nombreLit: any;
  adresse: any;
  hasTelevision: any;
  hasChauffage: any;
  hasInternet: any;
  hasClimatiseur: any;
  typeHabitat: any;
  vues: any;
}

export class SirenName {
  nomEntreprise: any;
  siren: any;
}
@Injectable({
  providedIn: 'root'
})
export class HabitatsService {

  protected  baseUrl: string = environment.apiURL;

  addUrl = this.baseUrl + 'habitats/add';
  getAllUrl = this.baseUrl + 'habitats';
  getOne = this.baseUrl +  'habitats/getDetails/';
  askAddUrl = this.baseUrl + 'users/askAuthorizationToAddHabitat';
  getUserReservationsUrl = this.baseUrl + 'habitats/reservations/allUsersReservations';


  constructor(private http: HttpClient) { }

  addHabitat(habitat: Habitat): Observable<any> {
    return this.http.post<Habitat>(this.addUrl, habitat);
  }

  getAll(): Observable<any> {
    return this.http.get(this.getAllUrl);
  }

  getOneHabitat(habitatId): Observable<any> {
    return this.http.get(this.getOne + habitatId);
  }

  askAddHabit(SirenName): Observable<any> {
    return this.http.post<SirenName>(this.askAddUrl, SirenName);
  }

  // Retourner l(historique de réservation de l'utilisateur connecté
  getUserReservations(): Observable<any> {
    return this.http.get(this.getUserReservationsUrl);
  }
}
