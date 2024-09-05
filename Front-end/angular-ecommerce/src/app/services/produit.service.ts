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

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductCategories(): Observable<ProduitCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Produit[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProduitCategory[];
  }
}