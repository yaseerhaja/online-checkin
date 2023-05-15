import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { Apollo } from 'apollo-angular';
import { AppService } from 'src/app/app.service';
import { CheckinComponent } from './checkin.component';

describe('CheckinComponent', () => {
  let spectator: Spectator<CheckinComponent>;
  const createComponent = createComponentFactory({
    component: CheckinComponent,
    imports: [
      CommonModule,
      MatCardModule,
      FormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      ReactiveFormsModule,
      NoopAnimationsModule,
    ],
    providers: [AppService, Apollo],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
