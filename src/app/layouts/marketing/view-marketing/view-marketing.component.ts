import { Component, OnInit, ViewChild } from '@angular/core';
import { Marketingtest } from '../../../shared/models/marketingtest';
import { MarketingtestService } from '../../../shared/services/marketingtest.service';
import { HttpClient } from '@angular/common/http';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
declare var $: any;

@Component({
  selector: 'app-view-marketing',
  templateUrl: './view-marketing.component.html',
  styleUrls: ['./view-marketing.component.scss']
})
export class ViewMarketingComponent implements OnInit {
  
  
  marketing: Marketingtest[];
  date: number;
  totalPrice = 0;
  tax = 6.4;
  private viewContent:any;

  private myTemplate: any = "";
  constructor(private marketingService: MarketingtestService, http: HttpClient) {
   
   //this.marketing = marketingService.getLocalCartProducts();

    this.marketing.forEach((marketingtest) => {
      this.totalPrice += marketingtest.price;
    });

    this.date = Date.now();
  }

  ngOnInit() {

    
   }

  downloadReceipt() {
    const data = document.getElementById('receipt');
    // console.log(data);

    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('pop_cfdi.pdf'); // Generated PDF
    });
  }
}
