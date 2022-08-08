import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [
    { 
        path: 'home', 
        component: PagesComponent,
        loadChildren:()=> import('./child-rotes-pages.module').then(m =>m.ChildRotesPagesModule)
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}