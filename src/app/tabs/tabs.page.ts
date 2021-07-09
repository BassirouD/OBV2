import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router:Router) {}

    checkoverview(){
      var id=localStorage.getItem('id');
      this.router.navigate(['tabs/overview',id]);
    }

}
