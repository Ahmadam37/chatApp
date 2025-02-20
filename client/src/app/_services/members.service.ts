import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';
import { of, tap } from 'rxjs';
import { Photo } from '../_models/photo';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient);
  accountService = inject(AccountService)
  baseUrl = environment.apiUrl
  members = signal<Member[]>([])


  

  getMembers(){
   return this.http.get<Member[]>(this.baseUrl+'user').subscribe({
    next: members => this.members.set(members)
   })
  }


  getMember(username: string){
    const member = this.members().find(x => x.username === username);
    if(member !== undefined) return of(member);

    return  this.http.get<Member>(this.baseUrl+'user/'+username);
  }

updateMember(member: Member){
  return this.http.put(this.baseUrl+'user', member).pipe(
    tap(() => {
      this.members.update(members => members.map(m => m.username === member.username ? member : m));
    })
  )
}

setMainPhoto(photo: Photo) {
  return this.http.put(this.baseUrl + 'user/set-main-photo/' + photo.id, {}).pipe(
    tap(() => {
      this.members.update(members => 
        members.map(m => {
          if (m.photos.some(p => p.id === photo.id)) {  // Ensure correct matching
            return { ...m, photoUrl: photo.url };  // Return a new object with updated photoUrl
          }
          return m;  // Return unchanged member
        })
      );
    })
  );
}

deletePhoto(photo: Photo){
  return this.http.delete(this.baseUrl + 'user/delete-photo/' + photo.id).pipe(
    tap(() => {
      this.members.update(members => 
        members.map(m => {
          if (m.photos.includes(photo)) {  // Ensure correct matching
            m.photos = m.photos.filter(x => x.id !== photo.id) // Return a new object with updated photoUrl
          }
          return m;  // Return unchanged member
        })
      );
    })
  );
}

}
