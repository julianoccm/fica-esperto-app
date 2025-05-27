export class Login {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static fromJson(json: any): Login {
    return new Login(json.email, json.password);
  }

  toJson(): any {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
