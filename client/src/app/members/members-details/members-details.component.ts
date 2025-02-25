import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { CommonModule, DatePipe } from '@angular/common';
import { AccountService } from '../../_services/account.service';
import { PresenceService } from '../../_services/presence.service';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';






@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './members-details.component.html',
  styleUrl: './members-details.component.css',
  imports: [CommonModule, TabsModule, GalleryModule, TimeagoModule]
})
export class MembersDetailsComponent implements OnInit, OnDestroy {
  private accountService = inject(AccountService);
  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  member: Member = {} as Member;
  images: GalleryItem[] = [];
  activeTab?: TabDirective;
  messages: Message[] = [];
  user = this.accountService.currentUser();

  constructor(public presenceService: PresenceService, private route: ActivatedRoute,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })

    this.getImages()
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  loadMessages() {
    if (this.member)
      this.messageService.getMessageThread(this.member.username).subscribe({
        next: messages => this.messages = messages
      })
  }

  selectTab(heading: string) {
    if (this.memberTabs) {
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.user) {
      this.messageService.createHubConnection(this.user, this.member.username);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member?.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
  }

}