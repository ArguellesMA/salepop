import { Injectable } from '@angular/core';
//import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Employee } from '../models/employee';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';

@Injectable()
export class EmployeeService {
	//products: AngularFireList<Product>;
	//product: AngularFireObject<Product>;
    employees: AngularFirestoreCollection<Employee>;
	employee:  AngularFirestoreDocument<Employee>;

	// favouriteEmployees
	//favouriteProducts: AngularFireList<FavouriteProduct>;
	//cartProducts: AngularFireList<FavouriteProduct>;
	favouriteEmployees: AngularFirestoreCollection<FavouriteEmployee>;
	cartEmployees:      AngularFirestoreDocument<FavouriteEmployee>;


	// NavbarCounts
	navbarCartCount = 0;
	navbarFavEmplCount = 0;

	constructor(
		private db: AngularFirestore,
		private authService: AuthService,
		private toastrService: ToastrService
	) {
		this.calculateLocalFavEmplCounts();
		this.calculateLocalCartEmplCounts();
	}

	getEmployees() {
		//this.products = this.db.list('products');
		this.employees = this.db.collection('employees');
		//return this.db.collection('employees');
		return this.employees;
	}

	createEmployee(data: Employee) {
		//this.products.push(data);
		return this.db.collection('employees').add(data);
	}

	getEmployeeById(key: string) {
		this.employee =   this.db.collection('employees').doc(key);
		//this.db.doc('products/' + key);
		return this.employee;
	}

	updateEmployee(data: Employee) {
	//	this.products.update(data.$key, data);
	}

	deleteEmployee(key: string) {
	//	this.products.remove(key);
	}

	/*
   ----------  Favourite Employee Function  ----------
  */

	// Get Favourite Employee based on userId
	getUsersFavouriteEmployee() {
		const user = this.authService.getLoggedInUser();
	//	this.favouriteProducts = this.db.list('favouriteProducts', (ref) =>
//			ref.orderByChild('userId').equalTo(user.$key)
//		);
		return this.favouriteEmployees;
	}

	// Adding New employee to favourite if logged else to localStorage
	addFavouriteEmployee(data: Employee): void {
		let a: Employee[];
		a = JSON.parse(localStorage.getItem('avf_item')) || [];
		a.push(data);
		this.toastrService.wait('Adding Employee', 'Adding Employee as Favourite');
		setTimeout(() => {
			localStorage.setItem('avf_item', JSON.stringify(a));
			this.calculateLocalFavEmplCounts();
		}, 1500);
	}

	// Fetching unsigned users favourite proucts
	getLocalFavouriteEmployees(): Employee[] {
		const employees: Employee[] = JSON.parse(localStorage.getItem('avf_item')) || [];

		return employees;
	}

	// Removing Favourite Employee from Database
	removeFavourite(key: string) {
//		this.favouriteProducts.remove(key);
	}

	// Removing Favourite Employee from localStorage
	removeLocalFavourite(employee: Employee) {
		const employees: Employee[] = JSON.parse(localStorage.getItem('avf_item'));

		for (let i = 0; i < employees.length; i++) {
			if (employees[i].employeeId === employee.employeeId) {
				employees.splice(i, 1);
				break;
			}
		}
		// ReAdding the employees after remove
		localStorage.setItem('avf_item', JSON.stringify(employees));

		this.calculateLocalFavEmplCounts();
	}

	// Returning Local Employees Count
	calculateLocalFavEmplCounts() {
		this.navbarFavEmplCount = this.getLocalFavouriteEmployees().length;
	}

	/*
   ----------  Cart Employee Function  ----------
  */

	// Adding new Employee to cart db if logged in else localStorage
	addToCart(data: Employee): void {
		let a: Employee[];

		a = JSON.parse(localStorage.getItem('avct_item')) || [];

		a.push(data);
		this.toastrService.wait('Adding Employee to Cart', 'Employee Adding to the cart');
		setTimeout(() => {
			localStorage.setItem('avct_item', JSON.stringify(a));
			this.calculateLocalCartEmplCounts();
		}, 500);
	}

	// Removing cart from local
	removeLocalCartEmployee(employee: Employee) {
		const employees: Employee[] = JSON.parse(localStorage.getItem('avct_item'));

		for (let i = 0; i < employees.length; i++) {
			if (employees[i].employeeId === employee.employeeId) {
				employees.splice(i, 1);
				break;
			}
		}
		// ReAdding the employees after remove
		localStorage.setItem('avct_item', JSON.stringify(employees));

		this.calculateLocalCartEmplCounts();
	}

	// Fetching Locat CartsEmployees
	getLocalCartEmployees(): Employee[] {
		const employees: Employee[] = JSON.parse(localStorage.getItem('avct_item')) || [];

		return employees;
	}

	// returning LocalCarts Employee Count
	calculateLocalCartEmplCounts() {
		this.navbarCartCount = this.getLocalCartEmployees().length;
	}
}

export class FavouriteEmployee {
	employee: Employee;
	employeeId: string;
	userId: string;
}