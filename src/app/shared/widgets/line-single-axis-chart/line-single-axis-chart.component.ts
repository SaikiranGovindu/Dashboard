import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
//import * as d3 from 'd3';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3TimeFormat from 'd3-time-format';
import * as d3Axis from 'd3-axis';
// import { ADLENGTH, VIEWERSHIP, PURCHASEINDEX, GDPGROWTH, DAYPART, PROPERTYMIX, BREAK, POD } from '../line-multi-axis-chart/slider-projection-data';
import * as _ from "lodash";

@Component({
  selector: 'app-line-single-axis-chart',
  templateUrl: './line-single-axis-chart.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./line-single-axis-chart.component.scss']
})
export class LineSingleAxisChartComponent implements OnInit {
  svg: any;
  g: any;
  TRANSITION_DURATION = 750;
  LEGENDS_PADDING = 20;
  INIT: boolean;
  w: any;
  h: any;
  r: any;
  x: any;
  y: any;
  allDates: Date[];
  borderWidth: number;
  borderHeight: number;
  margin: any;
  _data: any;
  sliderArray: any;
  sliderObject: any;


  public COLORS = [
    '#4488FF',
    '#A7A7A7',
    '#8A3EFC',
  ];

  @Input() field: string;
  @Input()
  set data(data: any) {
    if (data) {
      this._data = data;

      if (this.INIT) {
        this.updateChart();
      }
    }
  }
  constructor(public ele: ElementRef) {
    this.INIT = false;
    this.sliderObject = { sliderFilterOn: false, sliderValuesObject: {}, inputType: '' };
  }

  ngOnInit(): void {
    this.initChart();
    this.axisRange();
    this.initAxis();
    this.drawAxis();
    this.updateChart();
  }

