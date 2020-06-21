import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  donutdata(){
      return [
        {
            metric: 'Overall Performance',
            donut1: [
                { name: 'Digital', value: 25 },
                { name: 'Linear', value: 5 },
                { name: 'Competition', value: 20 },
                { name: 'Cross Media', value: 18 }
            ],
    
        } 
    ];
  }

  barchartData(){
      return  [
        { "propertyName": "Digital", "value": "2.63", "field": "Return on ad spend", "Scale": "Dollar" },
        { "propertyName": "Linear", "value": "2.4", "field": "Return on ad spend", "Scale": "Dollar" },
        { "propertyName": "Competition", "value": "2.25", "field": "Return on ad spend", "Scale": "Dollar" },
        { "propertyName": "Cross Media", "value": "1.98", "field": "Return on ad spend", "Scale": "Dollar" },
    
        { "propertyName": "Other", "value": "0.13", "field": "Digital", "Scale": "Dollar" },
        { "propertyName": "Banner", "value": "0.18", "field": "Digital", "Scale": "Dollar" },
        { "propertyName": "Paid Display", "value": "0.19", "field": "Digital", "Scale": "Dollar" },
        { "propertyName": "Paid Social", "value": "0.33", "field": "Digital", "Scale": "Dollar" },
        { "propertyName": "Rich Media", "value": "0.15", "field": "Digital", "Scale": "Dollar" },
        { "propertyName": "Banner", "value": "0.18", "field": "Digital", "Scale": "Dollar" },
       
      ];
  }

  totalcomainSpendData(){
      return  [
        {
          comainSpendData: [
            {
              "name": "Effectiveness",
              "values": [
                { "Brand": "Effectiveness", "InputType": "Historical", "date": "2018-12-31T18:30:00.000Z", "month": "2", "year": "2019", "Consideration": 80 },
                { "Brand": "Effectiveness", "InputType": "Historical", "date": "2019-02-28T18:30:00.000Z", "month": "3", "year": "2019", "Consideration": 70 },
                { "Brand": "Effectiveness", "InputType": "Historical", "date": "2019-03-31T18:30:00.000Z", "month": "4", "year": "2019", "Consideration": 65 },
                { "Brand": "Effectiveness", "InputType": "Historical", "date": "2019-04-30T18:30:00.000Z", "month": "5", "year": "2019", "Consideration": 70 },
                { "Brand": "Effectiveness", "InputType": "Historical", "date": "2019-05-31T18:30:00.000Z", "month": "6", "year": "2019", "Consideration": 55 },
                { "Brand": "Effectiveness", "InputType": "Historical", "date": "2019-06-30T18:30:00.000Z", "month": "7", "year": "2019", "Consideration": 60 },
                { "Brand": "Effectiveness", "InputType": "Historical", "date": "2019-07-31T18:30:00.000Z", "month": "8", "year": "2019", "Consideration": 58 },
                { "Brand": "Effectiveness", "InputType": "Historical", "date": "2019-08-30T18:30:00.000Z", "month": "9", "year": "2019", "Consideration": 50 }],
              "Contribution-selected": true, "PurchaseIntent-selected": true, "Consideration-selected": true
            },
    
            {
              "name": "Efficiency",
              "values": [
                { "Brand": "Efficiency", "InputType": "Historical", "date": "2018-12-31T18:30:00.000Z", "month": "2", "year": "2019", "Consideration": 90, },
                { "Brand": "Efficiency", "InputType": "Historical", "date": "2019-02-28T18:30:00.000Z", "month": "3", "year": "2019", "Consideration": 80, },
                { "Brand": "Efficiency", "InputType": "Historical", "date": "2019-03-31T18:30:00.000Z", "month": "4", "year": "2019", "Consideration": 61, },
                { "Brand": "Efficiency", "InputType": "Historical", "date": "2019-04-30T18:30:00.000Z", "month": "5", "year": "2019", "Consideration": 70, },
                { "Brand": "Efficiency", "InputType": "Historical", "date": "2019-05-31T18:30:00.000Z", "month": "6", "year": "2019", "Consideration": 60 },
                { "Brand": "Efficiency", "InputType": "Historical", "date": "2019-06-30T18:30:00.000Z", "month": "7", "year": "2019", "Consideration": 66, },
                { "Brand": "Efficiency", "InputType": "Historical", "date": "2019-07-28T18:30:00.000Z", "month": "8", "year": "2019", "Consideration": 60, },
                { "Brand": "Efficiency", "InputType": "Historical", "date": "2019-08-31T18:30:00.000Z", "month": "9", "year": "2019", "Consideration": 55 }],
              "Contribution-selected": true, "PurchaseIntent-selected": true, "Consideration-selected": true
            },
    
            {
              "name": "ROI",
              "values": [
                { "Brand": "ROI", "InputType": "Historical", "date": "2018-12-31T18:30:00.000Z", "month": "2", "year": "2019", "Consideration": 70, },
                { "Brand": "ROI", "InputType": "Historical", "date": "2019-02-28T18:30:00.000Z", "month": "3", "year": "2019", "Consideration": 55, },
                { "Brand": "ROI", "InputType": "Historical", "date": "2019-03-31T18:30:00.000Z", "month": "4", "year": "2019", "Consideration": 50, },
                { "Brand": "ROI", "InputType": "Historical", "date": "2019-04-30T18:30:00.000Z", "month": "5", "year": "2019", "Consideration": 60, },
                { "Brand": "ROI", "InputType": "Historical", "date": "2019-05-31T18:30:00.000Z", "month": "6", "year": "2019", "Consideration": 50, },
                { "Brand": "ROI", "InputType": "Historical", "date": "2019-06-30T18:30:00.000Z", "month": "7", "year": "2019", "Consideration": 40, },
                { "Brand": "ROI", "InputType": "Historical", "date": "2019-07-31T18:30:00.000Z", "month": "8", "year": "2019", "Consideration": 45, },
                { "Brand": "ROI", "InputType": "Historical", "date": "2019-08-30T18:30:00.000Z", "month": "9", "year": "2019", "Consideration": 45, }],
              "Contribution-selected": true, "PurchaseIntent-selected": true, "Consideration-selected": true
            }
          ]
        }
      ]
    
  }

  bigChart(){
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
  }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
  }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
  }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
  }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
  }]
  }
  cards(){
    return [60,70,50,90]
  }
  pieChart(){
    return [{
              name: 'Chrome',
              y: 61.41,
              sliced: true,
              selected: true
          }, {
              name: 'Internet Explorer',
              y: 11.84
          }, {
              name: 'Firefox',
              y: 10.85
          }, {
              name: 'Edge',
              y: 4.67
          }, {
              name: 'Safari',
              y: 4.18
          }, {
              name: 'Sogou Explorer',
              y: 1.64
          }, {
              name: 'Opera',
              y: 1.6
          }, {
              name: 'QQ',
              y: 1.2
          }, {
              name: 'Other',
              y: 2.61
          }]
  }
  pieChart2(){
    return [{
              name: 'Chrome',
              y: 61.41,
              sliced: true,
              selected: true
          }, {
              name: 'Internet Explorer',
              y: 11.84
          }, {
              name: 'Firefox',
              y: 10.85
          }, {
              name: 'Edge',
              y: 4.67
          }, {
              name: 'Safari',
              y: 4.18
          }, {
              name: 'Sogou Explorer',
              y: 1.64
          }, {
              name: 'Opera',
              y: 1.6
          }, {
              name: 'QQ',
              y: 1.2
          }, {
              name: 'Other',
              y: 2.61
          }]
  }
}
