import { Component, OnInit } from '@angular/core';

interface PlayerStatistics {
  ratingAVG: number;
  superbowlAppears: number;
  superbowlVictories: number;
  nflMVP: number;
  superbowlMVP: number;
  proBowlAppears: number;
  name: String;
  calculationValue?: number;
}

const brady: PlayerStatistics = {
  ratingAVG: 97.6,
  superbowlAppears: 7,
  superbowlVictories: 5,
  nflMVP: 2,
  superbowlMVP: 4,
  proBowlAppears: 12,
  name: 'Brady'
};
const manning: PlayerStatistics = {
  ratingAVG: 98.6,
  superbowlAppears: 2,
  superbowlVictories: 2,
  nflMVP: 5,
  superbowlMVP: 1,
  proBowlAppears: 14,
  name: 'Manning'
};

@Component({
  selector: 'app-goat-information',
  templateUrl: './goat-information.component.html',
  styleUrls: ['./goat-information.component.css']
})
export class GoatInformationComponent implements OnInit {

  public radarChartLabels: string[] = ['Pró Bowl Selections', 'Superbowl Appears', 'SuperBowl Victories',
    'MVP NFL', 'SuperBowl MVP'];
  public radarChartData: any[] = [];

  public radarChartType = 'radar';

  public barChartLabels: string[] = ['Result'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  winner;

  constructor() {
  }

  ngOnInit(): void {
    this.calculateValues([brady, manning]);
    this.addInformationOnRadarGraph(brady);
    this.addInformationOnRadarGraph(manning);
    this.addInformationOnBarGraph(brady);
    this.addInformationOnBarGraph(manning);
    this.setWinner([brady, manning]);
  }

  private addInformationOnRadarGraph(player: PlayerStatistics) {
    this.barChartData.push({
      data: [
        player.calculationValue
      ],
      label: player.name
    });
  }

  private addInformationOnBarGraph(player: PlayerStatistics) {
    this.radarChartData.push({
      data: [
        player.proBowlAppears,
        player.superbowlAppears,
        player.superbowlVictories,
        player.nflMVP,
        player.superbowlMVP
      ],
      label: player.name
    });
  }

  private calculateValues(players: PlayerStatistics[]) {
    players.forEach(player => {
      player.calculationValue = this.calculateValue(player);
    });
  }

  private calculateValue(player: PlayerStatistics): number {
    return (player.ratingAVG +
      (player.superbowlAppears * 1.5) +
      (player.superbowlVictories * 2) +
      (player.nflMVP * 1.9) +
      (player.superbowlMVP * 1.7) +
      (player.proBowlAppears * 1.3)
    ) / 2;
  }

  private setWinner(players: (PlayerStatistics | PlayerStatistics)[]) {
    this.winner = players.reduce((prev, current) => {
      return (prev.calculationValue > current.calculationValue) ? prev : current;
    }).name;
  }
}
