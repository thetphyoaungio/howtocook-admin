import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import {
  SpinnerService,
  DialogModalService,
  LocalStorageService,
} from 'src/app/core/utils';

import { DashboardService } from 'src/app/core/services';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  infoCounts: any;

  commonSubTitle = 'This Week';

  chartData: any;

  dashboardDataImgs = [
    '../../../assets/images/shared/dashboard/info-card/today-ads-income.svg',
    '../../../assets/images/shared/dashboard/info-card/new-visitors.svg',
    '../../../assets/images/shared/dashboard/info-card/new-request.svg',
    '../../../assets/images/shared/dashboard/info-card/pending-request.svg',
  ];

  dashboardDataTitles = [
    //'Ads Income',
    'New Users',
    'New Requests',
    'Pending Requests',
  ];

  toid1: any;
  toid2: any;

  constructor(
    private spinnerService: SpinnerService,
    private dialogService: DialogModalService,
    private dashboardService: DashboardService,
    private localService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getInfoCounts();
    this.getChartData();
  }

  ngOnDestroy(): void {
    if (this.toid1) clearTimeout(this.toid1);
    if (this.toid2) clearTimeout(this.toid2);
  }

  getInfoCounts() {
    this.spinnerService.loading.next(true);

    this.dashboardService.getDashboardCountData().subscribe({
      next: (res: any) => {
        if (res.data) {
          this.infoCounts = [
            {
              image: this.dashboardDataImgs[0],
              title: this.dashboardDataTitles[0],
              subTitle: this.commonSubTitle,
              count: res.data.registerCount,
              percent: res.data.registerCount_percentage,
              totalPercent: res.data.total_registerCount,
              isPercentUp: res.data.registerCount_percentage > 0,
            },
            {
              image: this.dashboardDataImgs[1],
              title: this.dashboardDataTitles[1],
              subTitle: this.commonSubTitle,
              count: res.data.newRequestCount,
              percent: res.data.newRequestCount_percentage,
              totalPercent: res.data.total_newRequestCount,
              isPercentUp: res.data.newRequestCount_percentage > 0,
            },
            {
              image: this.dashboardDataImgs[2],
              title: this.dashboardDataTitles[2],
              subTitle: this.commonSubTitle,
              count: res.data.pendingRequestCount,
              percent: res.data.pendingRequestCount_percentage,
              totalPercent: res.data.total_pendingRequestCount,
              isPercentUp: res.data.pendingRequestCount_percentage > 0,
            },
          ];
        }

        this.toid1 = setTimeout(() => {
          this.spinnerService.loading.next(false);
        }, 0);
      },
      error: (err) => {
        if (err.status == 401) {
          console.log(`${err.status}: ${err.statusText}!!`);

          this.localService.clearAuth();

          this.toid2 = setTimeout(() => {
            this.router.navigate(['']);
          }, 0);
        }
        this.spinnerService.loading.next(false);

        this.dialogService.showError(err);
      },
    });
  }

  getChartData() {
    this.spinnerService.loading.next(true);

    this.dashboardService.getRegisterAnalytics().subscribe({
      next: (res: any) => {
        this.spinnerService.loading.next(false);

        this.chartData = { ...res.data };
      },
      error: (err) => {
        this.spinnerService.loading.next(false);
        this.dialogService.showError(err);
      },
    });
  }
}