import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

const styles = require('!!style-loader!css-loader!sass-loader!../../content/scss/global-variables.scss');
@Component({
  selector: 'add-edit-article',
  templateUrl: 'add-edit-article.component.html',
  styleUrls: ['./add-edit-article.scss']
})
export class AddEditArticleComponent {
  styles = styles;
  form: FormGroup = new FormGroup({
    link: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    keywords: new FormControl('', [Validators.required]),
    journal: new FormControl('', [Validators.required]),
    citation: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    abstract: new FormControl('', [Validators.required])
  });

  constructor() {}

  get controls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  cancel(): void {}

  save(): void {
    console.log(this.controls.link);
    console.log(this.form.valid);
  }
}
