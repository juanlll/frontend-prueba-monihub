import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "ng-uikit-pro-standard";
import { BankAccountService } from '../BankAccount/bankaccounts.service';

@Component({
    selector: "app-cashier",
    templateUrl: "./cashier.component.html",
    styleUrls: ["./cashier.component.scss"],
})
export class CashierComponent implements OnInit {

    public lengthAccountNumber = 0;
    public formCashier: FormGroup;

    constructor(
        private toastrService: ToastService,
        private bankAccountService: BankAccountService
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.formCashier = new FormGroup({
            amount: new FormControl(null, [Validators.required]),
            account_number: new FormControl(null, [Validators.required,Validators.minLength(20),Validators.maxLength(20)]),
        });
    }

    limpiar() {
        this.formCashier.setValue({
            amount: null,
            account_number:null
    });
    }

    depositMoney(account_number,amount) {
        this.bankAccountService.depositMoney(account_number,amount).subscribe(
            (d: any) => {
                if (d.data && d.success) {
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

    extractMoney(account_number,amount) {
        this.bankAccountService.extractMoney(account_number,amount).subscribe(
            (d: any) => {
                if (d.data && d.success) {
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

}
