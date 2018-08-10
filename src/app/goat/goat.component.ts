import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goat',
  templateUrl: './goat.component.html',
  styleUrls: ['./goat.component.css']
})
export class GoatComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  calculateGoatAndSendToDetails() {
    setTimeout(() => {
      this.router.navigate(['/info']);
    }, 1000);
  }

}
