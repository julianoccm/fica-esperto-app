import { User } from "./user";

export class AuthResponse {
  user?: User
  token?: string

  constructor(init?: Partial<AuthResponse>) {
    Object.assign(this, init);
  }

  static fromJson(json: any): AuthResponse {
    return new AuthResponse({
      user: User.fromJson(json.user),
      token: json.token
    });
  }

  toJson(): any {
    return {
      user: this.user?.toJson(),
      token: this.token
    };
  }
}
