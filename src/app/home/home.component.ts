import { Component, OnInit,Inject } from '@angular/core';

import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish!: Dish;
  promotion!: Promotion;
  leader!:Leader
  disherrMess!:string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,private lead:LeaderService,@Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish().subscribe((dish)=>{
      this.dish=dish;
    },errmess => this.disherrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe((promotion)=>{
      this.promotion=promotion;
    });
    this.lead.getFeaturedleader().subscribe((leader)=>{
      this.leader=leader;
    });

  }

}
