import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: 'search-profile',
  //selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.css']
})
export class SearchProfileComponent implements OnInit {
  searched = false;
  submitted = false;
  searchForm: FormGroup;
  serviceErrors:any = {};
  constructor(private formBuilder: FormBuilder,
              private http:HttpClient,
              private router:Router) {
    console.log("Constructing Search Component!");
  }
  toggleFunction(){
    let x= document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }
  invalidSearch() {
    return (this.submitted && (this.serviceErrors.searchTerm != null || this.searchForm.controls.searchTerm.errors != null));
  }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchBy :[''],
      searchTerm:['',Validators.required]
    });
  }
  ajaxSearchProfileForm()
  {
    this.submitted = true;
    if(this.searchForm.invalid == true){
      return;
    }
    else{
      console.log("searched!");
      this.searched = true;
    }
  }
  /*onSubmit(){
    this.submitted = true;
    if(this.searchForm.invalid == true){
      return;
    }
    else{
      console.log("searched!");
      this.searched = true;
    }
  }*/

}
