import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { FireSlackChannelRouterModule } from './channel-router.module';
import { ChannelsComponent } from './channels.component';
import { ConversationComponent } from './conversation/conversation.component';
import { NoConversationSelectedComponent } from './conversation/no-conversation-selected.component';
import { MessageComponent } from './conversation/message.component';
import { ChannelListItemComponent } from './list/channel-list-item.component';
import { CreateChannelOverlayComponent } from './overlays/create-channel.component';
import { UserScopeDirective } from './scopes/user-scope.component';

@NgModule({
  imports: [
    FireSlackChannelRouterModule,
    SharedModule
  ],
  declarations: [
    ChannelsComponent,
    ConversationComponent,
    MessageComponent,
    ChannelListItemComponent,
    CreateChannelOverlayComponent,
    NoConversationSelectedComponent,
    UserScopeDirective
  ],
  exports: [
    ChannelsComponent
  ]
})
export class FireSlackChannelsModule {}
export * from './channels.component';
