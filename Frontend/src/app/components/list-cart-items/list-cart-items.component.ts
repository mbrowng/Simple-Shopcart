import { Subscription } from 'rxjs';
import { CartModel } from '../../models/cart.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-cart-items',
  templateUrl: './list-cart-items.component.html',
  styleUrls: ['./list-cart-items.component.css']
})
export class ListCartItemsComponent implements OnInit, OnDestroy {

  cartItems: CartModel[];
  cartDiscounts = [];
  total: number;
  bestDiscount = 0;
  typeOfDiscount = "";
  superTotal = 0;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'action'];
  dataSource: MatTableDataSource<CartModel>;

  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription;
  private discountSubscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.cartItems = this.shoppingCartService.getCartItems();
    // Start of Discounts section
    this.cartDiscounts = this.shoppingCartService.getCartDiscounts();
    //console.log(this.cartDiscounts);
    this.discountSubscription = this.shoppingCartService.cartDiscountsChanged
      .subscribe(
        (data) => {
          this.cartDiscounts = data;
          //console.log(data);
          this.calcTotalDiscount(this.cartDiscounts);
        }
      ); 
    // End of Discounts Section
    this.calcTotalCost(this.cartItems);
    this.subscription = this.shoppingCartService.cartChanged
      .subscribe(
        (cartItems: CartModel[]) => {
          this.cartItems = cartItems;
          this.dataSource = new MatTableDataSource(cartItems);
          this.dataSource.sort = this.sort;
          this.calcTotalCost(this.cartItems);
          //console.log(cartItems);
        }
      );
    this.dataSource = new MatTableDataSource(this.cartItems);
    this.dataSource.sort = this.sort;
  }

  deleteItemCart(index) {
    this.shoppingCartService.deleteCartItem(index);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.discountSubscription) {
      this.discountSubscription.unsubscribe();
    }
  }

  // calculates total price
  calcTotalCost(items) {
    let total = 0;
    items.forEach((item) => {
        total += (item.price * item.quantity);
    });
   this.total = total;
  }
  // Calculate the total plus discount
  calcSuperTotal(total:number){
    this.superTotal = total - this.bestDiscount;
  }
  // calculates discount to be applied to total price
  calcTotalDiscount(disc){
    // Sort discount amount from bigger to lower
    disc.sort(
      (a,b) => {
        if(a.discount > b.discount) return -1;
        else if(a.discount < b.discount) return 1;
        else return 0;
      }
    );
    //let's get the best possible discount in the shopping cart
    let maxDiscount = Math.max.apply(Math, disc.map(function(o){ return o.discount}));
    let maxBrandDiscount = disc.find(x => x.discount === maxDiscount);
    let classicBoolean = false;
    let superdiscount = 0;
    let alertBetterDiscount = " ";
    for(var i = 0; i < disc.length; i++){
      if(disc[i].threshold <= 0){
        if(maxDiscount == disc[i].discount){
          this.typeOfDiscount = "Mejor Descuento Agregado";
          this.bestDiscount = disc[i].discount;
          classicBoolean = true;
        } else if(!classicBoolean){
          this.typeOfDiscount = "Existe un mejor descuento disponible en " + maxBrandDiscount.brand;
          if(this.bestDiscount < disc[i].discount){
            this.bestDiscount = disc[i].discount;
          }
        }
      }
    }
    this.calcSuperTotal(this.total);
    console.log(disc);
  }
}
