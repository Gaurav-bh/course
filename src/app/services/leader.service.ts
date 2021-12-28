import { Injectable } from '@angular/core';

import { of ,Observable} from 'rxjs';
import { delay } from 'rxjs/operators';
import { Leader } from '../shared/leader';
import { Leaders } from '../shared/Leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders(): Observable<Leader[]> {
    return of(Leaders).pipe(delay(2000));

        
  }
  getFeaturedleader(): Observable<Leader> {
    return of(Leaders.filter((leader) => leader.featured)[0]).pipe(delay(2000));

  }
}
