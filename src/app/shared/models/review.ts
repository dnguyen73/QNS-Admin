export class Review {
    id: string; //auto gen from loopback
    name: string;
    email: string;
    title: string;
    comment: string;
    rating: number;
    createdDate: Date;
    status: boolean;
    productId: string;
    productCode: string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
