import { Component, DoCheck, effect, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../_service/user.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { menu } from '../../_model/user.model';

@Component({
  selector: 'app-appmenu',
  standalone: true,
  imports: [MaterialModule,RouterOutlet,RouterLink],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css'
})
export class AppmenuComponent implements OnInit,DoCheck {

  menulist!:menu[];
  loginUser='';
  showmenu=false;
constructor(private service:UserService,private router:Router)
{
  effect(()=>{
    this.menulist=this.service._manulist();
  })

}
  ngDoCheck(): void {
    this.loginUser=localStorage.getItem('username') as string;
    this.setAccess();
  }

  setAccess(){
    let loginUser=localStorage.getItem('userrole') 
    let currentUrl=this.router.url;
    if(currentUrl=='/register' || currentUrl=='/login' || currentUrl=='/resetpassword' || currentUrl=='/forgetpassword' )
    {
      this.showmenu=false;
    }
    else{
      this.showmenu=true;
    }

  }
  ngOnInit(): void {
    
    let userrole = localStorage.getItem('userrole') as string;
    this.service.Loadmenubyrole(userrole).subscribe(item => {
      this.menulist = item;
    })

  }
}
