import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Apollo } from 'apollo-angular';
import { AppService } from 'src/app/app.service';

import { CheckinDetailComponent } from './checkin-detail.component';

describe('CheckinDetailComponent', () => {
  let spectator: Spectator<CheckinDetailComponent>;
  const createComponent = createComponentFactory({
    component: CheckinDetailComponent,
    imports: [
      CommonModule,
      MatCardModule,
      MatExpansionModule,
      MatIconModule,
      NoopAnimationsModule,
    ],
    providers: [AppService, Apollo, { provide: ActivatedRoute, useValue: '' }],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
