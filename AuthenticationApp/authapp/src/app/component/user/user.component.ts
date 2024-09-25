import { Component, ViewChild } from '@angular/core';
import { users } from '../../_model/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { UserupdateComponent } from '../userupdate/userupdate.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userlist!: users[];
  displayedColumn: string[] = ["username", "name", "email", "phone", "status", "role", "action"];
  datasource:any;
  _response:any;
  
   @ViewChild(MatPaginator) paginator!:MatPaginator;
   @ViewChild(MatSort) sort!:MatSort;
  
  constructor(private service:UserService,private toastr:ToastrService,
  private router:Router,private dialog:MatDialog){

  }
  
  ngOnInit(): void {
   
   this.loadUser();
   
   
  }

  loadUser(){
    this.service.GetUser().subscribe(item=>{
      this.userlist=item;
      this.datasource=new MatTableDataSource<users>(this.userlist);
      this.datasource.paginator=this.paginator;
      this.datasource.sort=this.sort;
    })
  }

  updaterole(username:string){
    this.openpopup(username,'role')

  }
  updatestatus(username:string){
    this.openpopup(username,'status')
  }
openpopup(username:string,type:string){
  this.dialog.open(UserupdateComponent,{
    width:'30%',
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'1000ms',
    data:{
      username:username,
      type:type
    }
  }).afterClosed().subscribe(item=>{
    this.loadUser();
  })
}  

}
