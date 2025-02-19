import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient)
  baseURL = environment.apiUrl
  currentUser = signal<User | null>(null)

  login(model : any){ //This is how to do signals
    return this.http.post<User>(this.baseURL+"account/login", model).pipe(
      map(user => {
        if(user){
          this.setCurrentUser(user);

        }
      })
    )
  }

  register(model : any){ //This is how to do signals
    return this.http.post<User>(this.baseURL+"account/register ", model).pipe(
      map(user => {
        if(user){
          this.setCurrentUser(user);
        }
      return user;
      })
    )
  }

  setCurrentUser(user: User){
    localStorage.setItem('user' , JSON.stringify(user));
    this.currentUser.set(user)
  }


  logout(): void{
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
