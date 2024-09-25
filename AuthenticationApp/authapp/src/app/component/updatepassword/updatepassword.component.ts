import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { updatepassword } from '../../_model/user.model';

@Component({
  selector: 'app-updatepassword',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule,RouterLink],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent {
  currentuserName='';
  _resetform:any;
  _response:any;
  

  constructor(private builder: FormBuilder,private service:UserService,private toastr:ToastrService,private router:Router) {
    this._resetform = this.builder.group({
     
      password: this.builder.control('', Validators.required),
      otptext: this.builder.control('', Validators.required)
     
    })
  }
  ngOnInit(): void {
    this.currentuserName=this.service._username();
  }
  proceedchange()
  {
    debugger;
    if(this._resetform.valid)
    {
      let _obj:updatepassword={
        username: this.currentuserName as string,
        password: this._resetform.value.password as string,
        otptext: this._resetform.value.otptext as string
      }
      this.service.Updatepassword(_obj).subscribe(item=>{
        this._response=item;
        
     
        if(this._response.result='pass'){

        
          this.toastr.success('Password changed successfully','Password changed')
          this.router.navigateByUrl('/login')
        }else{
          this.toastr.error('Failed due to'+this._response.message,'Password changed')

        }

      })
    }
    
  }
}
