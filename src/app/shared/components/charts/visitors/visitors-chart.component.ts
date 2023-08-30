import { Component, Input, OnChanges } from "@angular/core";

//chart
import { Inject, NgZone, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
//

import { SpinnerService } from "src/app/core/utils";
import { RPT_PERIOD_OPTIONS } from "src/app/core/helpers/reports-datetime-period-options.helper";

const PERIODS:any = {
  'daily':'Daily',
  'monthly':'Monthly',
  'yearly':'Yearly'
};

@Component({
    selector:'visitors-chart',
    templateUrl:'./visitors-chart.component.html',
    styleUrls:['./visitors-chart.component.scss']
})
export class VisitorsChartComponent implements OnChanges {
  @Input() data:any;

  private root!: am5.Root;

  selectedDateTimePeriod:any;

  viewData:any;
  periodTxt = '';

  toid1:any;
  toid2:any;
  toid3:any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private zone: NgZone, 
    private spinnerService:SpinnerService,
  ) {
    this.selectedDateTimePeriod = {...RPT_PERIOD_OPTIONS[0]};
  }

  ngOnChanges(changes: any): void {
    this.initViewData();

    this.toid1 = setTimeout(() => {
      this.createChart();
    }, 0);
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });

    if(this.toid1) clearTimeout(this.toid1);
    if(this.toid2) clearTimeout(this.toid2);
    if(this.toid3) clearTimeout(this.toid3);
  }

  initViewData() {
    this.viewData = this.data[`${this.selectedDateTimePeriod?.value}`]?.map((x:any) => ({
      dayDate: x.date,
      totalCount: x.totalCount
    }));

    this.periodTxt = PERIODS[`${this.selectedDateTimePeriod.value}`];
  }

  onDateTimePeriodChange(evt:any) {
    if(evt.hasOwnProperty('value')) {
      this.selectedDateTimePeriod = {...evt};
      
      this.viewData = undefined;

      this.initViewData();

      this.toid3 = setTimeout(() => {
        this.createChart();
      }, 0);
    };
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  createChart(){
    if (this.root) {
      this.root.dispose();
    }

    this.toid2 = setTimeout(() => {
      // Chart code goes in here
      this.browserOnly(() => {
        let root = am5.Root.new("chartdiv");

        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
          am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout
          })
        );

        // Create Y-axis
        let yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
          })
        );

        // Create X-Axis
        let xAxis = chart.xAxes.push(
          am5xy.CategoryAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
            categoryField: "dayDate"
          })
        );
        xAxis.data.setAll(this.viewData);

        // Create series
        let series1 = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Visitors per day",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "totalCount",
            categoryXField: "dayDate",
            fill: am5.color("rgba(238, 159, 39, 1)"),
            stroke: am5.color("rgba(238, 159, 39, 1)"), 
          })
        );
        series1.data.setAll(this.viewData);

        series1.columns.template.setAll({
          cornerRadiusTL: 10,
          cornerRadiusTR: 10
        });

        // Add legend
        let legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);
        
        // Add cursor
        chart.set("cursor", am5xy.XYCursor.new(root, {}));

        this.root = root;
      });
    }, 0);
  }
  
}