import { Component, OnInit } from '@angular/core';
import { Produit } from '../../common/produit';
import { ProduitService } from '../../services/produit.service';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-produit',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbPaginationModule, NgbModule],
  templateUrl: './list-produit.component.html',
  styleUrl: './list-produit.component.css'
})
export class ListProduitComponent implements OnInit {
  produits: Produit[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // nouvelle propriété pour pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";

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

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProduit();
  }

  processResult() {
    return (data: any) => {
      this.produits = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  handleSearchProduits() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    // If we have a different keyword than previous
    // then set thePageNumber to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the produits using keyword
    this.produitService.getSearchProduitPaginate(this.thePageNumber - 1, 
                                                 this.thePageSize, 
                                                 theKeyword).subscribe(this.processResult());
      
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

    

    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it's currently being viewed

    // If we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the produits for the given category id
    this.produitService.getProduitListPaginate(this.thePageNumber - 1,
                                                this.thePageSize,
                                                this.currentCategoryId)
                                                .subscribe(this.processResult());
  }
}


