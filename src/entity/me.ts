import { Deserializable } from './deserializable';

export class Me implements Deserializable{

    id: number;
    name: string;
    status: string;
    permissions: number[];

    constructor(name?: number, status?: string, permissions?: number[]){
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}