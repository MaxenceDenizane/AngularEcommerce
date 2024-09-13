import { Routes } from '@angular/router';
import { ListProduitComponent } from './components/list-produit/list-produit.component';
import { DetailsProduitComponent } from './components/details-produit/details-produit.component';

export const routes: Routes = [
    {path: 'products/:id', component: DetailsProduitComponent},
    {path:  'search/:keyword', component:  ListProduitComponent},
    { path: 'category/:id', component: ListProduitComponent },
    { path: 'category', component: ListProduitComponent },
    { path: 'products', component: ListProduitComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' }
];

