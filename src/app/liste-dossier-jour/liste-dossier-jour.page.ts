import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AlertController, LoadingController, ModalController, NavController, ToastController} from "@ionic/angular";
import {ManagerService} from "../services/manager.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {EtatglobalmodalPage} from "../modals/etatglobalmodal/etatglobalmodal.page";
import * as Highcharts from 'highcharts';
import { Options} from "highcharts";
import { Chart } from 'angular-highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-liste-dossier-jour',
  templateUrl: './liste-dossier-jour.page.html',
  styleUrls: ['./liste-dossier-jour.page.scss'],
})
export class ListeDossierJourPage implements OnInit {

    showLocationDetail = false;
    annee=localStorage.getItem('annee');
    code=localStorage.getItem('code');
    idpole=localStorage.getItem('iden');
    idapp=localStorage.getItem('idapp');
    dossiers:any;
    data1:any=[];
    data2:any=[];
    moisnom:any;
    mois1:any;
    loadData={mois:''};
    mois:any=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre'];
    chartOptions:any;

    constructor(public loadingController:LoadingController,
                public router:Router,public modal:ModalController,
                private toastController: ToastController,public manager:ManagerService,
                private alertCtrl: AlertController,public nav:NavController) { }

    ngOnInit() {
    }

    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    // show or hide a location string later
    onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 40;
    }

    segmentChanged($event: any) {}
    activeSegment: FormControl = new FormControl('list');


    effacer(){
        this.data1=[];
        this.data2=[];
    }

    async parametrer(){
        this.effacer();
        const loading = await this.loadingController.create({
            message:"Please wait !!!",
            duration:3000
        });
        this.manager.listedossiersbydaymonth(this.code,this.annee,this.loadData.mois,this.idpole)
            .subscribe(resp=>{
                this.dossiers=resp;
                loading.dismiss();
                console.log("dossiers "+ JSON.stringify(this.dossiers));

                // for(var i=0;i<this.dossiers.length;i++){
                //     this.data1.push(this.dossiers[i].Periode)
                //     this.data2.push(this.dossiers[i].count)
                // }
                // this.moisnom=this.mois[this.mois1];
                //
                // // console.log(this.data1)
                // this.chartOptions = new Chart({
                //     chart: {
                //         type: 'spline'
                //     },
                //     title: {
                //         text: 'Volume dossiers traités par jour au mois de : '+this.moisnom
                //     },
                //     colors:[
                //         '#6495ED'
                //     ],
                //     xAxis: {
                //         categories: this.data1
                //     },
                //     yAxis: {
                //         title: {
                //             text: 'Volume dossier traité'
                //         }
                //     },
                //     series:[{
                //         name:'jour',
                //         type:undefined,
                //         data: this.data2
                //     }]
                //
                // });
                // // var chart = Highcharts.chart("highcharts", chartOptions);
            },err=>{
                loading.dismiss();
                this.presentAlert("Données non disponibles");
                console.log(err);
            })
    }

    openGraphModal(){
        this.effacer();
        this.manager.listedossiersbydaymonth(this.code,this.annee,this.loadData.mois,this.idpole)
            .subscribe(resp=>{
                this.dossiers=resp;
                console.log("dossiers "+ JSON.stringify(this.dossiers));

                for(var i=0;i<this.dossiers.length;i++){
                    this.data1.push(this.dossiers[i].Periode)
                    this.data2.push(this.dossiers[i].count)
                }
                this.moisnom=this.mois[this.mois1];

                // console.log(this.data1)
                this.chartOptions = new Chart({
                    chart: {
                        type: 'spline'
                    },
                    credits: {
                        enabled: false,
                    },
                    title: {
                        text: 'Volume dossiers traités par jour au mois de : '+this.moisnom
                    },
                    colors:[
                        '#6495ED'
                    ],
                    xAxis: {
                        categories: this.data1
                    },
                    yAxis: {
                        title: {
                            text: 'Volume dossier traité'
                        }
                    },
                    series:[{
                        name:'jour',
                        type:undefined,
                        data: this.data2
                    }]

                });
                // var chart = Highcharts.chart("highcharts", chartOptions);
            },err=>{
                this.presentAlert("Données non disponibles");
                console.log(err);
            })
    }

    goToOverview(){
        let id=localStorage.getItem('id');
        this.router.navigate(['tabs/overview',id]);
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

    async open(){
    //     let modal = await this.modal.create({
    //         component:EtatglobaldaymodalsPage,
    //         componentProps:{value1:this.loadData.mois}
    //     });
    //     modal.present();
    }

    goToProfil(){
        this.router.navigate(['/tabs/compte'])
    }

}
