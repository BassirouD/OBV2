import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ManagerService} from "../services/manager.service";
import {FormControl} from "@angular/forms";
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import HC_exporting from 'highcharts/modules/exporting';
import {Chart} from "angular-highcharts";


@Component({
  selector: 'app-liste-dossier-mois',
  templateUrl: './liste-dossier-mois.page.html',
  styleUrls: ['./liste-dossier-mois.page.scss'],
})
export class ListeDossierMoisPage implements OnInit {

    data1:any=[];
    data2:any=[];
    showLocationDetail = false;
    annee=localStorage.getItem('annee');
    code=localStorage.getItem('code');
    idpole=localStorage.getItem('iden');
    idapp=localStorage.getItem('idapp');
    dossiers:any;
    mois:any=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre'];
    chartOptions:any;


    constructor(public loadingController:LoadingController,
                public router:Router,public modal:ModalController,
                private toastController: ToastController,public manager:ManagerService,
                private alertCtrl: AlertController,public nav:NavController) { }

    ngOnInit() {
        this.listdossiersbymonth();
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
        //     component:EtatglobalmonthmodalPage
        // });
        // modal.present();
    }

    effacer(){
        this.data1=[];
        this.data2=[];
    }

    listdossiersbymonth(){
        this.effacer();
        this.manager.listdossiersBymonth(this.code,this.annee,this.idpole)
            .subscribe(resp=>{
                this.dossiers=resp;
                // console.log(this.dossiers);
                // for(var i=0;i<this.dossiers.length;i++){
                //     this.data1.push(this.mois[this.dossiers[i].Periode-1])
                //     this.data2.push(this.dossiers[i].count)
                // }
                //
                //
                // this.chartOptions = new Chart({
                //     chart: {
                //         type: 'spline'
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
                //         name:'mois',
                //         type:undefined,
                //         data: this.data2
                //     }]
                //
                // });
                // var chart = Highcharts.chart("highcharts", chartOptions);
            },err=>{
                console.log(err);
            })
    }

    openModalGraph(){
        this.effacer();
        this.manager.listdossiersBymonth(this.code,this.annee,this.idpole)
            .subscribe(resp=>{
                this.dossiers=resp;
                console.log(this.dossiers);
                for(var i=0;i<this.dossiers.length;i++){
                    this.data1.push(this.mois[this.dossiers[i].Periode-1])
                    this.data2.push(this.dossiers[i].count)
                }


                this.chartOptions = new Chart({
                    chart: {
                        type: 'spline'
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
                        name:'mois',
                        type:undefined,
                        data: this.data2
                    }]

                });
                // var chart = Highcharts.chart("highcharts", chartOptions);
            },err=>{
                console.log(err);
            })
    }

    goToProfil(){
        this.router.navigate(['/tabs/compte'])
    }
}
