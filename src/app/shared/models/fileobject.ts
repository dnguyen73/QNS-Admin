
export class FileObject {
    filename: string;
    filepath: string;
    filesize: number;
    isColor: boolean;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
