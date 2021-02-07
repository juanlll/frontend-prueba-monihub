import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "ng-uikit-pro-standard";
import { Person } from "./Person";
import { PersonsService } from "./persons.service";

@Component({
    selector: "app-persons",
    templateUrl: "./persons.component.html",
    styleUrls: ["./persons.component.scss"],
})
export class PersonsComponent implements OnInit {
    public persons = [];
    public person = {
        id: null,
        first_name: null,
        second_name: null,
        last_names: null,
        address: null,
        phone: null,
        city_id: null,
        status: 1,
    };
    public cities = [];
    public headElements = [

        "Primer Nombre",
        "Segundo Nombre",
        "Apellidos",
        "Dirección",
        "Telefono",
        "Ciudad",
        "Opción 1",
        "Opción 2",
    ];
    public formPerson: FormGroup;

    constructor(
        private personsService: PersonsService,
        private toastrService: ToastService
    ) {}

    ngOnInit(): void {
        this.getAllPersons();
        this.getAllCities();
        this.buildForm();
    }

    buildForm() {
        this.formPerson = new FormGroup({
            id: new FormControl(null),
            first_name: new FormControl(null, [Validators.required]),
            second_name: new FormControl(null, [Validators.required]),
            last_names: new FormControl(null, [Validators.required]),
            address: new FormControl(null, Validators.required),
            phone: new FormControl(null, Validators.required),
            city_id: new FormControl(null, Validators.required),
            status: new FormControl(1),
        });
    }

    getAllPersons() {
        this.personsService.getPersons().subscribe(
            (d: any) => {
                this.persons = d.data;
            },
            (e) => {
                console.log(e);
            }
        );
    }

    getAllCities() {
        this.personsService.getCities().subscribe(
            (d: any) => {
                this.cities = d.data;
            },
            (e) => {
                console.log(e);
            }
        );
    }

    addPerson(person: Person) {
        this.personsService.createPerson(person).subscribe(
            (d: any) => {
                if (d.data && d.success) {
                    this.getAllPersons();
                    this.toastrService.success(d.message);
                    this.limpiar();
                }
            },
            (e) => {
                console.log(e.error);
                this.toastrService.error(e.error.message);
                if (e.error.errors) {
                    Object.values(e.error.errors).forEach((msg: any) => {
                        msg.forEach((element) => {
                            this.toastrService.error(element);
                        });
                    });
                }
            }
        );
    }

    showPersonInForm(person: any) {
        this.formPerson.controls.id.setValidators(Validators.required);
        this.person = {
            id: person.id,
            first_name: person.first_name,
            second_name: person.second_name,
            last_names: person.last_names,
            address: person.address,
            phone: person.phone,
            city_id: person.city_id,
            status: 1,
        };
    }

    limpiar() {
        this.formPerson.controls.id.setValidators([]);
        this.person = {
            id: null,
            first_name: null,
            second_name: null,
            last_names: null,
            address: null,
            phone: null,
            city_id: null,
            status: 1,
        };
    }

    updatePerson(person) {
        this.personsService.updatePerson(person).subscribe(
            (d: any) => {
                if (d.data && d.success) {
                    this.getAllPersons();
                    this.toastrService.success(d.message);
                    this.limpiar();
                }
            },
            (e) => {
                console.log(e.error);
                this.toastrService.error(e.error.message);
                if (e.error.errors) {
                    Object.values(e.error.errors).forEach((msg: any) => {
                        msg.forEach((element) => {
                            this.toastrService.error(element);
                        });
                    });
                }
            }
        );
    }

    deletePerson(person) {
        this.personsService.deletePerson(person.id).subscribe(
            (d: any) => {
                if (d.data && d.success) {
                    this.getAllPersons();
                    this.toastrService.success(d.message);
                }
            },
            (e) => {
                console.log(e.error);
                this.toastrService.error(e.error.message);
                if (e.error.errors) {
                    Object.values(e.error.errors).forEach((msg: any) => {
                        msg.forEach((element) => {
                            this.toastrService.error(element);
                        });
                    });
                }
            }
        );
    }
}
