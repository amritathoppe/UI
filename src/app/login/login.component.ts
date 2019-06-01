import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn = false;
  submitted = false;
  loginForm: FormGroup;
  serviceErrors:any = {};

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { }
  invalidUsername() {
    return (this.submitted && (this.serviceErrors.userName != null || this.loginForm.controls.username.errors != null));
  }

  invalidPassword() {
    return (this.submitted && (this.serviceErrors.password != null || this.loginForm.controls.password.errors != null));
  }
  toggleFunction(){
    let x= document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid == true){
      return;
    }
    else{
      let data: any = Object.assign({},this.loginForm.value);
      this.http.post("/api/user/login", data).subscribe((data:any) => {
        console.log("Login Data from API call!");
        console.log(data);
        this.router.navigate(["personalProfile"]);
      }, error => {
        console.log(error);
        this.serviceErrors.msg = error.error.error;
        //this.serviceErrors = error.error.error;

      });
      //console.log("loggedIn!");
      this.loggedIn = true;
    }
  }

}
