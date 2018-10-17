import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/index.services';
import { Message } from 'src/app/models/message.model';
import { MessageType } from 'src/app/enums/message-type';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  count = 0;
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessage().subscribe((msg: Message) => {
      if (!msg) {
          this.messages = [];
          return;
      }

      if(msg)
        this.count+=1;

        let cssClass='';
        if(msg.type == MessageType.Success)
          cssClass = 'success animated slideInUp';
        if(msg.type ==  MessageType.Error)
          cssClass = 'error animated slideInUp';
        if(msg.type == MessageType.Info)
          cssClass = 'info animated slideInUp';
        if(msg.type == MessageType.Warning)
          cssClass = 'warning animated slideInUp';


        let out = this.count * 500;
        let timerId = setTimeout(() => {
          console.log(this.count);
          msg.class = cssClass;
          this.messages.push(msg);
          clearTimeout(timerId);
        },out);

        let deltimerId = setTimeout(() => {
          console.log(this.count);
          this.removeMessage(msg);
          clearTimeout(deltimerId);
        },out+5000);
  });
  }

  removeMessage(message: Message) {
    message.class = message.class.replace('slideInUp','slideOutRight');
    let remove = setTimeout(() => {
      console.log(this.count);
      this.messages = this.messages.filter(x => x !== message);
      clearTimeout(remove);
    },1000);
    this.count-=1;
  }

}



