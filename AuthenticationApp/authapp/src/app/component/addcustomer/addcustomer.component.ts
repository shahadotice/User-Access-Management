import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../_service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { customer } from '../../_model/customer.model';

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.css'
})
export class AddcustomerComponent implements OnInit {
  customerForm: any;
  _response: any;
  title = 'Add Customer';
  buttonText='Save';
  editcode = '';
  isedit = false;
  editdata!: customer;
  constructor(private builder: FormBuilder, private service: CustomerService, private toastr: ToastrService,
    private router: Router, private act: ActivatedRoute) {
    this.customerForm = this.builder.group({
      code: this.builder.control('', Validators.required),
      name: this.builder.control('', Validators.required),
      email: this.builder.control('', Validators.required),
      phone: this.builder.control('', Validators.required),
      creditlimit: this.builder.control(0, Validators.required),
      status: this.builder.control(true)
    })
  }
  ngOnInit(): void {

    this.editcode = this.act.snapshot.paramMap.get('code') as string;
    if (this.editcode != '' && this.editcode != null) {
      this.isedit = true;
      this.title = 'Edit Customer';
      this.buttonText='Update';
      this.customerForm.controls['code'].disable();
      this.service.GetbyCode(this.editcode).subscribe(item => {
        this.editdata = item;

        this.customerForm.setValue({
          code: this.editdata.code,
          name: this.editdata.name,
          email: this.editdata.email,
          phone: this.editdata.phone,
          creditlimit: this.editdata.creditlimit,
          status: this.editdata.isActive

        })
      })
    }
  }

  SaveCustomer() {
    if (this.customerForm.valid) {
      let _obj: customer = {
        code: this.customerForm.value.code as string,
        name: this.customerForm.value.name as string,
        email: this.customerForm.value.email as string,
        phone: this.customerForm.value.phone as string,
        creditlimit: this.customerForm.value.creditlimit as number,
        isActive: this.customerForm.value.status as boolean,
        statusname: ''
      }
      if(!this.isedit){
        this.service.CreateCustomer(_obj).subscribe(item => {
          this._response = item;
  
          if (this._response.result === 'pass') {
            this.toastr.success('Created successfully', 'success');
            this.router.navigateByUrl('/Customer');
          }
          else {
            this.toastr.error('Failled due to' + this._response.message, 'error');
          }
        });

      }
      else{
        _obj.code=this.editcode;
        this.service.UpdateCustomer(_obj).subscribe(item => {
          this._response = item;
  
          if (this._response.result === 'pass') {
            this.toastr.success('Updated successfully', 'update');
            this.router.navigateByUrl('/Customer');
          }
          else {
            this.toastr.error('Failled due to' + this._response.message, 'error');
          }
        });
      }
     

    }
  }


}
