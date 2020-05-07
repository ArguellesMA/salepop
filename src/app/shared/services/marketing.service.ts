import { Injectable } from '@angular/core';
//import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Marketing } from '../models/marketing';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';
import { ClientCompany } from '../models/clientcompany';
import { User } from '../../shared/models/user';
import { MovInventario } from '../models/movinv';
import { Billing } from "./../models/billing";
import { Product } from "./../models/product";
import { ProductService } from './product.service';
//import { ProductsComponent } from 'src/app/layouts/product/checkout/products/products.component';
	
@Injectable()
export class MarketingService {
	//products: AngularFireList<Product>;
	//product: AngularFireObject<Product>;
	userDetail: User;

    products: AngularFirestoreCollection<Marketing>;
	  product:  AngularFirestoreDocument<Marketing>;

		  myproducts: AngularFirestoreCollection<Product>;
		  shippings: AngularFirestoreCollection<Billing>;
  		  shipping: AngularFirestoreDocument<Billing>;

    // NavbarCounts
	navbarCartCount = 0;
	navbarProviderCount = 0;

	navbarFavProdCount = 0;

	constructor(
		private db: AngularFirestore,
		private authService: AuthService,
		private toastrService: ToastrService,
		private productService: ProductService
	) {

		this.calculateLocalCartProdCounts();
		this.calculateLocalProviderProdCounts();
	}

	getProducts(whkey) {
		//this.products = this.db.list('products');
		this.userDetail = this.authService.getLoggedInUser();

		this.products  = this.db.collection('products', 
			ref => ref.where('userId', '==', this.userDetail.$key)
			.where('warehouseid', '==', whkey));
		

		//var myproducts = productRef.where('userId', '=', );
		//return this.db.collection('products');
		return this.products;
	}

	createProducts(data: Marketing) {
		//this.products.push(data);
		this.userDetail = this.authService.getLoggedInUser();
		data['userid'] = this.userDetail.$key;
		return this.db.collection('marketing').add(data);
	}


	createProduct(products: Marketing) {
	
		    console.log ("userid =  " + this.userDetail.$key);
    		var whtarget = products["whtarget"];

		this.myproducts  = this.db.collection('marketing', 
			ref => ref.where('userid', '==', this.userDetail.$key)
			.where('productid', '==', products.productid)
			.where('type', '==', "promo")
			)

		this.myproducts.get().subscribe(
				(myproduct) => {
					//console.log("n = " + myproduct.size);
				if (myproduct.size == 1)
				{
					//console.log("i'm here")
					this.db.doc('marketing/' + products.$key).ref
									.get()    
									.then(function(doc) {
										if (doc.exists) {
											console.log("this product already exist")

										}else {

											console.log("This promo exist in marketing!");
										}
									}).catch(function(error) {
										console.log("Error getting document:", error);
									});
				}
				else
				{

					
					let myNewproduct :  any = new Object();
					
					console.log("here entry")
					myNewproduct["productid"] = products.productid;
					myNewproduct["sucid"] = products.sucid;
					myNewproduct["price"] = products.price;
					myNewproduct["description"] = products.description;
					myNewproduct["imageurl"] = products.imageurl;
					myNewproduct["quantity"] = products.quantity;
					myNewproduct["status"] = products.status;
					myNewproduct["type"] = products.type;
					console.log("new product 0 ...");
					this.createProducts(myNewproduct);
					console.log("new product 1 ...");
				}
			},
			(err) => {
					this.toastrService.error('Error while fetching Products', err);
				});
}


createCuponMarketing(products: Marketing) {
	
	console.log ("userid =  " + this.userDetail.$key);
	var whtarget = products["whtarget"];

this.myproducts  = this.db.collection('marketing', 
	ref => ref.where('userid', '==', this.userDetail.$key)
	.where('productid', '==', products.productid)
	.where('type', '==', "cupon")
	)

this.myproducts.get().subscribe(
		(myproduct) => {
			//console.log("n = " + myproduct.size);
		if (myproduct.size == 1)
		{
			//console.log("i'm here")
			this.db.doc('marketing/' + products.$key).ref
							.get()    
							.then(function(doc) {
								if (doc.exists) {
										console.log("this product already exist")
								}else {

									console.log("this cupon exist in marketing");
								}
							}).catch(function(error) {
								console.log("Error getting document:", error);
							});
		}
		else
		{

			
			let myNewproduct :  any = new Object();
			
			console.log("here entry")
			myNewproduct["productid"] = products.productid;
			myNewproduct["sucid"] = products.sucid;
			myNewproduct["price"] = products.price;
			myNewproduct["description"] = products.description;
			myNewproduct["imageurl"] = products.imageurl;
			myNewproduct["quantity"] = products.quantity;
			myNewproduct["status"] = products.status;
			myNewproduct["type"] = products.type;
			console.log("new product 0 ...");
			this.createProducts(myNewproduct);
			console.log("new product 1 ...");
		}
	},
	(err) => {
			this.toastrService.error('Error while fetching Products', err);
		});
}



	getProductById(key: string) {
		this.product =   this.db.collection('products').doc(key);
		//this.db.doc('products/' + key);
		return this.product;
	}


	updateProduct(data: Marketing) {
	//	this.products.update(data.$key, data);
	}

	deleteProduct(key: string) {
	//	this.products.remove(key);
	}

	
	/*
   ----------  Cart Product Function  ----------
  */

