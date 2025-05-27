import { Bill } from "./bill";

export class UserData {
  id?: number
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  bills: Bill[] = [];

  constructor(init?: Partial<UserData>) {
    Object.assign(this, init);
  }

  static fromJson(json: any): UserData {
    return new UserData({
      id: json.id,
      name: json.name,
      email: json.email,
      password: json.password,
      cpf: json.cpf,
      bills: json.bills ? json.bills.map((bill: any) => Bill.fromJson(bill)) : [],
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      cpf: this.cpf,
      bills: this.bills.map(bill => bill.toJson()),
    };
  }
}
