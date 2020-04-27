import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  adminToggleFlag = false;

  constructor() {}

  ngOnInit(): void {}

  public showDropdown() {
    this.adminToggleFlag = !this.adminToggleFlag;
  }
}
