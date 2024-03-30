import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment.development";
import { ZodSchema } from "zod";

@Component({
  selector: "gb-form",
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      (click)="patchRandomValues()"
      *ngIf="!environment.production"
      class="cursor-pointer"
      >Fill random values</a
    >
    <form [formGroup]="form">
      <ng-content></ng-content>
    </form>
  `,
})
export class GbFormComponent {
  @Input() form!: FormGroup;
  @Input() zodSchema!: ZodSchema;

  environment = environment;

  patchRandomValues() {
    if (!environment.production) {
      if (this.zodSchema) {
        import("@anatine/zod-mock").then(({ generateMock }) => {
          this.form.patchValue(generateMock(this.zodSchema));
        });
      } else {
        import("src/app/dev/generate-values-dev").then(
          ({ generateAndPatchValues }) => {
            generateAndPatchValues(this.form.controls);
          }
        );
      }
    }
  }
}
