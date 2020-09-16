import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../orders.service';
import {CredentialsService} from '../../credentials/credentials.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {formatDate, DatePipe} from '@angular/common';

@Component({
  selector: 'app-create-filled-order',
  templateUrl: './create-filled-order.component.html',
  styleUrls: ['./create-filled-order.component.css']
})
export class CreateFilledOrderComponent implements OnInit {
  constructor(private ordersService: OrdersService, private credentialService: CredentialsService) { }
  startDate: Date;
  endDate: Date;
  ngOnInit(): void {
  }

  getOrders(e: Event): any {
    console.log('getOrders');
    if (!this.startDate) {
      this.startDate = new Date(Date.now());
    }
    if (!this.endDate) {
      this.endDate = new Date(Date.now());
    }
    const result = this.ordersService.getOrders(this.transformDate(this.startDate),
      this.transformDate(this.endDate));
    console.log(result);
  }

  setStartDate(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.startDate = event.value;
  }
  setEndDate(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.endDate = event.value;
  }
  transformDate(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const str: string = year + '-' + month + '-' + day;
    return str;
  }

}
