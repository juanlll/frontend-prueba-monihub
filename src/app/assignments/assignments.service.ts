import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Assignment} from './Assignment'
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http: HttpClient) {

  }

  public getAssignments() {
    return this.http.get('api/assignments');
  }

  public getAssignment(id:Number) {
    return this.http.get('api/assignments/'+id);
  }

  public createAssignment(assignment:Assignment) {
    return this.http.post('api/assignments',assignment);
  }

  public updateAssignment(assignment:Assignment) {
    return this.http.get('api/assignments');
  }


  public getDrivers() {
    return this.http.get('api/persons');
  }

  public getProcesses() {
    return this.http.get('api/processes');
  }

  public getVehicles() {
    return this.http.get('api/vehicles');
  }

}
