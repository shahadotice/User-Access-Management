import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { customer } from '../_model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  baseiurl=environment.apiUrl;
  Getall() {
    return this.http.get<customer[]>(this.baseiurl + 'Customer/GetAll');
  }
  GetbyCode(code:string) {
    return this.http.get<customer>(this.baseiurl + 'Customer/Getbycode?code='+code);
  }
  // CreateCustomer(_data:customer) {
  //   return this.http.post(this.baseiurl + 'Customer/Create',_data);
  // }
  CreateCustomer(_data: customer) {
    return this.http.post(this.baseiurl + 'Customer/Create', _data);
  }
  UpdateCustomer(_data:customer) {
    return this.http.put(this.baseiurl + 'Customer/Update?code='+_data.code,_data);
  }

  DeleteCustomer(code:string) {
    return this.http.delete(this.baseiurl + 'Customer/Remove?code='+code);
  }
}
