import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public form!: FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['brooksandrollsltd@gmail.com'],
      senderEmail: [''],
      subject: [''],
      message: ['']
    })
  }

  public submit() {
    const payload = this.form.value;
    window.location.href = `mailto:${payload.email}?subject=${payload.subject}body=${payload.message}`;

  }

}
