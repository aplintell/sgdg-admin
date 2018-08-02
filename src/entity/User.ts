import { Deserializable } from './deserializable';

export class User implements Deserializable{

    userId: number;
    loginId: string;
    status: string;
    lastName: string;
    firstName: string;
    gender:string;
    phone: string;
    email: string;
    roleId: number;
    dob: string;
    address: string;
    avatar: string|any;
    frontIdCard: string|any;
    backIdCard: string|any;

    constructor(){
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}