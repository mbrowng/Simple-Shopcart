import { Component, OnInit } from '@angular/core';
import { InventoryModel } from '../../models/inventory.model';
import { InventoryService} from '../../services/inventory/inventory.service';
import { ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../../services/products/products-service';
import { CartModel } from 'src/app/models/cart.model';
import { DiscountsService } from 'src/app/services/discounts/discounts-service';

// Toast
import { ToastrService, ToastToken } from 'ngx-toastr';

@Component({
  selector: 'app-add-cart-item',
  templateUrl: './add-cart-item.component.html',
  styleUrls: ['./add-cart-item.component.css']
})

export class AddCartItemComponent implements OnInit {

  selectedItem: InventoryModel;
  items: InventoryModel[];
  cartItem: FormGroup;

  // products and discounts
  discounts = [];
  products = [];

  brandAlert = "";
  remainingDiscAlert = 0;
  remainingDiscountByBrand = [];

  public ngOnInit() {
    this.cartItem =  new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null),
      quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
      brand: new FormControl(null),
    });
  }

  constructor(private inventoryService: InventoryService,
              private shoppingCartService: ShoppingCartService,
              private productsService: ProductsService,
              private discountsService: DiscountsService,
              private toastr: ToastrService) {
    this.items = this.inventoryService.getInventory();
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products = data.data;
        //console.log(data.data);
      }
    );
    this.discountsService.getDiscounts().subscribe(
      (data) => {
        this.discounts = data.data;
        // Make every discount positive to decrease possible mistakes on further calculations
        for(var i = 0; i < this.discounts.length ; ++i){
          this.discounts[i].discount = Math.abs(this.discounts[i].discount);
        }
        //this.remainingDiscountByBrand = data.data;
        
        /*for(var i = 0; i < this.remainingDiscountByBrand.length ; ++i){
          this.remainingDiscountByBrand[i].discount = Math.abs(this.remainingDiscountByBrand[i].discount);
        }*/
      }
    );
  }

  // add product to cart
  addProduct(item:any) {
    //console.log(item);
    const cartItem = this.cartItem.value;
    cartItem.price = item.price;
    cartItem.name = item.description;
    cartItem.quantity = 1;
    cartItem.brand = item.brand;
    this.shoppingCartService.addCartItems(cartItem);
    this.checkDiscountByBrand(cartItem);
    this.cartItem.reset();
    this.selectedItem = null;
  }

  // Check discounts against brand
  checkDiscountByBrand(product: any):void {
    if(this.discounts.find(x => x.brand === product.brand) == undefined){
      console.log("No tiene Descuento");
    } else {
      console.log("tiene descuento");
  
      let discount = this.discounts.find(x => x.brand === product.brand);
      // lets find out where our discount is to modify it in the twin array
      if(this.remainingDiscountByBrand.find(x => x.brand === product.brand)){
        this.remainingDiscountByBrand.splice(this.remainingDiscountByBrand.indexOf(x => x.brand === product.brand),
                                  discount);
      } else {
        this.remainingDiscountByBrand.push(this.discounts.find(x => x.brand === product.brand));
      }
      let index = this.remainingDiscountByBrand.findIndex(x => x.brand === product.brand);
      //console.log("Hay " + discount.threshold, index);
      this.remainingDiscAlert = this.remainingDiscountByBrand[index].threshold - product.price;
      this.remainingDiscountByBrand[index].threshold =  this.remainingDiscAlert;
      // send discounts to shoppingCartService
      this.shoppingCartService.addCartDiscounts(this.remainingDiscountByBrand);
      let discountt = discount.threshold;
      if(discountt >= 0){
        this.brandAlert = "Agregado Producto de $" + product.price + " y quedan $"+discount.threshold + " de " +product.brand;
      } else {
        this.brandAlert = "Agregado Producto de $" + product.price + ", descuento aplicado de " +product.brand;
      }
    }


    // Toast
    //this.showSuccess();
    //console.log("Se descontaron " + product.price + " y Quedan "+discount.threshold, index);    //console.log(this.brandAlert + " -- " + this.remainingDiscAlert);
  }

  //Toast Magic
  /*showSuccess(){
    this.toastr.success("Hola! Fuck yeah","Hola");
  }*/

  findIndexToUpdate(newItem:any){
    return newItem.brand == this;
  }

  changeSelection(item) {
    this.selectedItem = item;
  }

  // old Cart Item when I used a predefined list
  addCartItem() {
    const cartItem = this.cartItem.value;
    cartItem.price = this.selectedItem.price;
    this.shoppingCartService.addCartItems(cartItem);
    this.cartItem.reset();
    this.selectedItem = null;
  }
}

