import { FC, useEffect, useRef, useContext } from "react";
import styles from "../Chat.module.scss";
import { Message } from "./Message";
import { IContactInfo, IMessage } from "../../../Types/TypeChatData";
import { sendRequestMethod } from "../../../API/sendRequestMethod";
import { ChatAppContext } from "../../../utils/context";

type TypeChatData = {
  userData: IContactInfo;
  messages: IMessage[];
};

type TypeChatArea = {
  messages: IMessage[] | undefined;
  setChatData: React.Dispatch<React.SetStateAction<TypeChatData | undefined>>;
};

interface INotificationRequest {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: unknown;
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      chatName: string;
      sender: string;
      senderName: string;
    };
    messageData: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
}

type TypeDeleteNotificationRequestBody = {
  receiptId: number;
};

export const ChatArea: FC<TypeChatArea> = ({ messages, setChatData }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { idInstance, apiTokenInstance, activeChatUser } =
    useContext(ChatAppContext);

  const handleScroll = () => {
    if (divRef && divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!activeChatUser) return;

    const notificationInterval = setInterval(() => {
      const checkNotification = async () => {
        const checkNotificationRequest: INotificationRequest | null =
          await sendRequestMethod(
            idInstance,
            apiTokenInstance,
            "receiveNotification",
            "GET"
          );

        if (checkNotificationRequest === null) return;

        const deleteNotificationRequestBody: TypeDeleteNotificationRequestBody =
          {
            receiptId: checkNotificationRequest.receiptId,
          };

        sendRequestMethod(
          idInstance,
          apiTokenInstance,
          "deleteNotification",
          "DELETE",
          deleteNotificationRequestBody
        );

        const body = checkNotificationRequest.body;

        if (
          body.typeWebhook === "incomingMessageReceived" &&
          body.senderData.chatId === activeChatUser.chatId &&
          (body.messageData.typeMessage === "textMessage" ||
            body.messageData.typeMessage === "extendedTextMessage")
        ) {
          const message: IMessage = {
            type: "incoming",
            idMessage: body.idMessage,
            timestamp: body.timestamp,
            typeMessage: body.messageData.typeMessage,
            chatId: body.senderData.chatName,
            textMessage: body.messageData.textMessageData.textMessage,
            senderId: body.senderData.sender,
            senderName: body.senderData.chatName,
          };

          setChatData((prev) => {
            if (!prev) {
              return prev;
            }
            if (prev.messages.at(-1)?.idMessage === body.idMessage) {
              return prev;
            }
            return {
              ...prev,
              messages: [...prev.messages, message],
            };
          });
        }
      };

      checkNotification();
    }, 2000);

    return () => clearInterval(notificationInterval);
  });

  useEffect(() => {
    handleScroll();
  }, [messages]);

  return (
    <div className={styles.chat__inner} ref={divRef}>
      {messages?.map((message) => (
        <Message
          type={message.type}
          textMessage={message.textMessage}
          key={String(message.timestamp) + message.senderId}
        />
      ))}
    </div>
  );
};
