import { Component, NgModule, OnInit } from '@angular/core';
import { Produit } from '../../common/produit';
import { ProduitService } from '../../services/produit.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-produit',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './details-produit.component.html',
  styleUrl: './details-produit.component.css'
})
export class DetailsProduitComponent implements OnInit {

  produit!: Produit;

  constructor(private produitService: ProduitService, 
              private route: ActivatedRoute) { }
              
  ngOnInit(): void{
    this.route.paramMap.subscribe(() => {
      this.handleProduitDetails();
    });
  }
  handleProduitDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProduitId: number = +this.route.snapshot.paramMap.get('id')!;
    this.produitService.getProduit(theProduitId).subscribe(
      ((data: Produit) => {
        this.produit = data;
      })
    );
  }
}
