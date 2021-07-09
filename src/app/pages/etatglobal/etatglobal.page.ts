import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ManagerService} from "../../services/manager.service";
import {FormBuilder} from "@angular/forms";
import {EtatglobalmodalPage} from "../../modals/etatglobalmodal/etatglobalmodal.page";

@Component({
  selector: 'app-etatglobal',
  templateUrl: './etatglobal.page.html',
  styleUrls: ['./etatglobal.page.scss'],
})
export class EtatglobalPage implements OnInit {

    annee=localStorage.getItem('annee');
    code=localStorage.getItem('code');
    idpole=localStorage.getItem('iden');
    idapp=localStorage.getItem('idapp');
    loadData={annee1:this.annee,annee2:'2020'};
    dossiers:any;
    constructor(public loadingController:LoadingController,
                public router:Router,public modal:ModalController,
                private toastController: ToastController,public manager:ManagerService,
                private alertCtrl: AlertController,public nav:NavController,private formBuilder:FormBuilder) { }

    ngOnInit() {
        this.parametrer();
        alert('hi')
    }

    async open(){
        let modal = await this.modal.create({
            component:EtatglobalmodalPage,
            componentProps:{value1:this.loadData.annee1,value2:this.loadData.annee2}
        });
        modal.present();
    }

    async parametrer(){
        const loading = await this.loadingController.create({
            message:"Please wait !!!",
            duration:2000
        });
        this.manager.listeDossiersTwoYears(this.code,this.loadData.annee1,this.loadData.annee2,this.idpole)
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
