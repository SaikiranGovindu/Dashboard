import { Component, OnInit, Input, ElementRef, SimpleChanges, SimpleChange } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { PALETTE as palette } from './palatte';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  @Input() donutChartData: any;
  @Input() config: string;
  @Input() metric: string
  @Input() logo;
  @Input() type: string;

  @Input() parentWidth: any;
  @Input() parentHeight: any;

  private svg: any;
  private arc: any;
  private pie: any;
  private tooltip;
  private radius: any;
  public data: any;


  chartConfig: {
    tooltipFont?: string;
    tooltipColor?: string;
    isTooltipValue?: true;
    outerRadius?: number;
    innerRadius?: number;
  } = {};

  // data: { 
  //   color: string; 
  //   name: string;
  //   value: string;
  //   }[] = [];

  BrandDonutcolors=[
    '#4488FF',
    '#8A3EFC',
    '#002D9B'
  ]



  constructor(private container: ElementRef) { }

  ngOnInit(): void {
    this.chartConfig = Object.assign({}, {
      outerRadius: 115,
      innerRadius: 70
    }, this.config);
    this.drawChart();
  }
  ngOnChanges(changes: SimpleChanges) {
    const config: SimpleChange = changes.config;
    if (config && config.currentValue !== config.previousValue) {
      this.chartConfig = Object.assign({}, this.chartConfig, config.currentValue);
      this.drawChart();
    }
  }
  private drawChart() {
    this.initChart();
    this.drawDonut();
  }
  private initChart() {
    const svg = d3.select(this.container.nativeElement).select('svg');
    const margin = { top: 5, right: 10, bottom: 5, left: 10 };

    // let bbox = this.container.nativeElement.parentElement.getBoundingClientRect();
    const width = this.parentWidth - margin.left - margin.right;
    const height = this.parentHeight - margin.top - margin.bottom;

    // const width = +svg.attr('width') - margin.left - margin.right;
    // const height = +svg.attr('height') - margin.top - margin.bottom;
    this.radius = Math.min(width, height) / 2;

    if (this.type === Type.type1) {
      this.svg = svg
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        // .attr('transform', 'translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top) + ')')
        .attr("class", "title")
    } else {
      this.svg = svg
        .append('g')
        .attr('transform', 'translate(' + 155 + ',' + 140 + ')')
        // .attr('transform', 'translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top) + ')')
        .attr("class", "title")
    }

    if (this.type === Type.type1) {
      this.arc = d3Shape.arc()
      .outerRadius(this.chartConfig.outerRadius)
      .innerRadius(this.chartConfig.innerRadius);
    } else {
      this.arc = d3Shape.arc()
      .outerRadius(this.chartConfig.outerRadius - 5)
      .innerRadius(this.chartConfig.innerRadius + 10);
    }

    if (this.type === Type.type1) {
      this.pie = d3Shape.pie()
        .sort(null)
        .value((d: any) => d.value)
        .startAngle(0 * Math.PI / 360)
        .padAngle(.015)
    } else {
      this.pie = d3Shape.pie()
        .sort(null)
        .value((d: any) => d.value)
        .startAngle(0 * Math.PI / 360)
    }

    const data = [];
    this.donutChartData.forEach((el, i) => {
      data.push({
        color: (el.color) ? el.color : palette[i],
        brandcolors: (el.color) ? el.color : this.BrandDonutcolors[i],
        name: el.name,
        value: el.value
      });
    });
    this.data = data;
  }

  private drawDonut() {

    const g = this.svg.selectAll('.arc')
      .data(this.pie(this.data))
      .enter().append('g')
      .attr('class', 'arc');

      if (this.type === Type.type1) {
    g.append('path')
      .attr('d', this.arc)
      .style('fill', (d, i) => palette[i])
      }else{
        g.append('path')
        .attr('d', this.arc)
        .style('fill', (d, i) => this.BrandDonutcolors[i])
      }

    let textPos = d3Shape.arc()
      .outerRadius(this.chartConfig.outerRadius + 10)
      .innerRadius(this.chartConfig.outerRadius + 10);

    if (this.type === Type.type1) {

      g.append("text")
        .attr("dy", ".25em")
        .attr("transform", d => `translate(${textPos.centroid(d)})`)
        .style("text-anchor", d => textPos.centroid(d)[0] < 0 ? 'end' : 'start')
        .text(d => d.data.name)
        .style("font-family", "IBM Plex Sans")
        .style("font-sixe", '15px')
        .style('fill', '#161616')

      g.append('text')
        .attr("class", "donut-text")
        .attr('transform', d => `translate(${this.arc.centroid(d)})`)
        .attr('dy', '0.25em')
        .text(d => d.data.value + '%')
        .style("text-anchor", "middle")
        .style("font-family", "IBM Plex Sans")
        .style("font-size", '17px')
        .style("font-weight", 600)
        .style("fill", '#fff')


      let tokens = this.metric.split(' ');
      if (tokens.length === 1) {
        this.svg.append("text")
          .attr("text-anchor", "middle")
          .attr('font-size', '1.5em')
          .attr("word-break", "break-word")
          .attr('font-weight', 600)
          .attr('color', '#5D5D5D')
          .attr('font-family', "IBM Plex Sans")
          .attr('y', 9)
          .text(this.metric);
      } else {
        let text = this.svg.append("text")
          .attr("text-anchor", "middle")
          .attr('font-size', '1.5em')
          // .attr("word-break", "break-word")
          .attr('font-weight', 600)
          .attr('color', '#5D5D5D')
          .attr('font-family', "IBM Plex Sans")
          .attr('x', 0)
          .attr('y', '-0.5em');
        tokens.forEach((t, i) => {
          text.append('tspan')
            .attr('dy', `${i}em`)
            .attr('x', 0)
            .text(t);
        });

      }
    }

    // g.append("g")
    //   .attr("transform", "translate(-42,-40) scale(0.8)")
    //   .html(this.logo)

  }

}
enum Type {
  type1 = "distribution",
  type2 = "secondary",
}


