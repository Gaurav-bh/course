import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
//import { DISHES } from '../shared/Dishes';
import { DishService } from '../services/dish.service';





@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private dishservice:DishService,
    @Inject('BaseURL') public BaseURL) { }
  dishes!:Dish[];
  errMess!: string;

  ngOnInit(): void {
    this.dishservice.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }



  selectedDish!:Dish ;


  
  
  onselect(dish: Dish) {
    
    this.selectedDish = dish;
  }

  

}
