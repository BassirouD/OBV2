import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ManagerService} from "../services/manager.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

    annee=localStorage.getItem('annee');
    code=localStorage.getItem('codeformulaire');
    idpole=localStorage.getItem('iden');
    idapp=localStorage.getItem('idapp');
    dossiers:any;
    mois:any=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre'];
    loadData={mois:''};
    constructor(public loadingController:LoadingController,
                public router:Router,public modal:ModalController,
                private toastController: ToastController,public manager:ManagerService,
                private alertCtrl: AlertController,public nav:NavController) { }

    ngOnInit() {
    }


    async parametrer(){
        const loading = await this.loadingController.create({
            message:"Please wait !!!",
            duration:3000
        });
        this.manager.listedossierbymonthyear(this.code,this.annee,this.loadData.mois,this.idpole)
            .subscribe(resp=>{
                this.dossiers=resp;
                loading.dismiss();
                console.log("dossiers "+ JSON.stringify(this.dossiers));
            },err=>{
                loading.dismiss();
                this.presentAlert("Données non disponibles");
                console.log(err);
            })
    }


    async presentAlert(mgs) {
        const alert = await this.alertCtrl.create({
            header: 'Alert',
            message: mgs,
            buttons: ['OK']
        });

        await alert.present();

    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }



}
