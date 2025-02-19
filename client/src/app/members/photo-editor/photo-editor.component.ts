import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member } from '../../_models/member';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import {FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../_services/account.service';
import { environment } from '../../../environments/environment';
import { MembersService } from '../../_services/members.service';
import { Photo } from '../../_models/photo';




@Component({
  selector: 'app-photo-editor',
  imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe ],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {

  private accountService = inject(AccountService)
  member = input.required<Member>();
  uploader?: FileUploader;
  private memberService = inject(MembersService)
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  memberChange = output<Member>();

  ngOnInit(){
    this.initializeUploader();
  }

  fileOverBase(s: any){

    this.hasBaseDropZoneOver = s;
  }

  setMainPhoto(photo:Photo){
    this.memberService.setMainPhoto(photo).subscribe({
      next: _ => {
        const user = this.accountService.currentUser();
        if(user){
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user);
        }
        const updateMember = {...this.member()}
        updateMember.photoUrl = photo.url;
        updateMember.photos.forEach(p => {
          if(p.isMain) p.isMain = false;
          if(p.id === photo.id) p.isMain =true;
        });
        this.memberChange.emit(updateMember);
      }
    })
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'user/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize:10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item , response , status , header) => {
      const photo = JSON.parse(response);
      const updatedMember = {...this.member()}
      updatedMember.photos.push(photo);
      this.memberChange.emit(updatedMember);
      
    }
  }


}
