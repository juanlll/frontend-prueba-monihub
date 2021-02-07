import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { Assignment } from './Assignment';
import { AssignmentsService } from './assignments.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  public assignments        = [];
  public headElements       = ["id","Placa","Marca","Conductor","Propietario"];
  public processes: any     = [];
  public vehicles: any      = [];
  public drivers: any       = [];
  public formAssignment:FormGroup;

  constructor(private assignmentsService: AssignmentsService,private toastrService: ToastService,public router:Router) {
    this.router.events.subscribe((path:any )=> {
        if(path == '/'){
            this.getAllAssignments();
            this.getAllVehicles();
            this.getAllProcesses();
            this.getAllDrivers();
        }
      });
  }

  ngOnInit(): void {
    this.getAllAssignments();
    this.getAllVehicles();
    this.getAllProcesses();
    this.getAllDrivers();
    this.buildForm();
  }

  buildForm(){
    this.formAssignment = new FormGroup({
        vehicle_id: new FormControl(null, Validators.required),
        process_id: new FormControl(null, Validators.required),
        driver_id:  new FormControl(null, Validators.required),
        status:     new FormControl(1),
      });
  }

  getAllAssignments(){
    this.assignmentsService.getAssignments().subscribe(
        (d:any) => {
          this.assignments = d.data;
        },
        (e) => {
          console.log(e);
        }
      );
  }

  getAllDrivers(){
    this.assignmentsService.getDrivers().subscribe(
        (d:any) => {
          this.drivers = d.data;
        },
        (e) => {
          console.log(e);
        }
      );
  }

  getAllProcesses(){
    this.assignmentsService.getProcesses().subscribe(
        (d:any) => {
          this.processes = d.data;
        },
        (e) => {
          console.log(e);
        }
      );
  }

  getAllVehicles(){
    this.assignmentsService.getVehicles().subscribe(
        (d:any) => {
          this.vehicles = d.data;
        },
        (e) => {
          console.log(e);
        }
      );
  }

  assignVehicleToDriver(assignment:Assignment){
      this.assignmentsService.createAssignment(assignment).subscribe(
        (d:any) => {
          if(d.data && d.success){
            this.assignments.unshift(d.data);
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
