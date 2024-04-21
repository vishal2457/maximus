import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "gb-file-upload",
  standalone: true,
  imports: [NgIf],
  template: `<label
      *ngIf="label"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1 capitalize"
    >
      {{ label }}
      <span class="text-red-600" *ngIf="required">*</span>
    </label>
    <input
      class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      type="file"
      [multiple]="multiple"
      (change)="internalFileHandler($event)"
    />`,
})
export class GbFileUploadComponent {
  @Output() handleFileChange = new EventEmitter();

  @Input() showFileSize = true;
  @Input() multiple = false;
  @Input() label = "";
  @Input() required = false;

  internalFileHandler(e: any) {
    if (this.multiple) {
      this.handleFileChange.emit(e.target.files);
    } else {
      this.handleFileChange.emit(e.target.files[0]);
    }
  }
}
