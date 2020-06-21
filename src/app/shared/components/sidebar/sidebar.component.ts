import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  // toggleSideBar(){
  //   this.toogleSideBarForMe.emit();
  //   setTimeout(()=>{
  //     window.dispatchEvent(
  //       new Event('resize')
  //     );
  //   }, 300);
  // }
}
