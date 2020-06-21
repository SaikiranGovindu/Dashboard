import { Component, OnInit, Input, ElementRef, ViewEncapsulation, ViewChild, OnChanges } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { SharedService } from '../../shared.service';
import * as _ from "lodash";
import { selectedGenrescolors, warnermediacolors, competitivePropertiescolors, ADUvaluecolors } from './colorpallete';

@Component({
  selector: 'app-bar-horizontal-chart',
  templateUrl: './bar-horizontal-chart.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./bar-horizontal-chart.component.scss']
})
export class BarHorizontalChartComponent implements OnInit {
  _data: any;
  _sourceDataArray: any;
  INIT: boolean;
  @ViewChild('chart', { static: true })
  chartContainer: ElementRef;


  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;

  private xAxis: any;
  private yAxis: any;

  private _w:any;
  private _h:any;
  private colors:string[];
   @Input() field: any;
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
  @Input() parentWidth:any;
  @Input() parentHeight:any;

  constructor(private sharedService: SharedService) {
    this.INIT = false;  
  }

  ngOnInit() {
    this.sharedService.customObservable.subscribe((PropertyType) => {
      this.updateData(PropertyType)
    }
    );
    if (this._data) {
      this._sourceDataArray = _.cloneDeep(this._data);
      this._sourceDataArray = (this._data).filter(d => (d["field"] == this.field));
      this.createChart();
      this.updateChart();
    }
  }
  private margin: any = { top: 20, right: 20, bottom: 0, left: 100 };
  
  createChart() {
    let element = this.chartContainer.nativeElement;
    // this.width = element.offsetWidth - this.margin.left - this.margin.right;
    // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.width = this.parentWidth - this.margin.left - this.margin.right;
    this.height = this.parentHeight - this.margin.top - this.margin.bottom;

    this.width = this.parentWidth - this.margin.left - this.margin.right;
    this.height = this.parentHeight - this.margin.top - this.margin.bottom;
    let svg = d3.select(element).append('svg')
      .attr('width', this.parentWidth)
      .attr('height', this.parentHeight);

      // chart plot area
      if(this.field == "ADU value"){
        this.chart = svg.append('g')
        .attr('class', 'bars')
        .attr('transform', `translate(${this.margin.right}, ${this.margin.top})`);
      }else{
        this.chart = svg.append('g')
        .attr('class', 'bars')
        .attr('transform', `translate(${this.margin.left+10}, ${this.margin.top})`);
      }

  

    // define X & Y domains
    let yDomain = this._sourceDataArray.map(d => d["propertyName"]);
    let xDomain = [0, d3Array.max(this._sourceDataArray, d => parseFloat(d["value"]))];

    // create scales
    // this.xScale = d3Scale.scaleBand().padding(0.3).domain(xDomain).rangeRound([0, this.width]);
    if(this.field == "ADU value"){
      this.xScale = d3Scale.scaleLinear().domain(xDomain).rangeRound([0, this.width]);
      this.yScale = d3Scale.scaleBand().padding(0.3).domain(yDomain).range([this.height-this.margin.left, 0]);
    }else{
      this.xScale = d3Scale.scaleLinear().domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3Scale.scaleBand().padding(0.3).domain(yDomain).range([this.height, 0]);
    }
    

  
    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3Axis.axisBottom(this.xScale));

