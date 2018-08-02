import { Deserializable } from './deserializable';

export class Customer implements Deserializable{

    customerId: number;
    firstName: string;
    lastName: string;
    loginId: string;
    email: string;
    status: string;
    gender:string;
    phone: string;
    dob: string;
    address: string;
    avatar: string|any;
    frontIdCard: string|any;
    backIdCard: string|any;
    point: number;
    customerType: string;

    constructor(){
    }
 
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}