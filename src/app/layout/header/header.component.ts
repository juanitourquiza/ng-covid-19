import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isActive = false;
  constructor() { }

  ngOnInit(): void {
  }

  expand(): void {
    this.isActive = !this.isActive;
  }

}
