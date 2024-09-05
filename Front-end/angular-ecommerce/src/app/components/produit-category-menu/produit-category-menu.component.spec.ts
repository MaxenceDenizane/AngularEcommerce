import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitCategoryMenuComponent } from './produit-category-menu.component';

describe('ProduitCategoryMenuComponent', () => {
  let component: ProduitCategoryMenuComponent;
  let fixture: ComponentFixture<ProduitCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitCategoryMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
