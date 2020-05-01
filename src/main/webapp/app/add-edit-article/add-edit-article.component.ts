import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import styles from '!!style-loader!css-loader!sass-loader!../../content/scss/global-variables.scss';
@Component({
  selector: 'add-edit-article',
  templateUrl: 'add-edit-article.component.html',
  styleUrls: ['./add-edit-article.scss']
})
export class AddEditArticleComponent implements OnInit {
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

  constructor(private fb: FormBuilder) {
    console.log(this.styles);
  }

  ngOnInit(): void {}
}
