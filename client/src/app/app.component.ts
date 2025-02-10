import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgFor, NavComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  private accountServices = inject(AccountService)
  title = 'client';
  users: any;

  ngOnInit(): void {
  this.getUsers();
  this.setCurrentUser()
  }


  setCurrentUser(){
    const userString = localStorage.getItem("user");
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountServices.currentUser.set(user);
  }


  getUsers(){
    this.http.get('https://localhost:8932/api/user').subscribe({
      next: response =>  this.users = response,
      error: error => console.error(error),
      complete: () => console.log("Request has completed")
    })
  }
}
