import {Component, HostListener, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.css']
})
export class PersonalProfileComponent implements OnInit {
  updated = false;
  submitted = false;
  personalProfileForm: FormGroup;
  serviceErrors:any = {};
  @HostListener('window:click',['$event']) onClick(event){console.log("User clicked!!");}
  constructor(private formBuilder: FormBuilder,
              private http:HttpClient,
              private router:Router) {
    console.log("Constructing Profile Component!");
  }

  invalidFirstName() {
    return (this.submitted && (this.serviceErrors.firstName != null || this.personalProfileForm.controls.firstName.errors != null));
  }
  invalidLastName() {
    return (this.submitted && (this.serviceErrors.lastName != null || this.personalProfileForm.controls.lastName.errors != null));
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
    this.personalProfileForm = this.formBuilder.group({
      firstName :['',Validators.required],
      lastName:['',Validators.required],
      interest :[ ],
      state :[],
      ImageUpload:[],
      profileImageUpload:[],
    });

  }

  onSubmit(){
    this.submitted = true;
    if(this.personalProfileForm.invalid == true){
      return;
    }
    else{
      let data: any = Object.assign({},this.personalProfileForm.value);
      console.log("updated!");
      //this.router.navigate(["login"]);
      this.updated = true;
    }
  }

}
