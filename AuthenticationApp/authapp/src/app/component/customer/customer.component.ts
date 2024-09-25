import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../_service/customer.service';
import { customer } from '../../_model/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { menupermission } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule,RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  
  customerlist!: customer[];
  displayedColumn:string[]=["code","name","email","phone","creditlimit","status","action"];
  datasource:any;
  _response:any;
  _permission: menupermission = {
    code: '',
    name: '',
    haveview: false,
    haveadd: false,
    haveedit: false,
    havedelete: false,
    userrole: '',
    menucode: ''
  }
   @ViewChild(MatPaginator) paginator!:MatPaginator;
   @ViewChild(MatSort) sort!:MatSort;
  
  constructor(private service:CustomerService,private userService:UserService,private toastr:ToastrService,
  private router:Router){

  }
  
  ngOnInit(): void {
   
   this.loadCustomer();
   this.accessPermission();
   
  }
  accessPermission(){
    let role=localStorage.getItem('userrole') as string;
    this.userService.Getmenupermission(role,'customer').subscribe(item=>{
      this._permission=item;
    })
  }
  functionEdit(code:string){
    if(this._permission.haveedit)
    {
      this.router.navigateByUrl('/Customer/edit/'+code)
    }
    else{
           this.toastr.warning('User do not have edit permission','warning')
    }

  }
  functionDelete(code:string){
    if(this._permission.havedelete)
      {
        if(confirm('Are you sure ..')){
          this.service.DeleteCustomer(code).subscribe(item=>{
            this._response=item;
            if(this._response.result==='pass'){
              this.toastr.success('Delete successfully','delete');
              this.loadCustomer();
            }

          })
        }

      }
      else{
             this.toastr.warning('User do not have delete permission','warning')
      }

  }
  loadCustomer(){
    this.service.Getall().subscribe(item=>{
      this.customerlist=item;
      this.datasource=new MatTableDataSource<customer>(this.customerlist);
      this.datasource.paginator=this.paginator;
      this.datasource.sort=this.sort;
    })
  }

}