    	// Adding new Client to cart db if logged in else localStorage
	addToMovInv(data: MovInventario): void {
		let a: MovInventario;
		console.log("mov 0 " + data);
		//a = JSON.parse(localStorage.getItem('avct_movinv')) || {};

		a = data;
		console.log("mov 1 " + a);

		this.toastrService.wait('Adding Mov Inventario Cart', 'Client Adding to the cart');
		setTimeout(() => {
			localStorage.setItem('avct_movinv', JSON.stringify(a));
			//this.calculateLocalCartProdCounts();
		}, 500);
	}

	// Fetching Locat Client
	getLocalMovInv(): MovInventario {
		const mymovInventario: MovInventario = JSON.parse(localStorage.getItem('avct_movinv')) || {};

		return mymovInventario;
	}

  	// Adding new Client to cart db if logged in else localStorage
	addToClient(data: ClientCompany): void {
		let a: ClientCompany;

		a = JSON.parse(localStorage.getItem('avct_client')) || {};

		a = data;
		this.toastrService.wait('Adding Client to Cart', 'Client Adding to the cart');
		setTimeout(() => {
			localStorage.setItem('avct_client', JSON.stringify(a));
			//this.calculateLocalCartProdCounts();
		}, 500);
	}

	// Fetching Locat Client
	getLocalClient(): ClientCompany {
		const clientCompany: ClientCompany = JSON.parse(localStorage.getItem('avct_client')) || {};

		return clientCompany;
	}
	// Adding new Product to cart db if logged in else localStorage
	addToCart(data: Marketing): void {
		this.userDetail = this.authService.getLoggedInUser();

		var myshoppincar = this.userDetail.$key + "_sales";
		console.log ('shoppingcar ' + myshoppincar)
		let a: Marketing[];

		a = JSON.parse(localStorage.getItem(myshoppincar)) || [];
		if (a.length==0)
		{
			console.log("primer producto");
			//			
			data["productQuatity"] = 1;
			a.push(data);
		}
		else
		{
			var ProductFound = false;

				for (let i = 0; i < a.length; i++) {

					if (a[i].productid == data["productId"]) {

						ProductFound = true;
						console.log("producto ya existe");
				/*		var cantidad = a[i].productQuatity;
						cantidad = cantidad + 1;
						a[i].productQuatity = cantidad;
						console.log("cantidad " + a[i].productQuatity);
*/
		//				a.push(data);
				
					}
					
				}

			if (!ProductFound) {
				
						console.log("producto nuevo");
						data["productQuatity"] = 1;
						a.push(data);

			}
		}
		this.toastrService.wait('Adding Product to Cart', 'Product Adding to the cart');
		setTimeout(() => {
			localStorage.setItem(myshoppincar, JSON.stringify(a));
			this.calculateLocalCartProdCounts();
		}, 500);
	}

	// Removing cart from local
	removeLocalCartProduct(product: Marketing) {
		this.userDetail = this.authService.getLoggedInUser();

		var myshoppincar = this.userDetail.$key + "_sales";
		console.log ('shoppingcar ' + myshoppincar)

		const products: Marketing[] = JSON.parse(localStorage.getItem(myshoppincar));

		for (let i = 0; i < products.length; i++) {
			if (products[i].productid === product.productid) {
				products.splice(i, 1);
				break;
			}
		}
		// ReAdding the products after remove
		localStorage.setItem(myshoppincar, JSON.stringify(products));

		this.calculateLocalCartProdCounts();
	}

	// Fetching Locat CartsProducts
	getLocalCartProducts(): Marketing[] {
		try{
		this.userDetail = this.authService.getLoggedInUser();

		var myshoppincar = this.userDetail.$key + "_sales";
		console.log ('count shoppingcar ' + myshoppincar)
		
		console.log ('local storage ' + localStorage.getItem(myshoppincar))

		const products: Marketing[] = JSON.parse(localStorage.getItem(myshoppincar)) || [];

		console.log ('products ' + products.length)

		return products;
	}catch{
		console.log('error getproducts')
	}
	}

	removeLocalProviderProduct(product: Marketing) {
		this.userDetail = this.authService.getLoggedInUser();

		var myshoppincar = this.userDetail.$key + "_provider";
		console.log ('count provider shoppingcar ' + myshoppincar)
	
		const products: Marketing[] = JSON.parse(localStorage.getItem(myshoppincar));

		for (let i = 0; i < products.length; i++) {
			if (products[i].productid === product.productid) {
				products.splice(i, 1);
				break;
			}
		}
		// ReAdding the products after remove
		localStorage.setItem(myshoppincar, JSON.stringify(products));

		this.calculateLocalProviderProdCounts();
	}

	

	getLocalProviderProducts(): Marketing[] {
		this.userDetail = this.authService.getLoggedInUser();

		var myshoppincar = this.userDetail.$key + "_provider";
		console.log ('count provider shoppingcar ' + myshoppincar)
		
		const products: Marketing[] = JSON.parse(localStorage.getItem(myshoppincar)) || [];

		return products;
	}
	// returning LocalCarts Product Count
	calculateLocalCartProdCounts() {
		this.navbarCartCount = this.getLocalCartProducts().length;
	}

	calculateLocalProviderProdCounts() {
		this.navbarProviderCount = this.getLocalProviderProducts().length;
	}
}
