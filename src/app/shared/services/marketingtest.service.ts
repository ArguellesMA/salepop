import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Marketingtest } from '../models/marketingtest';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';
import { User, UserDetail } from '../../shared/models/user';
import { MovInventario } from '../models/movinv';
import { ClientCompany } from '../models/clientcompany';
import { Billing } from "./../models/billing";
import { Product } from "./../models/product";


@Injectable()
export class MarketingtestService {

  marketing: AngularFirestoreCollection<Marketingtest>;
  marketingtest: AngularFirestoreDocument<Marketingtest>

	  myproducts: AngularFirestoreCollection<Product>;

		shippings: AngularFirestoreCollection<Billing>;
  	shipping: AngularFirestoreDocument<Billing>;


  userDetail: User;
  navbarCartCount = 0;
  navbarFavProdCount = 0;
  
  constructor(
		private db: AngularFirestore,
		private authService: AuthService,
  ) {}

  getMarketing() {
	//this.products = this.db.list('products');
	this.marketing = this.db.collection('marketing');
	//return this.db.collection('products');
	return this.marketing;
}

create(data: Marketingtest) {
	//this.products.push(data);
	return this.db.collection('marketing').add(data);
}

getMarketingById(key: string) {
	this.marketingtest =   this.db.collection('marketing').doc(key);
	//this.db.doc('products/' + key);
	return this.marketingtest;
}

updateProduct(data: Marketingtest) {
//	this.products.update(data.$key, data);
}

/*deleteMarketing(key: string) {
	this.userDetail = this.authService.getLoggedInUser();
	console.log(key);
	this.db.collection("marketing").doc(key).delete().then(function() {
		console.log("Document successfully deleted!");
	}).catch(function(error) {
		console.error("Error removing document: ", error);
	});
}*/

deleteMarketing(mykey: string ){

    this.userDetail = this.authService.getLoggedInUser();
    console.log(mykey);
    this.db.collection("marketing").doc(mykey).delete().then(function() {
    console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
      });
}

createProduct(data: Product) {
		//this.products.push(data);
		this.userDetail = this.authService.getLoggedInUser();
		data['userId'] = this.userDetail.$key;
		return this.db.collection('products').add(data);
 
		  var type = data["type"];
  // var collectionName = ''s
   //if (type == 'ent') collectionName = 'shippings'
  
   console.log("tipo: " + type);
   this.db.collection('shippings').add(data);
   var products = data["products"]


   this.userDetail = this.authService.getLoggedInUser();


   products.forEach((product) => {
    console.log ("product update " +   product.$key +  " - " +  product.productQuatity);
    var cantidad = 0;

  
    console.log ("userid =  " + this.userDetail.$key);
    var whtarget = data["whtarget"];


  this.myproducts  = this.db.collection('products', 
    ref => ref.where('userId', '==', this.userDetail.$key)
    .where('productId', '==', product.productId)
    .where('warehouseid', '==', whtarget)

    )
    
  this.myproducts.get().subscribe(
			(myproduct) => {

        console.log("n = " + myproduct.size);
      if (myproduct.size > 0 )
      {
        
        this.db.doc('products/' + product.$key).ref
                .get()    
                .then(function(doc) {
                  if (doc.exists) {
                    console.log("Document data:", doc.data());

                    console.log("Document data:", doc.data().productQuatity);
                    if (type == 'ent')
                      cantidad = doc.data().productQuatity + product.productQuatity;
                    if (type == 'sal')
                      cantidad = doc.data().productQuatity - product.productQuatity;
                    
                    
                      console.log("Document -- data:" + cantidad);

                    doc.ref.update({productQuatity: cantidad});
              
                    
                  } else {
                    console.log("No such document!");
                  }
                }).catch(function(error) {
                  console.log("Error getting document:", error);
                });
      }
      else
      {
        let myNewproduct :  any = new Object();
        myNewproduct["userId"] = product.userId;
	    	myNewproduct["productId"] = product.productId;
		  	myNewproduct["warehouseid"] = whtarget;
        myNewproduct["productName"] = product.productName;
        myNewproduct["productCategory"] = "--";
        myNewproduct["productPrice"] = product.productPrice;
        myNewproduct["productDescription"] = product.productDescription;
       
			 console.log("url " + product.productImageUrl);
       if (product.productImageUrl === undefined) {
          myNewproduct["productImageUrl"] = 'http://via.placeholder.com/640x360/007bff/ffffff';
       }
       else
       {
          myNewproduct["productImageUrl"] = product.productImageUrl;
       }
    	 myNewproduct["productQuatity"] = product.productQuatity;
       myNewproduct["productBarCode"]  = "010101"; //product.productBarCode; // "86101600"; // sat
       myNewproduct["productClaveProdServ"]  = product.productClaveProdServ; // "86101600"; // sat
       myNewproduct["productClaveUnidad"] = product.productClaveUnidad; // "E48";  // sat
       myNewproduct["productUnidad"] = product.productUnidad; // "Unidad de servicio"; //sat
       myNewproduct["productTransIva"] = product.productTransIva; // "Unidad de servicio"; //sat
       myNewproduct["productTransIsr"] = product.productTransIsr; // "Unidad de servicio"; //sat
       myNewproduct["productTransIeps"] = product.productTransIeps; // "Unidad de servicio"; //sat
       myNewproduct["productRetIva"] = product.productRetIva; // "Unidad de servicio"; //sat
       myNewproduct["productRetIsr"] = product.productRetIsr; // "Unidad de servicio"; //sat
      
        console.log("new product 0 ...");
        this.createProduct(myNewproduct);
        console.log("new product 1 ...");
      }
		},
		(err) => {
			//	this.toastrService.error('Error while fetching Products', err);
			});
    
    
  });
 

	}



}


export class FavouriteMarketing {
	marketing: Marketingtest;
	productId: string;
	userId: string;
}