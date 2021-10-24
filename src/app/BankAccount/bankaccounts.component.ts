import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, ValidationErrors} from '@angular/forms';
import { BankAccount } from './BankAccount';
import { BankAccountService } from './bankaccounts.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import * as currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-bankaccounts',
  templateUrl: './bankaccounts.component.html',
  styleUrls: ['./bankaccounts.component.scss']
})
export class BankAccountComponent implements OnInit {
  public bankAccounts        = [];
  public headElements       = ["id","Numero Cuenta","Nombre Cuenta","Banco","Moneda","Monto Inicial","Estado", "Detalle"];
  public banks: Array<String>     = [];
  public currencies: Array<String>      = [];
  public list_status: any       = [];
  public formBankAccount:FormGroup;
  public lengthAccountNumber = 0;
  public bankAccount:any = {};
  public movements = [];


  constructor(private bankAccountService: BankAccountService,private toastrService: ToastService,public router:Router) {
    this.router.events.subscribe((path:any )=> {
        if(path == '/'){
            this.getAllBankAccounts();
            this.getAllCurrencies();
            this.getAllBanks();
            this.getAllStatus();
        }
      });
  }

  ngOnInit(): void {
    this.getAllBankAccounts();
    this.getAllCurrencies();
    this.getAllBanks();
    this.getAllStatus();
    this.buildForm();

    this.formBankAccount.valueChanges.subscribe(val => {
        console.log(val);
        console.log(this.formBankAccount.valid)
        this.getFormValidationErrors(this.formBankAccount)
        this.lengthAccountNumber = val.account_number.length;
      });

      this.formBankAccount.setValue({
        account_currency: "ARG",
        account_name: "JUAN RAMIRO MAECHA",
        account_number: 12345678912345678900,
        bank_name: "BANCOLOMBIA",
        initial_account_balance: 20000,
        status: 1
      });
  }

  formatMoney(amount,currency){
      return currencyFormatter.format(amount, { code: currency });
  }

  buildForm(){
    this.formBankAccount = new FormGroup({
        account_name            : new FormControl(null,[ Validators.required,Validators.maxLength(50)]),
        account_currency        : new FormControl(null, [Validators.required,Validators.maxLength(3)]),
        bank_name               : new FormControl(null, [Validators.required,Validators.maxLength(20)]),
        initial_account_balance : new FormControl(null, [Validators.required,Validators.minLength(1)]),
        account_number          : new FormControl(null, [Validators.required,Validators.minLength(20),Validators.maxLength(20)]),
        status                  : new FormControl(null,Validators.required),
      });
  }

  getAllBankAccounts(){
    this.bankAccountService.getBankAccounts().subscribe(
        (d:any) => {
          this.bankAccounts = d.data;
        },
        (e) => {
          console.log(e);
        }
      );
  }

  getBankAccount(accountNumber : String){
    this.bankAccountService.getBankAccount(accountNumber).subscribe(
        (d:any) => {
          this.bankAccount = d.data;
          if(this.bankAccount.movements != undefined ){
            this.movements = this.bankAccount.movements;
          }
        },
        (e) => {
          console.log(e);
        }
      );
  }

    getAllStatus(){
        this.list_status = [
            {
                name:'Activa',
                value:1
            },
            {
                name:'Inactiva',
                value:0
            }
        ]
  }

  getAllBanks(){
    this.bankAccountService.getBanks().subscribe(
        (d:any) => {
          this.banks = d.data;
        },
        (e) => {
          console.log(e);
        }
      );
  }

  getAllCurrencies(){
    this.bankAccountService.getCurrencies().subscribe(
        (d:any) => {
          this.currencies = d.data;
          console.log(this.currencies);
        },
        (e) => {
          console.log(e);
        }
      );
  }

  createBankAccount(bankAccount:BankAccount){
      this.bankAccountService.createBankAccount(bankAccount).subscribe(
        (d:any) => {
          if(d.data && d.success){
            this.bankAccounts.unshift(d.data);
            this.toastrService.success(d.message);
            this.formBankAccount.reset();
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

  getFormValidationErrors(form) {
    Object.keys(form.controls).forEach(key => {
    const controlErrors: ValidationErrors = form.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }

    presentSymbol(type){
        return type == 'TO_DEPOSIT' ? ' + ': '-'
    }

}
