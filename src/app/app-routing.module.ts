import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'liste-dossier',
    loadChildren: () => import('./liste-dossier/liste-dossier.module').then( m => m.ListeDossierPageModule)
  },
    {
        path: '',
        loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'change-profil',
    loadChildren: () => import('./change-profil/change-profil.module').then( m => m.ChangeProfilPageModule)
  },
  {
    path: 'parametrage/:id',
    loadChildren: () => import('./parametrage/parametrage.module').then( m => m.ParametragePageModule)
  },
  {
    path: 'etatglobal',
    loadChildren: () => import('./pages/etatglobal/etatglobal.module').then( m => m.EtatglobalPageModule)
  },
  {
    path: 'etatglobalmodal',
    loadChildren: () => import('./modals/etatglobalmodal/etatglobalmodal.module').then( m => m.EtatglobalmodalPageModule)
  },  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'liste-dossier-jour',
    loadChildren: () => import('./liste-dossier-jour/liste-dossier-jour.module').then( m => m.ListeDossierJourPageModule)
  },
  {
    path: 'liste-dossier-mois',
    loadChildren: () => import('./liste-dossier-mois/liste-dossier-mois.module').then( m => m.ListeDossierMoisPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
