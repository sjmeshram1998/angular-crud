import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postUser(data:any){
    return this.http.post<any>("http://54.242.119.162:8000/api/temp-users/",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getUser(){
    return this.http.get<any>("http://54.242.119.162:8000/api/temp-users/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  putUser(data:any, u_id:number){
    return this.http.put<any>("http://54.242.119.162:8000/api/temp-users/"+u_id + '/update/',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteUser(u_id:number){
    return this.http.delete<any>("http://54.242.119.162:8000/api/temp-users/"+u_id+'/delete/')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
