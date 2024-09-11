import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ListProduitComponent } from './components/list-produit/list-produit.component';
import { ProduitService } from './services/produit.service';
import { CommonModule } from '@angular/common';
import { ProduitCategoryMenuComponent } from './components/produit-category-menu/produit-category-menu.component';
import { SearchComponent } from './components/search/search.component';

;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListProduitComponent, CommonModule, RouterModule, ProduitCategoryMenuComponent, SearchComponent],
  providers: [ProduitService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';
}
