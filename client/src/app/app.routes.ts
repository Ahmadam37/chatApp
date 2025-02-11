import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MembersDetailsComponent } from './members/members-details/members-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'members', component: MembersListComponent},
    {path:'members/:id', component: MembersDetailsComponent},
    {path:'lists', component: ListsComponent},
    {path:'messages', component: MessagesComponent},
    {path:'**', component: HomeComponent, pathMatch:'full'},


];
