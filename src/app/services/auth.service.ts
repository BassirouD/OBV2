import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    api = environment.apii;
  constructor(private http: HttpClient) { }

    login(data):Observable<any>{
        const headers= new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
        return this.http.post(this.api+'GetNewOrbusBankToken',data,{ 'headers': headers });
    }

    getUserbyLogin(login):Observable<any>{
        var token=localStorage.getItem('token');
        //console.log('token '+token);
        var headers= new HttpHeaders({'Content-Type':'application/json','withCredentials': 'true',"Authorization":"Bearer "+token})
        //headers.append("Authorization", "Bearer " + token)
        //console.log(headers);
        return this.http.get(this.api+'GetUserByLogin/'+login,{headers:headers});
    }

    changePwd(data):Observable<any>{
        var token=localStorage.getItem('token');
        //console.log('token '+token);
        var headers= new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded','withCredentials': 'true',"Authorization":"Bearer "+token})
        //headers.append("Authorization", "Bearer " + token)
        //console.log(headers);
        return this.http.post(this.api+'ChangeUserPwdByLogin',data,{headers:headers});
    }

    updateUser(data){
        var token=localStorage.getItem('token');
        var headers= new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded','withCredentials': 'true',"Authorization":"Bearer "+token})
        return this.http.post(this.api+'UpdateUser',data,{'headers':headers})
    }

    initialiser(id):Observable<any>{
        var token=localStorage.getItem('token');
        var headers= new HttpHeaders({'Content-Type':'application/json','withCredentials': 'true',"Authorization":"Bearer "+token})
        //headers.append("Authorization", "Bearer " + token)
        //console.log(headers);
        return this.http.get(this.api+'InitialiseUserPwdById/'+id,{headers:headers});
    }

}
