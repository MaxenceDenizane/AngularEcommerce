import { Component, OnInit } from '@angular/core';
import { Produit } from '../../common/produit';
import { ProduitService } from '../../services/produit.service';
import { CommonModule} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import e from 'express';

@Component({
  selector: 'app-list-produit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-produit.component.html',
  styleUrl: './list-produit.component.css'
})
export class ListProduitComponent implements OnInit {
  produits: Produit[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private produitService: ProduitService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
    this.listProduit();
    });
  }
  listProduit() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProduits();
    }
    else {
      this.handleListeProduits();
    }
  }

  handleSearchProduits() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the produits using keyword
    this.produitService.searchProduits(theKeyword).subscribe(
      ((data: Produit[]) => {
        this.produits = data;
      })
    );
  }

  handleListeProduits() {
    // Check if "id" est disponible
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // Get the "id" param string. Convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else { 
      // Not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    this.produitService.getProduitList(this.currentCategoryId).subscribe(
      ((data: Produit[]) => {
        this.produits = data;
      })
    );
  }
}


