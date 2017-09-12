import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileObject } from "../../shared/models/fileobject";
import { environment } from './../../../environments/environment';
import { ConfirmationService } from "primeng/primeng";
import { ProductService } from "../../shared/services/product.service";

@Component({
  selector: 'product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {

constructor(private productSvc: ProductService, private confirmationSvc: ConfirmationService) { }
  uploadedFiles: FileObject[] = []

  ngOnInit() {
  }

  @Input()
  count: number;

  @Output()
  countChange = new EventEmitter();

  @Input()
  test: {
    a: number;
    b: number;
  }

  increase (){
    this.count ++;
    this.test.a ++;
    this.countChange.emit(this.count);
  }

  //Upload Completed event handler: To update the files list
  onUploadCompleted(event) {
    for (let file of event.files) {
      let f = new FileObject({ filename: file.name, filepath: environment.FILE_HOST_URL + "/1/" + file.name, filesize: file.size, isColor: false });
      this.uploadedFiles = this.uploadedFiles.concat(f);
    }
  }

  //After Files Selected event to avoid uploading duplicated files
  onSelectCompleted(event, fileUpload) {
    let selected = this.uploadedFiles.filter((f) => f.filename === event.files[0].name);
    if (selected.length > 0) {
      alert("Files existing! Please select another files");
      //clear the list
      fileUpload.clear();
    }
  }

  //Remove file handler on each row.
  removeFile(f: FileObject) {
    this.confirmationSvc.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.productSvc
          .removeProductImage("1", f.filename)
          .subscribe(
          () => {
            let index = this.uploadedFiles.map(function (file) {
              return file.filename;
            }).indexOf(f.filename);
            this.uploadedFiles = this.uploadedFiles.filter((val, i) => i != index);
            console.log(this.uploadedFiles.length);
          }
          )
      },
      reject: () => { }
    });
  }

}
