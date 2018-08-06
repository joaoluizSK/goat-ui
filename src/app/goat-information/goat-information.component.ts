import { AfterContentInit, Component } from '@angular/core';
import * as d3 from 'd3';


const data = [
  [//iPhone
    {axis: 'Battery Life', value: 0.22},
    {axis: 'Brand', value: 0.28},
    {axis: 'Contract Cost', value: 0.29},
    {axis: 'Design And Quality', value: 0.17},
    {axis: 'Have Internet Connectivity', value: 0.22},
    {axis: 'Large Screen', value: 0.02},
    {axis: 'Price Of Device', value: 0.21},
    {axis: 'To Be A Smartphone', value: 0.50}
  ], [//Samsung
    {axis: 'Battery Life', value: 0.27},
    {axis: 'Brand', value: 0.16},
    {axis: 'Contract Cost', value: 0.35},
    {axis: 'Design And Quality', value: 0.13},
    {axis: 'Have Internet Connectivity', value: 0.20},
    {axis: 'Large Screen', value: 0.13},
    {axis: 'Price Of Device', value: 0.35},
    {axis: 'To Be A Smartphone', value: 0.38}
  ], [//Nokia Smartphone
    {axis: 'Battery Life', value: 0.26},
    {axis: 'Brand', value: 0.10},
    {axis: 'Contract Cost', value: 0.30},
    {axis: 'Design And Quality', value: 0.14},
    {axis: 'Have Internet Connectivity', value: 0.22},
    {axis: 'Large Screen', value: 0.04},
    {axis: 'Price Of Device', value: 0.41},
    {axis: 'To Be A Smartphone', value: 0.30}
  ]
];

@Component({
  selector: 'app-goat-information',
  templateUrl: './goat-information.component.html',
  styleUrls: ['./goat-information.component.css']
})
export class GoatInformationComponent implements AfterContentInit {

  RadarChart: any;

  constructor() {
  }

  ngAfterContentInit() {

    const color = d3.scale.ordinal(
      ['#EDC951', '#CC333F', '#00A0B0']);

    const radarChartOptions = {
      w: 400,
      h: 400,
      margin: 4,
      maxValue: 0.5,
      levels: 5,
      roundStrokes: true,
      color: color
    };

    RadarChart('#statistics', data, radarChartOptions);

  }

}
