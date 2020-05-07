import { MarketingListComponent } from "./marketing-list/marketing-list.component";
import { ViewMarketingComponent } from './view-marketing/view-marketing.component';
import { Routes } from "@angular/router";
import { IndexComponent } from '../../index/index.component';

export const MarketingRoutes: Routes = [
	{
		path: 'marketings',
		children: [
			{
				path: '',
				component: IndexComponent
			},
			{
				path: 'all-marketing',
				component: MarketingListComponent
			},
			{
				path: 'view-marketing',
				component: ViewMarketingComponent
			}
				]
	}
];