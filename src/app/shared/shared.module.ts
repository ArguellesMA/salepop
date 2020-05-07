import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoProductsFoundComponent } from "./components/no-products-found/no-products-found.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
//import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule, FormBuilder } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { OwlModule } from "ngx-owl-carousel";
import { NgxPaginationModule } from "ngx-pagination";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { NoAccessComponent } from "./components/no-access/no-access.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { FireBaseConfig } from "../../environments/firebaseConfig";
import { FilterByBrandPipe } from "./pipes/filterByBrand.pipe";
import { ProductService } from "./services/product.service";
import { SaleService } from "./services/sale.service";
import { ClientCompanyService } from "./services/clientcompany.service";
import { ProviderService } from "./services/provider.service";

import { ChildService } from "./services/child.service";
import { WarehouseService } from "./services/warehouse.service";
import { EmployeeService } from "./services/employee.service";
import { MarketingService } from "./services/marketing.service";

import { AdminGaurd } from "./services/admin-gaurd";
import { AuthGuard } from "./services/auth_gaurd";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { TranslatePipe } from "./pipes/translate.pipe";
import { NgxContentLoadingModule } from "ngx-content-loading";
import { CardLoaderComponent } from "./components/card-loader/card-loader.component";
import { MomentTimeAgoPipe } from "./pipes/moment-time-ago.pipe";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MarketingtestService } from './services/marketingtest.service';

@NgModule({
	imports: [
		CommonModule,
		MDBBootstrapModule.forRoot(),
		AngularFireModule.initializeApp(FireBaseConfig),
		AngularFireDatabaseModule,
		AngularFirestoreModule,
		AngularFireAuthModule,
		FormsModule,
		HttpClientModule,
		RouterModule,
		OwlModule,
		NgxPaginationModule,
		AgmCoreModule.forRoot({
			apiKey: "AIzaSyDMbxW3MlwUP2vrAZVJyu7pYqZa1LthvTE"
		}),
		NgxContentLoadingModule
	],
	declarations: [
		NoProductsFoundComponent,
		FilterByBrandPipe,
		NoAccessComponent,
		PageNotFoundComponent,
		TranslatePipe,
		CardLoaderComponent,
		MomentTimeAgoPipe
	],
	exports: [
		NoProductsFoundComponent,
		FormsModule,
		MDBBootstrapModule,
		AngularFireModule,
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		FormsModule,
		RouterModule,
		OwlModule,
		NgxPaginationModule,
		FilterByBrandPipe,
		AgmCoreModule,
		NoAccessComponent,
		PageNotFoundComponent,
		TranslatePipe,
		MomentTimeAgoPipe,
		NgxContentLoadingModule,
		CardLoaderComponent,
		CdkTableModule,
		CdkTreeModule,
		DragDropModule, ScrollingModule
	],
	providers: [AuthService, AuthGuard, AdminGaurd, 
		ProductService, SaleService, ClientCompanyService, 
		ChildService, WarehouseService, EmployeeService,
		MarketingService, ProviderService, UserService, FormBuilder, MarketingtestService]
})
export class SharedModule { }
