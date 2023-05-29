import { createContext } from "react";
import { IContactInfo } from "../Types/TypeChatData";

type TypeChatAppContext = {
  idInstance: string;
  apiTokenInstance: string;
  activeChatUser: IContactInfo | undefined;
};

export const ChatAppContext = createContext<TypeChatAppContext>({
  idInstance: "",
  apiTokenInstance: "",
  activeChatUser: undefined,
});
