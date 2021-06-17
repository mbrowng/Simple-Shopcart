import { TestBed, inject } from '@angular/core/testing';
import * as chai from 'chai';
const expect = chai.expect;
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartService]
    });
  });

  it('Should be created', inject([ShoppingCartService], (service: ShoppingCartService) => {
    expect(service).to.not.be.null;
  }));

  it('Can add items to cart', inject([ShoppingCartService], (service: ShoppingCartService) => {
   const item = {
      'name': 'TV 32 pulgadas',
      'price': 18.000,
      quantity: 1
    };
    service.addCartItems(item);
    expect(service.getCartItems()).to.be.deep.equals([item]);
  }));

  it('Can add items to cart', inject([ShoppingCartService], (service: ShoppingCartService) => {
    const item = {
      'name': 'TV 32 Pulgadas',
      'price': 18.000,
      quantity: 1
    };
    const itemRadio = {
      'name': 'Radio Surround',
      'price': 15.000,
      quantity: 1
    };
    service.addCartItems(item);
    service.addCartItems(itemRadio);
    service.deleteCartItem(0);
    expect(service.getCartItems()).to.be.deep.equals([itemRadio]);
  }));

});
