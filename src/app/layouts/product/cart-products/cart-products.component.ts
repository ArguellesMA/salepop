import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ClientCompany } from '../../../shared/models/clientcompany';
import { ProductService } from '../../../shared/services/product.service';
import { ClientCompanyService } from '../../../shared/services/clientcompany.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { User } from '../../../shared/models/user';
import { Router } from "@angular/router"; 


import { Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';


@Component({
	selector: 'app-cart-products',
	templateUrl: './cart-products.component.html',
	styleUrls: [ './cart-products.component.scss' ]
})
export class CartProductsComponent implements OnInit {
	cartProducts: Product[];
	clientCompanyList: ClientCompany[];
	clientCompanyObject: ClientCompany;
	loading = false;
	showDataNotFound = true;
  selectedClient : String;
  userDetail: User;

	// Not Found Message
	messageTitle = 'No Products Found in Cart';
	messageDescription = 'Please, Add Products to Cart';

	constructor(private productService: ProductService,
		private clientCompanyService: ClientCompanyService,
    private toastrService: ToastrService,
		) {
    }

	ngOnInit() {
		this.getCartProduct();
    this.getAllClients();
  }
  

	removeCartProduct(product: Product) {
		this.productService.removeLocalCartProduct(product);

		// Recalling
		this.getCartProduct();
	}

	getCartProduct() {
		this.cartProducts = this.productService.getLocalCartProducts();
	}

	getAllClients() {
        //       

        console.log("getting products");
  
        this.loading = true;
        const x = this.clientCompanyService.getClientCompanys();
        x.snapshotChanges().subscribe(
          (clients) => {
            this.loading = false;
            // this.spinnerService.hide();
            this.clientCompanyList = [];
            console.log(" clients" + clients);
  
            clients.forEach((element) => {
              //con y = element.payload.doc.data(). ..toJSON();
              //y['$key'] = element.key;
              this.clientCompanyObject = element.payload.doc.data();
              this.clientCompanyObject.$key = element.payload.doc.id; 
              console.log("data : " + this.clientCompanyObject.$key); 
              this.clientCompanyList.push(this.clientCompanyObject as ClientCompany);
            });
          },
          (err) => {
            this.toastrService.error('Error while fetching Products', err);
          }
        );
      }
   
	  selectClientData()
  {
    
  //alert(this.selectedClient);
  let myClient = this.clientCompanyList.find(x => x.$key === this.selectedClient);
  //alert(myClient.name);
  this.productService.addToClient(myClient);
  /*
  this.truckNumber = "096754231";
 this.truckBrand = myTruck.brand;
  this.truckModel = myTruck.model;
  this.truckYear = myTruck.year;
  this.truckPlate = myTruck.plate;
  */
  }

	increaseProd(product: Product) {
    this.productService.increaseProduct(product);
  }

  discraseprod(product: Product){
    this.productService.decreaseProduct(product);
  }

}