  initChart() {
    this.margin = {
      top: 15, bottom: 100, left: 50, right: 50
    };
    let bbox = this.ele.nativeElement.parentElement.getBoundingClientRect();
    this.w = bbox.width - this.margin.left - this.margin.right;
    this.h = bbox.height - this.margin.top - this.margin.bottom;

    this.svg = d3.select(this.ele.nativeElement)
      .append('svg')
      .attr('width', bbox.width)
      .attr('height', bbox.height);

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + (this.margin.left) + ', ' + (this.margin.top) + ')');
    this.INIT = true;
  }

  axisRange() {
    this.x = d3Scale.scaleTime().range([0, this.w]);
    this.y = d3Scale.scaleLinear().range([this.h, 0]);
  }
 

  initAxis() {
    // const parseTime = d3TimeFormat.timeParse("%b/%y");

    let axesExtent = [];
    let yaxesExtent = []
    let xExtent: any;
    let yExtent: any;
    this._data.forEach(d => {
      axesExtent = axesExtent
        .concat(d.values)
    });
    this._data.forEach(d => {
      yaxesExtent = yaxesExtent
        .concat(d.values)
    });
      
    xExtent = d3Array.extent(axesExtent, (d: any) => new Date(d.date));
    switch (this.field) {
      case "Consideration":
        yExtent = [0, 100];
        break;
      case "PurchaseIntent":
        yExtent = [0, 100];
        break;
      case "Contribution":
        yExtent = d3Array.extent(yaxesExtent, (d: any) => (d.Contribution));
        if (this.sliderObject.sliderFilterOn) {
          yExtent[0] = yExtent[0] * 0.8;
          yExtent[1] = yExtent[1] * 1.5;
        }else{
          yExtent[0] = yExtent[0] * 0.9;
          yExtent[1] = yExtent[1] * 1.2;
        }
        break;

    }
    //yExtent = d3Array.extent((this._data[0].values).filter(e => !isNaN(e[this.field])), d => parseFloat(d[this.field]));
    this.x.domain(xExtent);
    this.y.domain(yExtent);
  }

  drawAxis() {
    this.svg.selectAll(".xaxis").remove();
    this.svg.selectAll(".yaxis").remove();
    // Add the X Axis
    this.g.append("g")
      .attr("class", "xaxisText")
      .attr("transform", "translate(0," + this.h + ")")
      .call(d3Axis.axisBottom(this.x).tickFormat(d3TimeFormat.timeFormat("%b %Y")))
      .selectAll("text")
      .style("fill", "#000")
      // .style("font-weight", 600)
      .style("font-family", "IBM Plex Sans")

      this.g.append("g")
      .attr("class", "yaxisText")
      .call(d3Axis.axisLeft(this.y).ticks(10))
      // .style("font-weight", 600)
      .style("font-family", "IBM Plex Sans")
      .style("font-size", '12px')

     

     // y axis label
     this.g.append('text')
     .attr('class', 'axis-title')
     .text("Growth")
     .attr('text-anchor', 'middle')
     .attr('transform', 'translate(-35,' + (this.h / 2) + ') rotate(-90)');

     this.g.append('g')
      .attr('class', 'grid')
      .call(d3Axis.axisTop(this.x).tickFormat(() => '').ticks(10).tickSize(-this.h))
      .style('stroke', '#E6E6E')
      .style("fill",'#E6E6E' )
      .selectAll('line').style('stroke', '#ddd');

  }


  updateChart() {

    this.initAxis();
    this.drawAxis();
    let lineData, lineColor, lineClass, baseData, lineAxis;
    var localDataArray = _.cloneDeep(this._data);

    for (let i = 0; i < localDataArray.length; i++) {
      lineData = [(localDataArray[i].values).filter(e => !isNaN(e[this.field]))];
      // if (lineData[0].length > 0) {
      //   lineData[0] = this.checkSliderProjectiononLine(lineData[0], this.field, "Historical");
      // }
      lineData[0] = lineData[0].sort(function (a, b) { return new Date(a.date).valueOf() - new Date(b.date).valueOf(); });
      lineClass = 'line' + i.toString();
      lineColor = this.COLORS[i];
      baseData = this._data[i];
      lineAxis = this.y;

      if(localDataArray[i].name !== 'Efficiency'){
        this.drawLine(lineData, lineColor, lineClass, baseData, lineAxis);
      }else{
        this.drawAreaLine(lineData, lineColor, lineClass, baseData, lineAxis);
      }
      
    }

    this.drawlegends();
  }

  drawlegends() {
    //  // SELECTABLE LEGENDS
    this.g.selectAll(".legendCheckbox").remove();
    this.g.selectAll(".legendText").remove();
    const legendCheckbox = this.g.selectAll('.legendCheckbox')
      .data(this._data);
    legendCheckbox.exit().remove();
    legendCheckbox.enter().append('rect')
      .attr('class', 'legendCheckbox')
      .attr('x', (_, i) => (this.w / 2) + 340 - (this._data.length - i) * 190)
      .attr('y', (this.h + 55))
      .attr('width', 15) 
      .attr('height', 15)
      .style('cursor', 'pointer')
      .style('stroke', (_, i) => this.COLORS[i])
      .style('fill', (d, i) => this._data[i][`${this.field}-selected`] ? this.COLORS[i] : 'transparent')
      .on('click', d => {
        d[`${this.field}-selected`] = !d[`${this.field}-selected`];
        this.updateChart();
      })
      .merge(legendCheckbox)
      // .transition()
      // .duration(this.TRANSITION_DURATION)
      .style('fill', (d, i) => this._data[i][`${this.field}-selected`] ? this.COLORS[i] : 'transparent');

    const legendText = this.g.selectAll('.legendText')
      .data(this._data);
    legendText.exit().remove();
    legendText.enter().append('text')
      .attr('class', 'legendText')
      // .text(d => d.label)
      .text(d => d.name)
      .attr('x', (_, i) => (this.w / 2) + 360 - (this._data.length - i) * 190)
      .attr('y', (this.h + 60))
      .attr('dy', '0.75em')
      .on('click', d => {
        d[`${this.field}-selected`] = !d[`${this.field}-selected`];
        this.updateChart();
      })
      // .style("font-weight",600)
      .style("font-size", '14px')
      .merge(legendText);
  }

  drawLine(lineData, lineColor, lineClass, baseData, lineAxis) {
    const valueline = d3Shape.line()
      .x((d: any) => {
        // debugger
        return this.x(new Date(d.date));
      })
      .y((d: any) => lineAxis(d[this.field]));
    //(this._data[0].values).filter(e => !isNaN(e[this.field]))
    const field = this.g.selectAll('.' + lineClass)
      .data(lineData);
    field.exit().remove();
    field.enter().append('path')
      .attr('class', lineClass)
      .style('fill', 'none')
      .merge(field)
      // .transition()
      // .duration(this.TRANSITION_DURATION)
      .attr('d', valueline)
      .style('stroke-width', '1.6px')
      .style('stroke', (_, i) => baseData[`${this.field}-selected`] ? lineColor : 'transparent');
  }
  drawAreaLine(lineData, lineColor, lineClass, baseData, lineAxis) {
      const valueline2 = d3Shape.area()
      .x((d: any) => {
        return this.x(new Date(d.date));
      })
      .y0(this.h )
      .y1((d: any) => lineAxis(d[this.field])); 
    const field2 = this.g.selectAll('.' + lineClass)
      .data(lineData);
    field2.exit().remove();
    field2.enter().append('path')
      .attr('class', lineClass)
      .style('fill', '#A7A7A7')
      .style("opacity", 0.2)
      .merge(field2)
      // .transition()
      // .duration(this.TRANSITION_DURATION)
      .attr('d', valueline2)
      // .style('stroke-width', '1.6px')
      // .style('stroke', (_, i) => baseData[`${this.field}-selected`] ? lineColor : 'transparent');
  }

}
           