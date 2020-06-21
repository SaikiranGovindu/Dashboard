import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSingleAxisChartComponent } from './line-single-axis-chart.component';

describe('LineSingleAxisChartComponent', () => {
  let component: LineSingleAxisChartComponent;
  let fixture: ComponentFixture<LineSingleAxisChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineSingleAxisChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineSingleAxisChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
