import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getHomePageData();
  }
  Home:any;
  experties:any;
  getHomePageData(): void {
    this.api.get('/admin/homePage').subscribe((data:any) => {
      
      this.Home=data.result;
      this.experties=data.ex
      console.log(this.experties);
    })
  }

}
