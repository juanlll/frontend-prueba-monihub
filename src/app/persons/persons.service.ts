import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Person} from './Person'
@Injectable({
  providedIn: 'root'
})
export class  PersonsService {

  constructor(private http: HttpClient) {

  }

  public getPersons() {
    return this.http.get('api/persons');
  }

  public getPerson(id:Number) {
    return this.http.get('api/persons/'+id);
  }

  public createPerson(person:Person) {
    return this.http.post('api/persons',person);
  }

  public updatePerson(person:any) {
    return this.http.put('api/persons/'+person.id,person);
  }

  public deletePerson(id) {
    return this.http.delete('api/persons/'+id);
  }

  public getCities() {
    return this.http.get('api/cities');
  }






}
