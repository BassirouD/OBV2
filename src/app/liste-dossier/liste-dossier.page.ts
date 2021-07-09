import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {AlertController, LoadingController, ModalController, NavController, ToastController} from "@ionic/angular";
import {ManagerService} from "../services/manager.service";
import {EtatglobalmodalPage} from "../modals/etatglobalmodal/etatglobalmodal.page";
import * as Highcharts from 'highcharts';
import { Options} from "highcharts";
import { Chart } from 'angular-highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-liste-dossier',
  templateUrl: './liste-dossier.page.html',
  styleUrls: ['./liste-dossier.page.scss'],
})
export class ListeDossierPage implements OnInit {

    chartOptions:any;
    showLocationDetail = false;
    annee=localStorage.getItem('annee');
    code=localStorage.getItem('code');
    idpole=localStorage.getItem('iden');
    idapp=localStorage.getItem('idapp');
    loadData={annee1:this.annee,annee2:''};
    dossiers:any;
    data1:any=[];
    data2:any=[];

    constructor(private http: HttpClient, private router: Router,
                public loadingController:LoadingController,
                public modal:ModalController,
                private toastController: ToastController,public manager:ManagerService,
                private alertCtrl: AlertController,public nav:NavController,private formBuilder:FormBuilder) {}

    ngOnInit() {
        //this.parametrer(2015,2020);
    }

    // Dummy refresher function
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

    idTot = localStorage.getItem('id');
    goToOverview(){
        let id=localStorage.getItem('id');
        this.router.navigate(['tabs/overview',id]);
    }

    async open(){
        // let modal = await this.modal.create({
        //     component:EtatglobalmodalPage,
        //     componentProps:{value1:this.loadData.annee1,value2:this.loadData.annee2}
        // });
        // modal.present();
    }

    effacer(){
        this.data1=[];
        this.data2=[];
    }

    async parametrer(anne1,anne2){
        this.effacer();
        const loading = await this.loadingController.create({
            message:"Please wait !!!",
            duration:2000
        });
        this.manager.listeDossiersTwoYears(this.code,this.loadData.annee1,this.loadData.annee2,this.idpole)
            .subscribe(resp=>{
                this.dossiers=resp;
                loading.dismiss();
                // console.log("dossiers "+ JSON.stringify(this.dossiers));
                //
                // for(var i=0;i<this.dossiers.length;i++){
                //     this.data1.push(this.dossiers[i].Periode)
                //     this.data2.push(this.dossiers[i].count)
                // }
                // this.chartOptions = new Chart({
                //     chart: {
                //         type: 'column'
                //     },
                //     title: {
                //         text: 'Etat global '
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
                //         name:'',
                //         type:undefined,
                //         data: this.data2
                //     }]
                //
                // });
                // //var chart = Highcharts.chart("highcharts", chartOptions);

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

    openGraphiqueView(){
        this.effacer();
        // const loading = await this.loadingController.create({
        //     message:"Please wait !!!",
        //     duration:2000
        // });
        this.manager.listeDossiersTwoYears(this.code,this.loadData.annee1,this.loadData.annee2,this.idpole)
            .subscribe(resp=>{
                this.dossiers=resp;
                console.log("dossiers "+ JSON.stringify(this.dossiers));

                for(var i=0;i<this.dossiers.length;i++){
                    this.data1.push(this.dossiers[i].Periode)
                    this.data2.push(this.dossiers[i].count)
                }
                this.chartOptions = new Chart({
                    chart: {
                        type: 'column'
                    },
                    credits: {
                        enabled: false,
                    },

                    title: {
                        text: 'Etat global '
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
                        name:'',
                        type:undefined,
                        data: this.data2
                    }]

                });
                //var chart = Highcharts.chart("highcharts", chartOptions);

            },err=>{
                this.presentAlert("Données non disponibles");
                console.log(err);
            })
    }

    goToProfil(){
        this.router.navigate(['/tabs/compte'])
    }


}
