import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { registerconfirm, userregister,usercred,loginresp,menu,resetpassword, updatepassword, menupermission, updateuser, roles, users, menus } from '../_model/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  baseiurl=environment.apiUrl;
  _registerresp=signal<registerconfirm>({
    userid:0,
    username:'',
    otptext:''
  })
  _manulist=signal<menu[]>([]);
  _username=signal('');
  Userregistration(_data:userregister) {
     return this.http.post(this.baseiurl+'User/userregisteration',_data)
  }

  confirmregistration(_data:registerconfirm) {
    return this.http.post(this.baseiurl+'User/confirmregisteration',_data)
 }

 userLogin(_data:usercred) {
  return this.http.post<loginresp>(this.baseiurl+'Authorize/GenerateToken',_data)
}

Loadmenubyrole(role: string) {
  return this.http.get<menu[]>(this.baseiurl + 'UserRole/GetAllMenusbyrole?userrole=' + role);
}

Resetpassword(_data:resetpassword) {
  return this.http.post(this.baseiurl+'User/resetpassword',_data)
}

Forgetpassword(username:string) {
  return this.http.get(this.baseiurl+'User/forgetpassword?username='+username)
}

Updatepassword(_data:updatepassword) {
  return this.http.post(this.baseiurl+'User/updatepassword',_data)
}

Getmenupermission(role:string,menuname:string) {
  return this.http.get<menupermission>(this.baseiurl+'UserRole/GetMenupermissionbyrole?userrole='+role+'&menucode='+menuname)
}

GetUser() {
  return this.http.get<users[]>(this.baseiurl+'User/GetAll')
}
GetUserbycode(code:string) {
  return this.http.get<users>(this.baseiurl + 'User/GetBycode?code='+code);
}

Getallroles() {
  return this.http.get<roles[]>(this.baseiurl + 'UserRole/GetAllRoles');
}
Updaterole(_data: updateuser) {
  return this.http.post(this.baseiurl + 'User/updaterole', _data);
}
Updatestatus(_data: updateuser) {
  return this.http.post(this.baseiurl + 'User/updatestatus', _data);
}
Getallmenus() {
  return this.http.get<menus[]>(this.baseiurl + 'UserRole/GetAllMenus');
}

Assignrolepermission(_data:menupermission[]){
  return this.http.post(this.baseiurl + 'UserRole/assignrolepermission', _data);
}
}
