import { Component, OnInit, Input, ElementRef, ViewEncapsulation, ViewChild, OnChanges } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
// import { SharedService } from '../shared.service';
import * as _ from "lodash";
import { SharedService } from '../../shared.service';


@Component({
  selector: 'app-bar-vertical-chart',
  templateUrl: './bar-vertical-chart.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./bar-vertical-chart.component.scss']
})
export class BarVerticalChartComponent implements OnInit {
  _data: any;
  _sourceDataArray: any;
  INIT: boolean;
  @ViewChild('chart', { static: true })
  chartContainer: ElementRef;

  // margin = { top: 20, right: 20, bottom: 30, left: 40 };
 
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  // private colors: any;
  private xAxis: any;
  private yAxis: any;

  public colors = [
    '#00ACA6',
    '#0F61FD',
    '#8A3FFC',
    '#57BFFF',
    '#57BFFF',
  ]


  @Input() field: string;
  @Input()
  set data(data: any) {
    if (data) {
      // this._data=undefined;
      this._data = data;

      if (this.INIT) {
        this.updateChart();
      }


    }
  }

  constructor(private sharedService: SharedService) {
    this.INIT = false;
  }

  ngOnInit() {

    if (this._data) {
      this._sourceDataArray = _.cloneDeep(this._data);
      this._sourceDataArray = (this._data).filter(d => (d["field"] == this.field));
      this.createChart();
      this.updateChart();
    }
  }
  
  private margin: any = { top: 30, right: 10, bottom: 30, left: 10 };
  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    let xDomain = this._sourceDataArray.map(d => d["propertyName"]);
    //let yDomain = [0, d3Array.max(this.data, d => d["value"])];
    let yDomain = [0, d3Array.max(this._sourceDataArray, d => parseFloat(d["value"]))]
    // create scales
    this.xScale = d3Scale.scaleBand().padding(0.3).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3Scale.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    // this.colors = d3Scale.scaleLinear().domain([0, this._sourceDataArray.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3Axis.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'yAxisText')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3Axis.axisLeft(this.yScale));
  }

  updateChart() {
    // update scales & axis
    // define X & Y domains
    let xDomain = this._sourceDataArray.map(d => d["propertyName"]);
    let yDomain = [0, d3Array.max(this._sourceDataArray, d => parseFloat(d["value"]))];
    this.xScale.domain(xDomain);
    this.yScale.domain(yDomain);
    // this.colors.domain([0, this._sourceDataArray.length]);
    // this.xAxis.transition().call(d3Axis.axisBottom(this.xScale));
    // this.yAxis.transition().call(d3Axis.axisLeft(this.yScale));
    this.chart.selectAll(".bar").remove();
    // let update = this.chart.selectAll('.bar')
    //   .data(this._sourceDataArray);

    // remove exiting bars
    // update.exit().remove();

    // update existing bars
    // this.chart.selectAll('.bar').transition()
    //   .attr('x', d => this.xScale(d["propertyName"]))
    //   .attr('y', d => this.yScale(d["value"]))
    //   .attr('width', d => this.xScale.bandwidth())
    //   .attr('height', d => this.height - this.yScale(d["value"]))
    //   .style('fill', (d, i) => this.colors(i));

    // add new bars
    // update
    //   .enter()
    //   .append('rect')
    //   .attr('class', 'bar')
    //   .attr('x', d => this.xScale(d["propertyName"]))
    //   .attr('y', d => this.yScale(d["value"]))
    //   .attr('width', this.xScale.bandwidth())
    //   .attr('height', 0)
    //   .style('fill', (d, i) => this.colors(i))
    //   .transition()
    //   .delay((d, i) => i * 10)
    //   .attr('y', d => this.yScale(d["value"]))
    //   .attr('height', d => this.height - this.yScale(d["value"]));

    //this.g.selectAll(".verticalBarChart").remove();
    const verticalBarChart = this.chart.selectAll('.bar')
      .data(this._sourceDataArray);
    verticalBarChart.exit().remove();
    verticalBarChart.enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d["propertyName"]))
      .attr('y', d => this.yScale(d["value"]))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d, i) => this.colors[i])
      .style("cursor", "pointer")
      // .on('click', d => {
      //   this.updateHorizontalBarChart(d["propertyName"]);
      // })
      .attr('height', d => this.height - this.yScale(d["value"]))
      .merge(verticalBarChart)
      // .transition()
      // .duration(500);

      const barText = this.chart.selectAll('.barText')
      .data(this._sourceDataArray);
      barText.exit().remove();
      barText.enter().append('text')
      .attr('class', 'barText')
      .attr('height', 0)
      .attr("text-anchor", "left")
      .text(d =>'$' + d["value"])
      .attr('x', d => this.xScale(d["propertyName"]) + 20)
      .attr('y', 0)
      .attr('dy', '13em')
      .style("fill", "#ffffff")
      .style("font-size",15)
      .merge(barText);

        
    //.delay((d, i) => i * 10)

    // this.g.selectAll(".legendCheckbox").remove();
    // this.g.selectAll(".legendText").remove();
    // const legendCheckbox = this.g.selectAll('.legendCheckbox')
    //   .data(this._sourceDataArray);
    // legendCheckbox.exit().remove();
    // legendCheckbox.enter().append('rect')
    //   .attr('class', 'legendCheckbox')
    //   .attr('x', (_, i) => (this.w / 2) + 300 - (this._sourceDataArray.length - i) * 190)
    //   .attr('y', (this.h + 60))
    //   .attr('width', 15)
    //   .attr('height', 15)
    //   .style('cursor', 'pointer')
    //   .style('stroke', (_, i) => this.COLORS[i])
    //   .style('fill', (d, i) => this._sourceDataArray[i][`${this.field}-selected`] ? this.COLORS[i] : 'transparent')
    //   .on('click', d => {
    //     d[`${this.field}-selected`] = !d[`${this.field}-selected`];
    //     this.updateChart();
    //   })
    //   .merge(legendCheckbox)
    //   .transition()
    //   .duration(this.TRANSITION_DURATION)
    //   .style('fill', (d, i) => this._sourceDataArray[i][`${this.field}-selected`] ? this.COLORS[i] : 'transparent');
  }

  // updateHorizontalBarChart(propertyName) {
  //   // setTimeout(_ => this.BarHorizontalChart.updateData(propertyName), 50);
  //   this.sharedService.updateData(propertyName);
  // }

}
