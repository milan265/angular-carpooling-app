import { Injectable } from '@angular/core';
import { Voznja } from './voznja.model';

@Injectable({
  providedIn: 'root'
})
export class VoznjaService {
  static voznjaPodaci: Array<Voznja> = [

    
  ];

  constructor() { }
}
