import { Component, Inject, inject, INJECTOR, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { updateuser } from '../../_model/user.model';

@Component({
  selector: 'app-userupdate',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './userupdate.component.html',
  styleUrl: './userupdate.component.css'
})
export class UserupdateComponent implements OnInit {
  userForm:any;
  dialogData:any;
  userdata:any;
  rolelist:any;
  type = '';
  _response:any;
  constructor(private builder:FormBuilder,private toastr:ToastrService,private service:UserService,
               @Inject(MAT_DIALOG_DATA) public data:any,private ref: MatDialogRef<UserupdateComponent>){
                this.userForm=this.builder.group({
                  username:this.builder.control({value:'',disabled:true}),
                  role:this.builder.control('',Validators.required),
                  status:this.builder.control(true)
                })


  }

  ngOnInit(): void {
    this.loadroles();
    this.dialogData = this.data;
    this.type = this.dialogData.type;
    console.log(this.dialogData);
    if (this.dialogData.username !== '') {
      this.service.GetUserbycode(this.dialogData.username).subscribe(item => {
        this.userdata = item;

        this.userForm.setValue({ username: this.userdata.username, role: this.userdata.role, status: this.userdata.isactive })
      })
    }

  }
  loadroles() {
    this.service.Getallroles().subscribe(item => {
      this.rolelist = item;
    })
  }
  proceedchange() {
    if (this.userForm.valid) {
      let _obj: updateuser = {
        username: this.dialogData.username,
        role: this.userForm.value.role as string,
        status:this.userForm.value.status as boolean
      }
      if (this.type === 'role') {
        this.service.Updaterole(_obj).subscribe(item => {
          this._response=item;
          if (this._response.result == 'pass') {
            this.toastr.success('Updated successfully', 'Role Update');
            this.closepopup();
          } else {
            this.toastr.error('Failed due to : ' + this._response.message, 'Role Update')
          }
        })
      }else{
        this.service.Updatestatus(_obj).subscribe(item => {
          this._response=item;
          if (this._response.result == 'pass') {
            this.toastr.success('Updated successfully', 'Status Update');
            this.closepopup();
          } else {
            this.toastr.error('Failed due to : ' + this._response.message, 'Status Update')
          }
        })
      }
    }
  }

  closepopup(){
    this.ref.close();
  }

}
