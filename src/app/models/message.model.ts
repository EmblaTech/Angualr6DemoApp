import { MessageType } from "../enums/message-type";

export class Message {
    type: MessageType;
    message: string;
    timeout:number;
    class:string;
  }