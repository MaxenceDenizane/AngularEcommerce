import { Component } from '@angular/core';
import { ProduitCategory } from '../../common/produit-category';
import { ProduitService } from '../../services/produit.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-produit-category-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './produit-category-menu.component.html',
  styleUrl: './produit-category-menu.component.css'
})
export class ProduitCategoryMenuComponent{

  productCategories: ProduitCategory[] = [];

  constructor( private produitService: ProduitService) { }

  ngOnInit(){
    this.listProductCategories();
  }
  listProductCategories() {
    this.produitService.getProductCategories().subscribe(
      (data: ProduitCategory[]) => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      },
      error => {
        console.log('Error=' + error);
      }
    );
  }
}
