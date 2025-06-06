export class User {
  id?: number
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  birthDate?: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  static fromJson(json: any): User {
    return new User({
      id: json.id,
      name: json.name,
      email: json.email,
      password: json.password,
      cpf: json.cpf,
      birthDate: json.birthDate
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      cpf: this.cpf,
      birthDate: this.birthDate
    };
  }
}
