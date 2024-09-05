import { Routes } from '@angular/router';
import { ListProduitComponent } from './components/list-produit/list-produit.component';

export const routes: Routes = [
    { path: 'category/:id', component: ListProduitComponent },
    { path: 'category', component: ListProduitComponent },
    { path: 'products', component: ListProduitComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' }
];