import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FileObject } from "../../shared/models/fileobject";
import { environment } from './../../../environments/environment';
import { ConfirmationService, FileUpload } from "primeng/primeng";
import { ProductService } from "../../shared/services/product.service";

@Component({
  selector: 'product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  constructor(private productSvc: ProductService, private confirmationSvc: ConfirmationService) { }
  uploadedFiles: FileObject[] = [];

  ngOnInit() {
  }

  @Output()
  fileSelected = new EventEmitter();

  //Upload Completed event handler: To update the files list
  onUploadHandler(event) {
    for (let file of event.files) {
      this.productSvc.uploadProductImage("1", file)
        .subscribe((data) => {
          //data = {container: "1", name: "err.png", type: "image/png", field: "file", size: 86232}
        });
    }
  }

  onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

  //After Files Selected event to avoid uploading duplicated files
  //Store selected file in uploadedFiles variable.
  onSelectCompleted(event) {
    let selected = this.uploadedFiles.filter((f) => f.filename === event.files[0].name);
    if (selected.length > 0) {
      alert("Files existing! Please select another files");
      //clear the list
      this.fileUpload.clear();
    } else {
      for (let file of event.files) {
        let f = new FileObject({
          filename: file.name,
          filepath: environment.FILE_HOST_URL + "/1/" + file.name,
          filesize: file.size,
          isColor: false,
          description: "",
          file: file
        });
        this.uploadedFiles = this.uploadedFiles.concat(f);
        //this.fileSelected.emit(this.uploadedFiles);
      }
    }
  }

  //event handler to bind uploadedFiles data to parent component
  //Only item which is selected for Color is emitted
  onRefresh() {
    this.fileSelected.emit(
      this.uploadedFiles.filter((f) => {
        return f.isColor;
      })
    );
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
