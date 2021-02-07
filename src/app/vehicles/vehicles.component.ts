import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';
import { Vehicle } from '../vehicles/Vehicle';
import { VehiclesService } from './vehicles.service';

@Component({
    selector: "app-vehicles",
    templateUrl: "./vehicles.component.html",
    styleUrls: ["./vehicles.component.scss"],
})
export class VehiclesComponent implements OnInit {
    public vehicles = [];
    public vehicle = {
        id           : null,
        vehicle_plate: null,
        color        : null,
        brand        : null,
        owner_id     : null,
        type_id      : null,
        status       : 1
    };
    public owners = [];
    public types = [];
    public headElements = [
        "Propietario",
        "Marca",
        "Color",
        "Tipo",
        "Opción 1",
        "Opción 2",
    ];
    public formVehicle: FormGroup;

    constructor(
        private vehiclesService: VehiclesService,
        private toastrService: ToastService
    ) {

    }

    ngOnInit(): void {
        this.getAllVehicles();
        this.getAllOwners();
        this.getAllTypeVehicles();
        this.buildForm();

    }


    buildForm() {
        this.formVehicle = new FormGroup({
            id: new FormControl(null),
            vehicle_plate: new FormControl(null, [
                Validators.required,
            ]),
            color: new FormControl(null, [
                Validators.required,
            ]),
            brand: new FormControl(null, [
                Validators.required,
            ]),
            owner_id: new FormControl(null, Validators.required),
            type_id: new FormControl(null, Validators.required),
            status: new FormControl(1),
        });
    }

    getAllVehicles() {
        this.vehiclesService.getVehicles().subscribe(
            (d: any) => {
                this.vehicles = d.data;
            },
            (e) => {
                console.log(e);
            }
        );
    }

    getAllOwners() {
        this.vehiclesService.getOwners().subscribe(
            (d: any) => {
                this.owners = d.data;
            },
            (e) => {
                console.log(e);
            }
        );
    }

    getAllTypeVehicles() {
        this.vehiclesService.getTypeVehicles().subscribe(
            (d: any) => {
                this.types = d.data;
            },
            (e) => {
                console.log(e);
            }
        );
    }

    addVehicle(vehicle: Vehicle) {
        this.vehiclesService.createVehicle(vehicle).subscribe(
            (d: any) => {
                if (d.data && d.success) {
                    this.getAllVehicles();
                    this.toastrService.success(d.message);
                    this.limpiar();
                }
            },
            (e) => {
                console.log(e.error);
                this.toastrService.error(e.error.message);
                if(e.error.errors){
                    Object.values(e.error.errors).forEach((msg:any) => {
                        msg.forEach(element => {
                            this.toastrService.error(element);
                        });
                    });
                }
            }
        );
    }

    showVehicleInForm(vehicle:any) {
        this.formVehicle.controls.id.setValidators(Validators.required);
        this.vehicle = {
            id           : vehicle.id,
            vehicle_plate: vehicle.vehicle_plate,
            color        : vehicle.color,
            brand        : vehicle.brand,
            owner_id     : vehicle.owner_id,
            type_id      : vehicle.type_id,
            status       : vehicle.status
            }
    }

    limpiar(){
        this.formVehicle.controls.id.setValidators([]);
        this.vehicle = {
        id           : null,
        vehicle_plate: null,
        color        : null,
        brand        : null,
        owner_id     : null,
        type_id      : null,
        status       : 1
        }
    }

    updateVehicle(vehicle){
        this.vehiclesService.updateVehicle(vehicle).subscribe(
            (d: any) => {
                if (d.data && d.success) {
                    this.getAllVehicles();
                    this.toastrService.success(d.message);
                    this.limpiar();
                }
            },
            (e) => {
                console.log(e.error);
                this.toastrService.error(e.error.message);
                if(e.error.errors){
                    Object.values(e.error.errors).forEach((msg:any) => {
                        msg.forEach(element => {
                            this.toastrService.error(element);
                        });
                    });
                }
            }
        );
    }

    deleteVehicle(vehicle){
        this.vehiclesService.deleteVehicle(vehicle.id).subscribe(
            (d: any) => {
                if (d.data && d.success) {
                    this.getAllVehicles();
                    this.toastrService.success(d.message);
                }
            },
            (e) => {
                console.log(e.error);
                this.toastrService.error(e.error.message);
                if(e.error.errors){
                    Object.values(e.error.errors).forEach((msg:any) => {
                        msg.forEach(element => {
                            this.toastrService.error(element);
                        });
                    });
                }
            }
        );
    }
}
