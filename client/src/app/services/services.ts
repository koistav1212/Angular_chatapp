import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  async getCurrUser():Promise<Observable<any>>
  {
    return this.afAuth.authState.pipe(
      switchMap((afUser) => {
        // Inner observable
        return  this.http.get(baseUrl+"getUserbyID/"+afUser.uid);
      })
    
    );
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
getUsers(data:any)
{
  console.log("service",data)
return this.http.post(baseUrl+"geAlltUsers",{id:data._id});
}
userLogin(userData:any)
{
  return this.http.post(baseUrl+"user-login",userData);
}
getAllConversation(data)
{
  return this.http.post(baseUrl+"conversation/get",data)
}
newConversation(data)
{
  return this.http.post(baseUrl+"conversation/add",data)
}
addMessage(data)
{
  return this.http.post(baseUrl+"message/add",data);
}
getMessages(id)
{
  return this.http.get(baseUrl+"message/get/"+id)
}


createGroup(groupData: any): Observable<any> {
  return this.http.post(baseUrl+"group/create", groupData);
}

getGroups(roomIds: string[]): Observable<any> {
  return this.http.post(`${baseUrl}/group/getall`, { rooms: roomIds });
}

addMemberToGroup(groupId: string, memberId: string): Observable<any> {
  return this.http.post(`${baseUrl}/group/add`, { grpid: groupId, members: memberId });
}

removeMemberFromGroup(groupId: string, memberId: string): Observable<any> {
  return this.http.post(`${baseUrl}/group/remove`, { grpid: groupId, memid: memberId });
}

getGroupMessages(groupId: string): Observable<any> {
  return this.http.post(`${baseUrl}/group/getmsg`, { grpid: groupId });
}
}