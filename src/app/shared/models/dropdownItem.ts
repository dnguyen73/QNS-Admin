export class DropdownItem {
    label: string;
    value: string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}