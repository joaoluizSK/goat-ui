import {Component, OnInit} from '@angular/core';
import {GoatService} from '../goat.service';

interface PlayerStatistics {
  ratingAVG: number;
  proBowlSelections: number;
  superbowlVictories: number;
  nflMVP: number;
  superbowlMVP: number;
  name: String;
  finalResult?: number;
}

// const brady: PlayerStatistics = {
//   ratingAVG: 97.6,
//   superbowlAppears: 7,
//   superbowlVictories: 5,
//   nflMVP: 2,
//   superbowlMVP: 4,
//   proBowlAppears: 12,
//   name: 'Brady'
// };
// const manning: PlayerStatistics = {
//   ratingAVG: 98.6,
//   superbowlAppears: 2,
//   superbowlVictories: 2,
//   nflMVP: 5,
//   superbowlMVP: 1,
//   proBowlAppears: 14,
//   name: 'Manning'
// };

@Component({
  selector: 'app-goat-information',
  templateUrl: './goat-information.component.html',
  styleUrls: ['./goat-information.component.css']
})
export class GoatInformationComponent implements OnInit {

  public radarChartLabels: string[] = ['Pró Bowl Selections', 'Superbowl Appears', 'SuperBowl Victories', 'MVP NFL', 'SuperBowl MVP'];
  public radarChartData: any[];
  public radarChartType = 'radar';
  public barChartLabels: string[] = ['Result'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  winner;

  private result: any;

  constructor(private goatService: GoatService) {
  }

  ngOnInit(): void {

    this.goatService.calculate().subscribe(result => {

      this.radarChartData = [];
      this.barChartData = [];
      this.result = result;
      console.log(result);

      const brady = result.brady.extra;
      brady.ratingAVG = result.brady.avgRating;
      brady.finalResult = result.brady.finalResult;
      const manning = result.manning.extra;
      manning.ratingAVG = result.manning.avgRating;
      manning.finalResult = result.manning.finalResult;

      console.log(brady);
      console.log(manning);

      this.addInformationOnRadarGraph(brady);
      this.addInformationOnRadarGraph(manning);
      this.addInformationOnBarGraph(brady);
      this.addInformationOnBarGraph(manning);
      this.setWinner([brady, manning]);

    }, err => console.log(err));

  }

  private addInformationOnRadarGraph(player: PlayerStatistics) {
    this.radarChartData.push({
      data: [
        player.proBowlSelections,
        player.superbowlVictories,
        player.nflMVP,
        player.superbowlMVP
      ],
      label: player.name
    });

  }

  private addInformationOnBarGraph(player: PlayerStatistics) {
    this.barChartData.push({
      data: [
        player.finalResult
      ],
      label: player.name
    });
  }

  private setWinner(players: (PlayerStatistics | PlayerStatistics)[]) {
    this.winner = players.reduce((prev, current) => {
      return (prev.finalResult > current.finalResult) ? prev : current;
    }).name;
  }
}
