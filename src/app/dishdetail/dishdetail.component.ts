import { Component, OnInit,Input,ViewChild,Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective!: { resetForm: () => void; };

  dish!: Dish;
  dishIds!: string[];
  prev!: string;
  next!: string;
  commentForm!: FormGroup;
  Comment!:Comment;
  formErrors:{[index: string]:any} = {
    'author': '',
    
    'comment':''
  };

  validationMessages:{[index: string]:any} = {
      'author': {
          'required':      'First Name is required.',
          'minlength':     'First Name must be at least 2 characters long.',
        
      },
        'comment': {
          'required':      'Comment is required.',
          
      }
  };
  

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) {
      this.createForm();
    }
    errMess!:string;
    dishcopy!: Dish;

  ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish;this.dishcopy = dish; this.setPrevNext(dish.id); },errmess => this.errMess = <any>errmess);
    
  }

  goBack(): void {
      this.location.back();
  }
  setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createForm() {
      this.commentForm = this.fb.group({
          author: ['', [Validators.required, Validators.minLength(2)] ],
          rating: 5, 
          comment: ['',Validators.required]
      });
        this.commentForm.valueChanges
          .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
  }

  onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
        for (const field in this.formErrors) {
          if (this.formErrors.hasOwnProperty(field)) {
              // clear previous error message (if any)
              this.formErrors[field] = '';
              const control = form.get(field);
              if (control && control.dirty && !control.valid) {
                  const messages = this.validationMessages[field];
                  for (const key in control.errors) {
                      if (control.errors.hasOwnProperty(key)) {
                          this.formErrors[field] += messages[key] + ' ';
                      }
                    }
                }
            }
      }
  }


  onSubmit() {
    this.Comment = this.commentForm.value;
    this.Comment.date= new  Date().toISOString();
    console.log(this.Comment);
    this.dish.comments.push(this.Comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      name:'',
      raitng:5,
      meassage:''

    });
   
  }

}
