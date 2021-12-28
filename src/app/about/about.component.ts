import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private leader:LeaderService) { }

  ngOnInit(): void {
    this.leader.getLeaders().subscribe((leaders)=>
    this.leaders=leaders);
    
  }

  leaders!:Leader[];
  

}
