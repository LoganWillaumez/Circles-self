import { CustomerDatas } from "../../ts/interfaces/customer.interfaces";

declare namespace Express {
    export interface Request {
        user: CustomerDatas
    }
}