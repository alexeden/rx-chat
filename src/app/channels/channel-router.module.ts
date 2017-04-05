import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireSlackServicesModule } from 'fire-slack/app/services';
import { AuthGuard } from 'fire-slack/app/router/auth-guard.service';

import { ChannelsComponent } from './channels.component';
import { ConversationComponent } from './conversation/conversation.component';
import { NoConversationSelectedComponent } from './conversation/no-conversation-selected.component';
// import { ChannelListComponent } from './list/channel-list.component';
import { CreateChannelOverlayComponent } from './overlays/create-channel.component';

const routes: Routes = [
  {
    path: 'channels',
    component: ChannelsComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'create',
        outlet: 'overlay',
        component: CreateChannelOverlayComponent
      },
      {
        path: '',
        children: [
          {
            path: ':cid',
            outlet: 'primary',
            component: ConversationComponent
          },
          {
            path: '',
            outlet: 'primary',
            component: NoConversationSelectedComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FireSlackServicesModule
  ],
  exports: [
    RouterModule
  ]
})
export class FireSlackChannelRouterModule {}
