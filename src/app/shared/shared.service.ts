import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public landingPage:boolean;
  
 
  public COLORS = [
    '#5392ff',  // Blue 40
    '#34bc6e',  // Green 30
    '#9b82f3',  // Indigo 40
    '#ffb000',  // Gold 20
    '#ff509e',  // Magenta 40
    '#79a6f6',  // Blue 30
    '#71cddd',  // Aqua 20
    '#95d13c',  // Lime 20
    '#fe8500',  // Orange 30
    '#fe6100'   // Peach 40
  ];
  setIsLandingPage(b:boolean) {
    this.landingPage = b;
  }

  public isLandingPage() {
    return this.landingPage;
  }
  
  showSideBar: boolean;
  headerChange: Subject<boolean> = new Subject<boolean>();

  private customSubject = new Subject<any>();
  customObservable = this.customSubject.asObservable();
​
  constructor() {
    this.headerChange.subscribe((value) => {
      this.showSideBar = value;
    })
  }
  changeHeader(value) {
    this.headerChange.next(value);
  }
​
  updateData(propertyType) {
    this.customSubject.next(propertyType);
  }


}
