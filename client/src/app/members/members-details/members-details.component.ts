import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-members-details',
  imports: [],
  templateUrl: './members-details.component.html',
  styleUrl: './members-details.component.css'
})
export class MembersDetailsComponent implements OnInit {

  ngOnInit(): void {
    this.loadMember()
  }

  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Member;

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => this.member = member
    })
  }

}
