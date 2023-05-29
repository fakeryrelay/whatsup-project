import { FC, useEffect, useState, useContext } from "react";
import styles from "../Chat.module.scss";
import { ChatArea } from "./ChatArea";
import { IMessage, TypeChatData } from "../../../Types/TypeChatData";
import { TypeChatApp } from "../../../Types/TypeChatApp";
import { sendRequestMethod } from "../../../API/sendRequestMethod";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatAppContext } from "../../../utils/context";

export type TypeChat = TypeChatApp;

type TypeSendMessageRequest = {
  chatId: string;
  message: string;
  quotedMessageId?: string;
  archiveChat?: boolean;
  linkPreview?: boolean;
};

type TypeSendMessageResolve = {
  idMessage: string;
};

type TypeGetChatHistoryRequestBody = {
  chatId: string;
};

type TypeGetChatHistoryResolve = IMessage[];

export const Chat: FC = () => {
  const [chatData, setChatData] = useState<TypeChatData>();
  const { idInstance, apiTokenInstance, activeChatUser } =
    useContext(ChatAppContext);

  useEffect(() => {
    if (!activeChatUser) return;

    const getTextChatHistory = async () => {
      const getChatHistoryRequestBody: TypeGetChatHistoryRequestBody = {
        chatId: activeChatUser.chatId,
      };

      const getChatHistoryRequest: TypeGetChatHistoryResolve =
        await sendRequestMethod(
          idInstance,
          apiTokenInstance,
          "getChatHistory",
          "POST",
          getChatHistoryRequestBody
        );

      const filteredRes = getChatHistoryRequest
        .filter(
          (message) =>
            message.typeMessage === "textMessage" ||
            message.typeMessage === "extendedTextMessage"
        )
        .reverse();

      setChatData({
        userData: activeChatUser,
        messages: filteredRes,
      });
    };

    getTextChatHistory();
  }, [activeChatUser, idInstance, apiTokenInstance]);

  const sendMessage = async (inputValue: string) => {
    if (!activeChatUser) {
      return;
    }
    if (!chatData) {
      return;
    }

    const requestBody: TypeSendMessageRequest = {
      chatId: activeChatUser.chatId,
      message: inputValue,
    };

    const sendMessageRequest: TypeSendMessageResolve = sendRequestMethod(
      idInstance,
      apiTokenInstance,
      "sendMessage",
      "POST",
      requestBody
    );

    const message: IMessage = {
      type: "outgoing",
      idMessage: sendMessageRequest.idMessage,
      timestamp: +new Date(),
      typeMessage: "extendedTextMessage",
      chatId: chatData.userData.chatId,
      textMessage: inputValue,
      senderId: chatData.userData.chatId,
      senderName: chatData.userData.name,
    };

    setChatData((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        messages: [...prev.messages, message],
      };
    });
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chat__background}></div>

      <ChatHeader userData={chatData?.userData} />

      <ChatArea messages={chatData?.messages} setChatData={setChatData} />

      <ChatInput sendMessage={sendMessage} isActive={!!activeChatUser}/>
    </div>
  );
};
