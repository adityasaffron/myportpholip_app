import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log('came');
    
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    this.http.post("http://localhost:3000/auth/login", { email: username, password: password })
    .subscribe(
      (data: any) => {
        
        localStorage.setItem('token', data.token);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error(error);
       
      }
    );


  }

}
