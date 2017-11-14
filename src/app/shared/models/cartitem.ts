import { Product } from "./product";

export class CartItem {
    product: Product;
    quantity: number;
    size: string;
    color: string;
    colorPath: string;
    unitPrice: number;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
