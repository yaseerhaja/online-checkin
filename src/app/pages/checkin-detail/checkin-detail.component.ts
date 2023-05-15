import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkin-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule, MatIconModule],
  templateUrl: './checkin-detail.component.html',
  styleUrls: ['./checkin-detail.component.scss'],
})
export class CheckinDetailComponent implements OnInit, OnDestroy {
  checkInData: any;
  private unsubscribe$ = new Subject();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private appService: AppService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const bookingCode = params.get('bookingCode') ?? '';
      const lastName = params.get('lastName') ?? '';
      this.getCheckinDetail(bookingCode, lastName);
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }

  public getCheckinDetail(bookingCode: string, lastName: string) {
    this.appService
      .getChekinDetail(bookingCode, lastName)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        ({ data }: any) => {
          this.checkInData = data?.checkinInfo ?? {};
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
