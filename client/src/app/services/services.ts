import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { AngularFireAuth } from '@angular/fire/auth';
const baseUrl = 'http://localhost:5000/';
const socketUrl="http://localhost:5000/";
@Injectable({
  providedIn: 'root'
})
export class services {
public currUser:any={}
  constructor(private http: HttpClient,private afAuth:AngularFireAuth) { }

  getCurrUser()
  {
this.afAuth.authState.subscribe((afUser:any)=>{
  console.log(afUser)
this.http.get(baseUrl+"getUserbyID/"+afUser.uid).subscribe((user:any)=>{
  
this.currUser=user.user
})
})
  }
setCurrUser(data)
{
this.currUser=data
}
addUser(data)
{
  return this.http.post(baseUrl+"addUsers",data)
}
userUpdate(data,id)
{
  return this.http.put(baseUrl+"updateUserbyID/"+id,data)

}
getUsers()
{
return this.http.get(baseUrl+"geAlltUsers");
}
getSocket() {
  return io.connect(socketUrl);
} 
userLogin(userData:any)
{
  return this.http.post(baseUrl+"user-login",userData);
}
getAllConversation()
{
  return this.http.get(baseUrl+"conversation/get")
}
newConversation(data)
{
  return this.http.post(baseUrl+"conversation/add",data)
}
}