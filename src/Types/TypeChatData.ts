export interface IContactInfo {
  avatar: string;
  name: string;
  email: string;
  category: string;
  description: string;
  products: unknown[];
  chatId: string;
  lastSeen: unknown;
  isArchive: boolean;
  isDisappearing: boolean;
  isMute: boolean;
  muteExpiration: unknown;
}

export interface IMessage {
  type: "incoming" | "outgoing";
  idMessage: string;
  timestamp: number;
  typeMessage: string;
  chatId: string;
  textMessage: string;
  senderId: string;
  senderName: string;
}

export type TypeChatData = {
  userData: IContactInfo;
  messages: IMessage[];
};