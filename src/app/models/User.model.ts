export class User {

  Images: string;

  constructor(public firstName: string,
              public lastName: string,
              public pseudo: string,
              public email: string,
              public description: string,
              public confidentialité: boolean) {
  }
}
