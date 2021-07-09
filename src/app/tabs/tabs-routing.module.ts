import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'overview/:id',
        loadChildren: () => import('../overview/overview.module').then( m => m.OverviewPageModule)
      },
      {
        path: 'document',
        loadChildren: () => import('../document/document.module').then( m => m.DocumentPageModule)
      },
      {
        path: 'compte',
        loadChildren: () => import('../compte/compte.module').then( m => m.ComptePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/overview',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/overview',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
