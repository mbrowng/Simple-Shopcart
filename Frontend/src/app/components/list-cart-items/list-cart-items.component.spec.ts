import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as chai from 'chai';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const expect = chai.expect;

import { ListCartItemsComponent } from './list-cart-items.component';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { MaterialModule } from '../../material.module';

// Unit test for Cart. Add products.

describe('ListCartItemsComponent', () => {
  let component: ListCartItemsComponent;
  let fixture: ComponentFixture<ListCartItemsComponent>;
  let totalElement: DebugElement;
  let shoppingCartService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCartItemsComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCartItemsComponent);
    component = fixture.componentInstance;
    shoppingCartService = TestBed.get(ShoppingCartService);
    fixture.detectChanges();
    totalElement  = fixture.debugElement.query(By.css('.total'));
  });

  it('Should create - list cart item', () => {
    expect(component).to.not.be.null;
  });

  it('NO cart items -  total should be calculated to zero', () => {
    expect(totalElement.componentInstance.cartItems).to.be.deep.equals([]);
    expect(totalElement.nativeElement.textContent).to.be.eq('Total - $0.00');
  });

  it('Add cart items -  total should be calculated. Products without discounts', () => {
    shoppingCartService.addCartItems({
      'name': 'TV 32 pulgadas',
      'price': 18.000,
      quantity: 1
    });
    fixture.detectChanges();
    expect(totalElement.componentInstance.cartItems).to.be.deep.equals([{
      'name': 'TV 32 Pulgadas',
      'price': 18.000,
      quantity: 1
    }]);
    expect(totalElement.nativeElement.textContent).to.be.eq('Total - $36.000');
  });

  /** Will not be available due to there was no req for this feature
  it('Delete cart items -  total should be calculated', () => {
    shoppingCartService.addCartItems({
      'name': 'TV 32 Pulgadas',
      'price': 18.000,
      quantity: 1
    });
    fixture.detectChanges();
    fixture.componentInstance.deleteItemCart(0);
    fixture.detectChanges();
    expect(totalElement.nativeElement.textContent).to.be.eq('Total - $0.00');
  });
   */

  it('Add more cart items -  total should be  calculated', () => {
    shoppingCartService.addCartItems({
      'name': 'TV 32 Pulgadas',
      'price': 18.000,
      quantity: 1
    });
    shoppingCartService.addCartItems({
      'name': 'Radio Surround',
      'price': 15.000,
      quantity: 1
    });
    fixture.detectChanges();
    expect(totalElement.nativeElement.textContent).to.be.eq('Total - $32.000');

  });

});
