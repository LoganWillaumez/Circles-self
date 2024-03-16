import { CirclesDatas } from "./circle.interfaces";

export interface CustomerAdditionnalDatas {
  customer_id: number;
  created_at: Date;
  updated_at: Date;
  initiallogin: boolean;
  random: string;
  reset_validity: Date;
  initialcircle: boolean;
  identifier: string;
  circles: CirclesDatas[];
  activated_at: Date;
  email_valid: Date;
}

export interface CustomerInputDatas {
  firstname?: string;
  lastname?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  password?: string;
  birthdate?: string;
  img?: string;
  gender?: string;
}

export interface CustomerDatas
  extends CustomerInputDatas,
    CustomerAdditionnalDatas {}
