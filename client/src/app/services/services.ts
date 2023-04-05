import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
const baseUrl = 'http://localhost:5000/';
const socketUrl="http://localhost:5000/";
@Injectable({
  providedIn: 'root'
})
export class services {
public currUser:any={}
tmpUID:any
  constructor(private http: HttpClient,private afAuth:AngularFireAuth) { 
     

  }
  async getUID():Promise<Observable<any>>
  {
    return this.afAuth.authState.pipe(
      switchMap((afUser) => {
        // Inner observable
        return  this.http.get(baseUrl+"getUserbyID/"+afUser.uid);
      })
    
    );
  }
  async getCurrUser()
  {
   return await this.afAuth.authState.subscribe((afUser:any)=>{
        this.http.get(baseUrl+"getUserbyID/"+afUser.uid)
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