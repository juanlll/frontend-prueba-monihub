import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Vehicle} from './Vehicle'
@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) {

  }

  public getVehicles() {
    return this.http.get('api/vehicles');
  }

  public getVehicle(id:Number) {
    return this.http.get('api/vehicles/'+id);
  }

  public createVehicle(vehicle:Vehicle) {
    return this.http.post('api/vehicles',vehicle);
  }

  public updateVehicle(vehicle:any) {
    return this.http.put('api/vehicles/'+vehicle.id,vehicle);
  }

  public deleteVehicle(id) {
    return this.http.delete('api/vehicles/'+id);
  }

  public getOwners() {
    return this.http.get('api/persons');
  }

  public getTypeVehicles() {
    return this.http.get('api/type-vehicles');
  }




}
