import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators}  from '@angular/forms'
import { EmployeeModel } from './employee-model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
loginForm !: FormGroup;
employeeModelObj : EmployeeModel = new EmployeeModel(); 
allEmployeeData : any;
showAdd !: boolean;
showUpdate !:  boolean;
constructor(private fb: FormBuilder, private api: ApiService){

}
ngOnInit(): void {
  this.loginForm = this.fb.group({
    user_name:[''],
    password: [''],
    e_mail: ['', Validators.required],
    role: ['',Validators.required],
    status_toggle:['']
  })
  this.getUserDetails();
}
clickAddEmployee(){
  this.loginForm.reset();
  this.showAdd=true;
  this.showUpdate=false;
}
postEmployeeDetails(){
  this.employeeModelObj.user_name = this.loginForm.value.user_name;
  this.employeeModelObj.password = this.loginForm.value.password;
  this.employeeModelObj.e_mail = this.loginForm.value.e_mail;
  this.employeeModelObj.role= this.loginForm.value.role;
  this.employeeModelObj.status_toggle = this.loginForm.value.status_toggle;
  
  this.api.postUser(this.employeeModelObj).subscribe(res=>{
    console.log(res);
    alert("User added successfully");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.loginForm.reset();
    this.getUserDetails();

  },err=>{
    console.log(err)
    alert("Something went wrong")
  })

}
getUserDetails(){
  this.api.getUser().subscribe(res=>{
    this.allEmployeeData = res;
  })
}
deleteUserDetails(row : any){
  this.api.deleteUser(row.u_id).subscribe(res=>{
    alert("User deleted");
    this.getUserDetails();

  })
}
Onedit(row:any){
  this.showAdd=false;
  this.showUpdate=true;
  this.employeeModelObj.u_id= row.u_id
  this.loginForm.controls['user_name'].setValue(row.user_name);
  this.loginForm.controls['password'].setValue(row.password);
  this.loginForm.controls['e_mail'].setValue(row.e_mail);
  this.loginForm.controls['role'].setValue(row.role);
  this.loginForm.controls['status_toggle'].setValue(row.status_toggle);

}
updateEmployeeDetails(){
  this.employeeModelObj.user_name = this.loginForm.value.user_name;
  this.employeeModelObj.password = this.loginForm.value.password;
  this.employeeModelObj.e_mail = this.loginForm.value.e_mail;
  this.employeeModelObj.role= this.loginForm.value.role;
  this.employeeModelObj.status_toggle = this.loginForm.value.status_toggle;

  this.api.putUser(this.employeeModelObj,this.employeeModelObj.u_id)
   .subscribe(res=>{
    alert("updated successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.loginForm.reset();
    this.getUserDetails();

  })
}
}
