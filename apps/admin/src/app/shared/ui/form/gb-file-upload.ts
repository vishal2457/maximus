import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "gb-file-upload",
  standalone: true,
  imports: [],
  template: `<input
    type="file"
    [multiple]="multiple"
    (change)="internalFileHandler($event)"
  />`,
})
export class GbFileUploadComponent {
  @Output() handleFileChange = new EventEmitter();

  @Input() showFileSize = true;
  @Input() multiple = false;

  internalFileHandler(e: any) {
    if (this.multiple) {
      this.handleFileChange.emit(e.target.files);
    } else {
      this.handleFileChange.emit(e.target.files[0]);
    }
  }
}
