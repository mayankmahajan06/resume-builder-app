import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-resume-editor',
  templateUrl: './resume-editor.component.html',
  styleUrls: ['./resume-editor.component.scss']
})
export class ResumeEditorComponent {

  constructor(private fb: FormBuilder) {
    this.addExperience(); // 👈 IMPORTANT
  }

  resumeForm = this.fb.group({
    personal: this.fb.group({
      fullName: ['', Validators.required],
      title: [''],
      email: ['', Validators.email],
      phone: [''],
      location: ['']
    }),
    summary: [''],
    skills: [''],
    experience: this.fb.array([])
  });

  get experience(): FormArray {
    return this.resumeForm.get('experience') as FormArray;
  }

  addExperience() {
    this.experience.push(
      this.fb.group({
        role: ['', Validators.required],
        company: ['', Validators.required],
        location: [''],
        startDate: [''],
        endDate: [''],
        description: ['']
      })
    );
  }

  removeExperience(index: number) {
    this.experience.removeAt(index);
  }

  saveDraft() {
    console.log('Draft saved', this.resumeForm.value);
  }

  downloadPdf() {
    console.log('Download PDF');
  }
}
