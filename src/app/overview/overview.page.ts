import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {ManagerService} from "../services/manager.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {

    user:any;
    login=localStorage.getItem('login')
    nom:any = localStorage.getItem('nom');
    prenom:any = localStorage.getItem('prenom');
    email:any;
    telepohne:any;
    id:any;
    codeForms:any;

  categories = [];
  highlights = [];
  featured = [];

  // catSlideOpts = {
  //   slidesPerView: 3.5,
  //   spaceBetween: 10,
  //   slidesOffsetBefore: 11,
  //   freeMode: true
  // };

  highlightSlideOpts =  {
    slidesPerView: 1.05,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true
  };

  featuredSlideOpts = {
    slidesPerView: 0.5,
    spaceBetween: 10,
      // slidesOffsetBefore: 0,
    freeMode: true,
      loop: false,
      centeredSlides: false,
  };

    catSlideOpts = {
        slidesPerView:0.7,
        spaceBetween: 0,
        slidesOffsetBefore: 0,
        freeMode: true,
        loop: false,
        centeredSlides: false,
    };

  showLocationDetail = false;
  sub:any;
  iden:any;
  constructor(private http: HttpClient,
              private router: Router,
              private authS:AuthService,
              private manager: ManagerService,private routeA: ActivatedRoute
              ) {}

  ngOnInit() {
    // this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json').subscribe((res: any) => {
    //   this.categories = res.categories;
    //   this.highlights = res.highlights;
    //   this.featured = res.featured;
    // });
      this.sub = this.routeA.params.subscribe(params => {
          this.iden = params['id'];
      });

      this.authS.getUserbyLogin(this.login)
          .subscribe(resp=>{
              this.user=resp;
              // console.log(this.user);
              this.nom=this.user.nom
              this.prenom=this.user.prenom
              this.email=this.user.email;
              this.telepohne=this.user.telephone;
              this.id=this.user.ID
          })

      this.listecodeFormulaires(this.iden)
  }

    checkannee(event){
      var annee=event.target.value;
      localStorage.setItem('annee',annee);
    }

    checkcode(event){
     var codeselectionne=event.target.value;
      localStorage.setItem('code',codeselectionne)
    }

  // Dummy refresher function
  doRefresh(event) {
    setTimeout(() => {
      // event.target.complete();
        this.listecodeFormulaires(this.iden);
    }, 2000);
  }

  // show or hide a location string later
  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showLocationDetail = offset > 40;
  }

    goToFolderList(){
      this.router.navigate(['/liste-dossier']);
    }

    code1
    listecodeFormulaires(id){
        this.manager.listcodeFormulaire(id)
            .subscribe(resp=>{
                // alert(JSON.stringify(resp));
                this.codeForms=resp;
                this.code1 = this.codeForms[0];
                // alert(this.code1)
                //console.log('code formulaire :'+JSON.stringify(this.codeForms));
            })
    }

    goToFolderListDay(){
        this.router.navigate(['/liste-dossier-jour']);
    }

    goToFolderListMounth(){
        this.router.navigate(['/liste-dossier-mois']);
    }

    goToProfil(){
        this.router.navigate(['/tabs/compte']);
    }
}