      if(this.field == "ADU value"){
        this.yAxis = svg.append('g')
        .attr('class', 'adu-y-axis')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(d3Axis.axisLeft(this.yScale))
        .style("display", "none");
      }else{
        this.yAxis = svg.append('g')
        .attr('class', 'axis axis-y')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(d3Axis.axisLeft(this.yScale));
      }
   
  }

  updateChart() {

    switch (this.field) {
      case "WarnerMedia Properties":
        this.colors = warnermediacolors;
         break;
      case "Competitive Properties":
        this.colors = competitivePropertiescolors;
          break;
      case "Selected Genres":
        this.colors = selectedGenrescolors;  
          break;
      case "ADU value":
        this.colors = ADUvaluecolors;  
           break;
      default:
        this.colors = warnermediacolors;
    }
  
    // update scales & axis
    // define X & Y domains
    let yDomain = this._sourceDataArray.map(d => d["propertyName"]);
    let xDomain = [0, d3Array.max(this._sourceDataArray, d => parseFloat(d["value"]))]

    this.xScale.domain(xDomain);
    this.yScale.domain(yDomain);

    // this.colors.domain([0, this._sourceDataArray.length]);

    // this.xAxis.transition().call(d3Axis.axisBottom(this.xScale));
    // this.yAxis.transition().call(d3Axis.axisLeft(this.yScale));
    this.chart.selectAll(".bar").remove();
    // let update = this.chart.selectAll('.bar')
    //   .data(this._sourceDataArray);
   
    // update.exit().remove();


    // this.chart.selectAll('.bar').transition()
    //   .attr('x', 0)
    //   .attr('y', d => this.yScale(d["propertyName"]))
    //   .attr('height', d => this.yScale.bandwidth())
    //   .attr('width', d => this.xScale(d["value"]))
    //   .style('fill', (d, i) => this.colors[i]);

   
    // update
    //   .enter()
    //   .append('rect')
    //   .attr('class', 'bar')
    //   .attr('y', d => this.yScale(d["propertyName"]))
    //   .attr('width', 0)
    //   .attr('height', this.yScale.bandwidth())
    //   .style('fill', (d, i) => this.colors[i])
    //   .transition()
    //   .delay((d, i) => i * 10)
    //   .attr('x', 0)
    //   .attr('width', d => this.xScale(d["value"]))

    const horizontalBarChart = this.chart.selectAll('.bar')
      .data(this._sourceDataArray);
      horizontalBarChart.exit().remove();
      horizontalBarChart.enter().append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', d => this.yScale(d["propertyName"]))
      .attr('width', d => this.xScale(d["value"]))
      .attr('height', d => this.yScale.bandwidth())
      .style('fill', (d, i) => this.colors[i])
      // .attr('height', d => this.height - this.yScale(d["value"]))
      .merge(horizontalBarChart)
      // .transition()
      // .duration(500);

      if(this.field=="ADU value"){
      const barText = this.chart.selectAll('.barText')
      .data(this._sourceDataArray);
      barText.exit().remove();
      barText.enter().append('text')
      .attr('class', 'barText')
      .attr('height', d => this.yScale.bandwidth())
      .attr("text-anchor", "left")
      .text(d =>d["value"] +'\r\n'+ d["propertyName"])
      .attr('x', 15)
      .attr('y', d => this.yScale(d["propertyName"]))
      .attr('dy', '1.8em')
      .style("fill", "#ffffff")
      .style("font-size",16)
      .style("font-weight", 600)
      .merge(barText);

      const legendText = this.chart.selectAll('.legendText')
      .data(this._sourceDataArray);
      legendText.exit().remove();
      legendText.enter().append('text')
      .attr('class', 'legendText')
      .attr('height', 0)
      .attr("text-anchor", "left")
      .text("ADU Value")
      // .attr('x', 0)
      // .attr('y',175)
      .attr('dy', '15em')
      .style("fill", "#000")
      .style("font-size",14)
      .merge(barText);

      const legendText2 = this.chart.selectAll('.legendText2')
      .data(this._sourceDataArray);
      legendText2.exit().remove();
      legendText2.enter().append('text')
      .attr('class', 'legendText2')
      .attr('height', 0)
      .attr("text-anchor", "left")
      .text("90%")
      // .attr('x', 10)
      // .attr('y', 115)
      .attr('dy', '8em')
      .style("fill", "#000")
      .style("font-size",24)
      .merge(barText);      
      }
  
  }

  public updateData(propertyType) {
    // for (var i = 0; i < this._data.length; i++) {
    //   this._data[i]["value"] = parseFloat(this._data[i]["value"]) * 2;

    // }
    if (this.field == "Digital" || this.field == "Linear" || this.field == "Competition" || this.field == "Cross Media") {
      this.field = propertyType;
      this._sourceDataArray = _.cloneDeep(this._data);
      this._sourceDataArray = (this._data).filter(d => (d["field"] == this.field));
      this.updateChart();
    }
  }

}
