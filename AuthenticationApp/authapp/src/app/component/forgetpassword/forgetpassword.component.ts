import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule,RouterLink,FormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  username='';
  // regresponse!:registerconfirm;
  _response:any;

  constructor(private toastr :ToastrService,private route:Router,private service:UserService ){

  }
  ngOnInit(): void {
  
  }
  proceed(){
   
    this.service.Forgetpassword(this.username).subscribe(item=>{
      this._response=item;
      if(this._response.result='pass'){
        this.toastr.success('OTP sent to your registered email','Forget Password')
        this.service._username.set(this.username);
        this.route.navigateByUrl('/updatepassword');
        
      }else{
        this.toastr.error('Failed due to'+this._response.message,'Forget Password')

      }
    })

  }


}
