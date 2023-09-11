import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-user-sidebar',
  templateUrl: './search-user-sidebar.component.html',
  styleUrls: ['./search-user-sidebar.component.css']
})
export class SearchUserSidebarComponent implements OnInit {

  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
