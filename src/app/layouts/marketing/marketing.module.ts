import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarketingComponent } from "./marketing.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MarketingRoutes } from "./marketing.routing";
import { NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { MarketingListComponent } from './marketing-list/marketing-list.component';
import { ViewMarketingComponent } from './view-marketing/view-marketing.component';

  
@NgModule({
  imports: [HttpClientModule, CommonModule, RouterModule.forChild(MarketingRoutes), SharedModule],
	declarations: [
		MarketingListComponent,
		ViewMarketingComponent
		
	],
  exports: [/*BestProductComponent*/],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class MarketingModule { }
