import { IContactInfo } from "./TypeChatData";

export type TypeChatApp = {
  idInstance: string;
  apiTokenInstance: string;
  activeChatUser: IContactInfo | undefined;
};