import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ICategoryCheckbox } from './category-checkbox.model';

@Component({
  selector: 'icam-updates-form',
  templateUrl: 'icam-updates-form.component.html',
  styleUrls: ['./icam-updates-form.scss']
})
export class IcamUpdatesFormComponent {
  form: FormGroup;
  @Input() categories: ICategoryCheckbox[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('')
    });
  }

  selectAll(): void {}
}
