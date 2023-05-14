import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinDetailComponent } from './checkin-detail.component';

describe('CheckinDetailComponent', () => {
  let component: CheckinDetailComponent;
  let fixture: ComponentFixture<CheckinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CheckinDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
