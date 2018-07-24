import { Deserializable } from './deserializable';

export class Brand implements Deserializable{

    brandId: number;
    name: string;
    priority: number;
    status: string;
    image: string|any;

    constructor(){
    }
 
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}