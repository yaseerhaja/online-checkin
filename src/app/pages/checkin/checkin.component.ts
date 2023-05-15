import { Component, OnInit } from '@angular/core';
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

import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';

const GET_QUERY = gql`
  query {
    hello
  }
`;

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
export class CheckinComponent implements OnInit {
  data: any[] = [];
  error: any;

  public checkinForm = new FormGroup({
    bookingCode: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .query({
        query: GET_QUERY,
        variables: {
          bookingCode: this.checkinForm.controls.bookingCode,
          lastName: this.checkinForm.controls.lastName,
        },
      })
      .subscribe(
        ({ data }: any) => {
          this.data = data;
          this.checkinForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  public retrieveDetails() {}
}
