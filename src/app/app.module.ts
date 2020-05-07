import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { TranslateService } from './shared/services/translate.service';
import { ProductModule } from './layouts/product/product.module';
import { UserModule } from './layouts/user/user.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxSoapModule } from 'ngx-soap';
import { SaleModule } from './layouts/sale/sale.module';
import { ClientModule } from './layouts/client/client.module';
//import { ProviderComponent } from './layouts/provider/provider.component';
//import { PurchaseComponent } from './layouts/purchase/purchase.component';
//import { ProviderListComponent } from './layouts/provider/provider-list/provider-list.component';
//import { PurchaseListComponent } from './layouts/purchase/purchase-list/purchase-list.component';
import { ProviderModule } from './layouts/provider/provider.module';
import { PurchaseModule } from './layouts/purchase/purchase.module';
import { ChildModule } from './layouts/childs/childs.module';
import { WarehouseModule } from './layouts/warehouse/warehouses.module';
import { MarketingModule } from './layouts/marketing/marketing.module'
//import { EmployeesListComponent } from './layouts/employees/employees-list/employees-list.component';

/* to load and set en.json as the default application language */
export function setupTranslateFactory(service: TranslateService): Function {
	return () => service.use('en');
}

@NgModule({
	declarations: [ AppComponent],
	imports: [
		NgxSoapModule,
		BrowserModule,
		BrowserAnimationsModule,
		IndexModule,
		ProductModule,
		SaleModule,
		ClientModule,
		UserModule,
		SharedModule,
		ProviderModule,
		PurchaseModule,
		ChildModule,
		WarehouseModule,
		MarketingModule,
		RouterModule.forRoot(AppRoutes),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		TranslateService,
		
		{
			provide: APP_INITIALIZER,
			useFactory: setupTranslateFactory,
			deps: [ TranslateService ],
			multi: true
		}
	],
	bootstrap: [ AppComponent ],
	schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}
