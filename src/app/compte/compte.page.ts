import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../services/theme.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  mode = 'normal';
  showLocationDetail = false;
  darkValue: any;
    user:any;
    login=localStorage.getItem('login')
    nom:any = localStorage.getItem('nom');
    prenom:any = localStorage.getItem('prenom');
    email:any;
    telepohne:any;
    id:any;

  constructor(private themeService: ThemeService,
              private router: Router,
              private authS: AuthService
              ) { }

  ngOnInit() {
      this.darkValue = this.darkBoolean;
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

    // user =
    //     {
    //         nom: 'Djousso Nathanial',
    //         mail: 'edjesso@gainde2000.sn',
    //         tel: '785265256',
    //     };

    catSlideOpts = {
        slidesPerView:0.7,
        spaceBetween: 1,
        slidesOffsetBefore: 1,
        freeMode: true
    };

    onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 40;
    }

    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    toggleTheme(event){
        console.log(event)
        this.themeService.setAppTheme(event.detail.checked);
    }

    get darkBoolean(){
        return this.themeService.sharedDarkValue;
    }

    logOut(){
        localStorage.removeItem('login');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('code');
        localStorage.removeItem('iden');
        localStorage.removeItem('leggedIn');
        localStorage.removeItem('idapp');
        localStorage.removeItem('annee');
        this.router.navigateByUrl('/');
    }

    goToChangePassword(){
        this.router.navigateByUrl('/change-password');
    }

    goToChangeProfil(){
        this.router.navigateByUrl('/change-profil');
    }

}
