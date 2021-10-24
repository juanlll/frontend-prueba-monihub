export interface BankAccount {
  id?                    : Number;
  account_name           : String;
  account_currency       : String;
  bank_name              : String;
  initial_account_balance: Number;
  account_number         : String;
  status                 : Boolean;
  created_at?            : String;
  updated_at?            : String;
}
