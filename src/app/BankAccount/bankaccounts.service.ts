import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankAccount } from './BankAccount'

@Injectable({
  providedIn: 'root'
})
export class  BankAccountService {

  constructor(private http: HttpClient) {

  }

  public getBankAccounts() {
    return this.http.get('api/bank-accounts');
  }

  public getBankAccount(id:String) {
    return this.http.get('api/bank-accounts/'+id);
  }


  public createBankAccount(bank_account:BankAccount) {
    return this.http.post('api/bank-accounts',bank_account);
  }

  public depositMoney(account_number,amount) {
    return this.http.post('api/deposit-money',{
        account_number,
        amount
    });
  }

  public extractMoney(account_number,amount) {
    return this.http.post('api/extract-money',{
        account_number,
        amount
    });
  }

  public getBanks() {
    return this.http.get('api/banks');
  }

  public getCurrencies() {
    return this.http.get('api/currencies');
  }

}
