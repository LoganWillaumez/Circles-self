export interface User {
  FirstName: string;
  LastName: string;
  BirthDate: Date;
  Email: string;
  Img: string;
  Gender: Gender;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}
