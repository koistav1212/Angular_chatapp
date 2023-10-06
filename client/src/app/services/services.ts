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
public currUser:any={};
public allusers:any={};
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

setCurrUser(currdata,allusers)
{
this.currUser=currdata;
this.allusers=allusers;
}
getstoreduser(){
  return this.currUser;
}
getallstoredUsers(){
return this.allusers;
}
getuserbyId(id:any)
{ return this.http.get(baseUrl+"getUserbyID/"+id)

}
addUser(data)
{
  return this.http.post(baseUrl+"addUsers",data)
}
updateUserconnections(data,id)
{
  return this.http.post(baseUrl+"updateUserconnections/"+id,data)

}
updateUser(data,id)
{
  return this.http.post(baseUrl+"updateUserbyID/"+id,data)

}
getallUsers(data:any)
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
  return this.http.post(`${baseUrl}group/getall`, { rooms: roomIds });
}

addMsgToGroup(groupId: string, msg: any): Observable<any> {
  return this.http.post(`${baseUrl}group/addgrpmsg`, { grpid: groupId, msg:msg });
}
addMemberToGroup(groupId: string, memberId: string): Observable<any> {
  return this.http.post(`${baseUrl}group/add`, { grpid: groupId, members: memberId });
}

removeMemberFromGroup(groupId: string, memberId: string): Observable<any> {
  return this.http.post(`${baseUrl}group/remove`, { grpid: groupId, memid: memberId });
}

getGroupMessages(groupId: string): Observable<any> {
  return this.http.post(`${baseUrl}group/getmsg`, { grpid: groupId });
}
}