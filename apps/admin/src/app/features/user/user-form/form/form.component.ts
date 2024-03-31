import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TUser } from 'tp-schema';
import { ControlsOf } from 'src/app/shared/utils/form-controls-of';
import { v_user } from 'tp-schema';

@Component({
  selector: 'user-form',
  templateUrl: './form.component.html',
})
export class UserFormComponent {
  showErrors = false;
  v_user = v_user;

  private fb = inject(FormBuilder);

  userForm = this.fb.nonNullable.group<ControlsOf<TUser>>({
    id: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    userName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    device: new FormControl('ios', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  get userFormControls() {
    return this.userForm.controls;
  }
}
