import { Injectable } from '@angular/core';
import { CartModel } from '../../models/cart.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartDiscounts = [];
  cartDiscountsChanged = new Subject<any>();

  items: CartModel [] = [];
  cartChanged = new Subject<CartModel[]>();

  constructor() { }

  getCartItems() {
    return this.items.slice();
  }

  getCartDiscounts() {
    return this.cartDiscounts;
  }

  addCartDiscounts(discounts: any) {
    //this.cartDiscounts = [];
    this.cartDiscounts = discounts;
    this.cartDiscountsChanged.next(this.cartDiscounts.slice());
  }

  deleteCartItem(index) {
    this.items.splice(index, 1);
    this.cartChanged.next(this.items.slice());
  }

  addCartItems(item: CartModel) {
    this.items.push(item);
    this.cartChanged.next(this.items.slice());
  }
}
