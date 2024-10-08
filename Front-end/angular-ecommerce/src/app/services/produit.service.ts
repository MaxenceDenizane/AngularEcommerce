import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Produit } from '../common/produit';
import { ProduitCategory } from '../common/produit-category';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  
  
  private baseUrl = 'http://localhost:8090/api/products';

  private categoryUrl = 'http://localhost:8090/api/product-category';

  constructor(private httpClient: HttpClient) { }
    
  getProduitList(theCategoryId: number): Observable<Produit[]>{

    // build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProduits(searchUrl);
  }

  getProductCategories(): Observable<ProduitCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProduits(theKeyword: string) {
    // build URL based on category id
     const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProduits(searchUrl);
  }

  private getProduits(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduit(theProduitId: number): Observable<Produit> {
    const produitUrl = `${this.baseUrl}/${theProduitId}`;
    return this.httpClient.get<Produit>(produitUrl);
  }

  getProduitListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts>{

    // build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getSearchProduitPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProducts>{

    // build URL based on keyword id, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Produit[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProduitCategory[];
  }
}