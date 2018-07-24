import { Deserializable } from './deserializable';

export class Customer implements Deserializable{

    customerId: number;
    firstName: string;
    lastName: number;
    loginId: string;
    email: string;
    status: string;

    constructor(){
    }
 
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}