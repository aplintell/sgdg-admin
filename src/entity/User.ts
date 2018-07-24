import { Deserializable } from './deserializable';

export class User implements Deserializable{

    userId: number;
    loginId: string;
    status: string;
    lastName: string;
    firstName: string;
    email: string;
    roleId: number;

    constructor(){
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}