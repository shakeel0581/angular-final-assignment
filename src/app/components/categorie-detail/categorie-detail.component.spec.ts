import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieDetailComponent } from './categorie-detail.component';

describe('CategorieDetailComponent', () => {
  let component: CategorieDetailComponent;
  let fixture: ComponentFixture<CategorieDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorieDetailComponent]
    });
    fixture = TestBed.createComponent(CategorieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
