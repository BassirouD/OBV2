import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {ManagerService} from "../services/manager.service";

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.page.html',
  styleUrls: ['./parametrage.page.scss'],
})
export class ParametragePage implements OnInit {
    loadData={annee:2021,codeForm:''}
    user:any;
    id=localStorage.getItem('id')
    username=localStorage.getItem('login');
    codeForms:any;
    iden:any;
    sub:any;
    constructor(public loadingController:LoadingController,
                public router:Router,
                private toastController: ToastController,private routeA: ActivatedRoute,
                private alertCtrl: AlertController,public nav:NavController,private auths:AuthService,private manager:ManagerService) {


    }

    ngOnInit() {
        //this.checkUser();
        this.sub = this.routeA.params.subscribe(params => {
            this.iden = params['id'];
        });
        console.log('identifiant '+ this.iden);

        this.listecodeFormulaires(this.iden);
    }

    signOut(){
        localStorage.removeItem('annee');
        localStorage.removeItem('codeformulaire');
        this.router.navigate(['login']);
    }

    async parametrer(){
        const loading = await this.loadingController.create({
            message:"Please wait !!!",
            duration:3000
        });
        await loading.present();

        console.log(this.loadData);


        //localStorage.setItem('periode', String(this.loadData.mois));
        localStorage.setItem('annee',String(this.loadData.annee));
        localStorage.setItem('codeformulaire',this.loadData.codeForm);
        loading.dismiss();
        this.router.navigate(['tabs/tab1']);
    }

    async presentAlert(mgs) {
        const alert = await this.alertCtrl.create({
            header: 'Alert',
            message: mgs,
            buttons: ['OK']
        });

        await alert.present();

    }

    // checkUser(){
    //   this.auths.getUserDetail('dipaadmin')
    //   .subscribe(resp=>{
    //       this.user=resp;
    //       console.log(this.user);
    //   })
    // }

    checkUser(){
        this.auths.getUserbyLogin(this.username)
            .subscribe(resp=>{
                console.log(resp);
            })
    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    //avoir la liste des code formulaires

    listecodeFormulaires(id){
        this.manager.listcodeFormulaire(id)
            .subscribe(resp=>{
                this.codeForms=resp;
                //console.log('code formulaire :'+JSON.stringify(this.codeForms));
            })
    }


}
