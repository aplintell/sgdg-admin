import { Deserializable } from './deserializable';

export class Category implements Deserializable{

    categoryId: number;
    name: string;
    parsingUrl: string;
    priority: number;
    status: string;

    constructor(){
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}