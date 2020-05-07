import { Component, OnInit } from '@angular/core';
import { Marketingtest } from '../../../shared/models/marketingtest';
import { AuthService } from '../../../shared/services/auth.service';
import { MarketingtestService } from '../../../shared/services/marketingtest.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { Router } from '@angular/router';
import { RestApiService } from "../../../shared/services/rest-api.service";



@Component({
  selector: 'app-marketing-list',
  templateUrl: './marketing-list.component.html',
  styleUrls: ['./marketing-list.component.scss']
})
export class MarketingListComponent implements OnInit {
  marketingList: Marketingtest[];
  marketingObject: Marketingtest;

  loading = false;
  brands = ['All', 'Google', 'Apple', 'Realme', 'Nokia', 'Motorolla'];

  selectedBrand: 'All';

  page = 1;

  
  constructor(
    public authService: AuthService,
    private marketingService: MarketingtestService,
    private toastrService: ToastrService,
    public restApi: RestApiService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getAllMarketing();
  }

  getAllMarketing() {
		// this.spinnerService.show();
		this.loading = true;
		const x = this.marketingService.getMarketing();
		x.snapshotChanges().subscribe(
			(marketingtest) => {
				this.loading = false;
				// this.spinnerService.hide();
				this.marketingList = [];
				marketingtest.forEach((element) => {
					//con y = element.payload.doc.data(). ..toJSON();
					//y['$key'] = element.key;
					this.marketingObject = element.payload.doc.data();
					this.marketingObject.$key = element.payload.doc.id; 
					console.log("data : " + this.marketingObject.$key); 
					this.marketingList.push(this.marketingObject as Marketingtest);
				});
			},
			(err) => {
				this.toastrService.error('Error while fetching Marketing', err);
			}
		);
	}

  removeMarketing(mykey: string) {
		this.marketingService.deleteMarketing(mykey);
  }
}
