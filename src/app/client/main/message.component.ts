import { Component, Input, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'fire-slack/app/interfaces';
import { UserService, MessageService } from 'fire-slack/app/services';


@Component({
  selector: 'message',
  styles: [`
    :host, .message {
      position: relative;
    }

    .message * {
      transition: width 2s;
    }

    .message .show-on-hover {
      transform: translateX(-100%);
      transition: all 0.3s;
      max-width: 0;
      overflow: hidden;
      opacity: 0;
    }
    .message__content {
      font-weight: 300;
      font-size: 0.9rem;
    }
    .message:hover .show-on-hover {
      max-width: none;
      transform: translateX(0%);
      opacity: 1;

    }
  `],
  // <user-scope [uid]="message.author" #author>
  template: `
    <div
      [userScope]="message.author"
      #user="userScope"
      class="media mb-4 px-4 message">
        <ng-template [ngIf]="sentByCurrentUser$ | async | not">
          <img
            class="mr-3 square-48 rounded-circle"
            src="{{(user?.userInfo$ | async)?.photoURL || '/assets/unknown-user.jpg'}}">

          <div class="media-body">
            <p class="my-0 message__content">{{message?.content}}</p>
            <p class="my-0"><small class="text-muted"><em>Said by {{(user?.userInfo$ | async)?.displayName}} {{message?.timestamp | fromNow}}</em></small></p>
          </div>
        </ng-template>

        <ng-template [ngIf]="sentByCurrentUser$ | async">
          <div class="media-body text-right">
            <p class="my-0 message__content">{{message?.content}}</p>
            <p class="my-0"><small class="text-muted"><em>You said this {{message?.timestamp | fromNow}}</em></small></p>
          </div>

          <img
            class="d-flex ml-3 square-48 rounded-circle"
            src="{{(user?.userInfo$ | async)?.photoURL || '/assets/unknown-user.jpg'}}">
          <button class="d-flex align-self-center mx-0 px-2 show-on-hover btn btn-danger" type="button" (click)="removeHandler(message)">
            Delete
          </button>
        </ng-template>
    </div>
  `
  // </user-scope>
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Input() removeHandler: (msg: Message) => void;
  private sentByCurrentUser$: Observable<boolean>;

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(MessageService) private messageService: MessageService
  ) {}

  ngOnInit() {
    this.sentByCurrentUser$ = this.userService.currentUid$.map(uid => uid === this.message.author);
  }

  // deleteMessage(cid: string, mid: string) {
  //   this.messageService.deleteMessage(
  //   console.log(`deleting message with id: ${mid}`);
  // }


}