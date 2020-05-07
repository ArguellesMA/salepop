import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NoAccessComponent } from './shared/components/no-access/no-access.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const AppRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				loadChildren: './index/index.module#IndexModule'
			},
			{
				path: 'products',
				loadChildren: './layouts/product/product.module#ProductModule'
			},
			{
				path: 'sales',
				loadChildren: './layouts/sale/sale.module#SaleModule'
			},

			{
				path: 'clients',
				loadChildren: './layouts/client/client.module#ClientModule'
			},

			{
				path: 'users',
				loadChildren: './layouts/user/user.module#UserModule'
			},
			{
				path: 'providers',
				loadChildren: './layouts/provider/provider.module#ProviderModule'
			},
			{
				path: 'purchases',
				loadChildren: './layouts/purchase/purchase.module#PurchaseModule'
			},
			
			{
				path: 'branches',
				loadChildren: './layouts/childs/childs.module#ChildModule'
			}
			,			
			{
				path: 'warehouses',
				loadChildren: './layouts/warehouse/warehouses.module#WarehouseModule'
			},

			{
				path:'marketing',
				loadChildren:'./layouts/marketing/marketing.module#MarketingModule'
			}
		]
	},
	{ path: 'no-access', component: NoAccessComponent },
	{ path: '**', component: PageNotFoundComponent }
];
