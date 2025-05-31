export class Bill {
  id?: number;
  name?: string;
  description?: string;
  value?: number;
  dueDate?: Date;
  origin ?: string;
  status?: string;
  userId?: number;

  constructor(init?: Partial<Bill>) {
    Object.assign(this, init);
  }

  static fromJson(json: any): Bill {
    return new Bill({
      id: json.id,
      name: json.name,
      description: json.description,
      value: json.value,
      dueDate: new Date(json.dueDate),
      status: json.status,
      userId: json.userId,
      origin: json.origin
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      value: this.value,
      dueDate: this.dueDate?.toISOString(),
      status: this.status,
      userId: this.userId,
      origin: this.origin
    };
  }
}
