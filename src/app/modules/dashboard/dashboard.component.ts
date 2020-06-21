import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  Brand: string;
  position: number;
  total: number;
  quarter: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, Brand: 'Applebees', total: 10079, quarter: 3434 },
  { position: 2, Brand: 'Baskin', total: 40026, quarter:  10432},
  { position: 3, Brand: 'Burger King', total: 6941, quarter: 2342 },
  { position: 4, Brand: 'Captain DS', total: 80122, quarter: 53253 },
  { position: 5, Brand: 'Chipotle', total: 10811, quarter: 35242 },
  { position: 6, Brand: 'Chilis', total: 120107, quarter: 45745 },
  { position: 7, Brand: 'Dairy Queen', total: 140067, quarter: 6464 },
  { position: 8, Brand: 'Dennys', total: 159994, quarter: 5744 },
  { position: 9, Brand: 'Dominos', total: 189984, quarter: 4463 },
  { position: 10, Brand: 'IHOP', total: 201797, quarter: 4622 },
  { position: 11, Brand: 'Jimmy Jhones', total: 229897, quarter: 222223 },
  { position: 12, Brand: 'KFC', total: 24305, quarter: 4875345 },
  { position: 13, Brand: 'MSDonald', total: 269815, quarter: 56334 },
  { position: 14, Brand: 'Panera', total: 280855, quarter: 4343},
  { position: 15, Brand: 'Red Robin', total: 309738, quarter: 35453},
  { position: 16, Brand: 'Starbucks', total: 32065, quarter: 4634 },
  { position: 17, Brand: 'Subway', total: 35453, quarter: 34533 },
  { position: 18, Brand: 'Taco Bell', total: 39948, quarter: 56453 },
  { position: 19, Brand: 'Wendys', total: 390983, quarter: 345345 },
  { position: 20, Brand: 'Zaxbys', total: 40078, quarter: 46343 },
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


DonutData =[];
BarchartData = [];
totalcomainSpendData =[];

  canLinecharRender = true;
  canBarRender = true;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.DonutData = this.dashboardService.donutdata();
    this.BarchartData = this.dashboardService.barchartData();
    this.totalcomainSpendData = this.dashboardService.totalcomainSpendData();
    this.dataSource.paginator = this.paginator;
  }

}
