import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'register',
  //selector: 'app-register',
  templateUrl: './register.component.html',
  //styleUrls: ['./app.component.css']
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registered = false;
  submitted = false;
  registerForm: FormGroup;
  serviceErrors:any = {};

  constructor(private formBuilder: FormBuilder,
              private http:HttpClient,
              private router:Router) {
    console.log("Constructing Register Component!");
  }

  invalidUsername() {
    return (this.submitted && (this.serviceErrors.username != null || this.registerForm.controls.username.errors != null));
  }

  invalidPassword() {
    return (this.submitted && (this.serviceErrors.password != null || this.registerForm.controls.password.errors != null));
  }
  handleClick(event: Event) {
    console.log("Click!", event);
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
    this.registerForm = this.formBuilder.group({
      username :['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
  }
  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid == true){
      return;
    }
    else{
      let data: any = Object.assign({},this.registerForm.value);
      this.http.post("/api/user/save/registration", data).subscribe((data:any) => {
        console.log("Register API return data!");
        console.log(data);
        this.router.navigate(["login"]);
      }, error => {
        this.serviceErrors.msg = error.error.error;
        console.log(error);
      });

      //this.router.navigate(["login"]);

      this.registered = true;
    }
  }

}
