import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss'],
})
export class CheckinComponent {
  constructor(private router: Router) {}

  public checkinForm = new FormGroup({
    bookingCode: new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(5),
      Validators.pattern('^[2-9a-zA-Z]*$'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
  });

  public retrieveDetails(e: Event) {
    if (e) {
      e.preventDefault();
    }
    this.checkinForm.markAllAsTouched();
    let formIns = this.checkinForm.getRawValue();

    // stop here if form is invalid
    if (this.checkinForm.invalid) {
      return;
    }

    this.router.navigate([
      '/checkin-details',
      { bookingCode: formIns.bookingCode, lastName: formIns.lastName },
    ]);
  }

  public getBookingErrorMessage(): string {
    return this.checkinForm.controls.bookingCode.hasError('required')
      ? 'Required'
      : this.checkinForm.controls.bookingCode.hasError('maxlength')
      ? 'Max 6 char!'
      : this.checkinForm.controls.bookingCode.hasError('minlength')
      ? 'Min 5 char!'
      : this.checkinForm.controls.bookingCode.hasError('pattern')
      ? 'Should contain only Numbers from (2-9) and Alphabets'
      : '';
  }

  public getLastNameErrorMessage(): string {
    return this.checkinForm.controls.lastName.hasError('required')
      ? 'Required'
      : this.checkinForm.controls.lastName.hasError('maxlength')
      ? 'Max 30 char!'
      : this.checkinForm.controls.lastName.hasError('minlength')
      ? 'Min 2 char!'
      : '';
  }
}
