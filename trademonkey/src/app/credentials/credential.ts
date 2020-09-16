export class Credential {
  name: string;
  value: string;
  expires: Date;

  constructor(name, value, expires) {
    this.name = name;
    this.value = value;
    this.expires = expires;
  }
}
