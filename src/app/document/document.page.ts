import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {

    user:any;
    login=localStorage.getItem('login')
    nom:any = localStorage.getItem('nom');
    prenom:any = localStorage.getItem('prenom');
    email:any;
    telepohne:any;
    id:any;


    categories = [];
    highlights = [];
    featured = [];

    catSlideOpts = {
        slidesPerView: 3.5,
        spaceBetween: 10,
        slidesOffsetBefore: 11,
        freeMode: true
    };

    highlightSlideOpts =  {
        slidesPerView: 1.05,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true
    };

    featuredSlideOpts = {
        slidesPerView: 1.5,
        spaceBetween: 10,
        freeMode: true
    };

    showLocationDetail = false;


    constructor(private http: HttpClient, private router: Router, private authS:AuthService,) { }

  ngOnInit() {
      this.authS.getUserbyLogin(this.login)
          .subscribe(resp=>{
              this.user=resp;
              console.log(this.user);
              this.nom=this.user.nom
              this.prenom=this.user.prenom
              this.email=this.user.email;
              this.telepohne=this.user.telephone;
              this.id=this.user.ID
          })
  }

    goToProfil(){
        this.router.navigate(['/tabs/compte']);
    }

}
