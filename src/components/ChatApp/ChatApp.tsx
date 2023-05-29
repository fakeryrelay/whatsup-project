import { FC, useState, useMemo } from "react";
import { Chat } from "./Chat/Chat";
import styles from "./Chat.module.scss";
import { Contacts } from "./Contacts/Contacts";
import { TypeChatApp } from "../../Types/TypeChatApp";
import { IContactInfo } from "../../Types/TypeChatData";
import { ChatAppContext } from "../../utils/context";

export const ChatApp: FC<Omit<TypeChatApp, "activeChatUser">> = ({
  idInstance,
  apiTokenInstance,
}) => {
  const [activeChatUser, setActiveChatUser] = useState<IContactInfo>();

  const contextValue = useMemo(
    () => ({
      idInstance: idInstance,
      apiTokenInstance: apiTokenInstance,
      activeChatUser: activeChatUser,
    }),
    [activeChatUser, idInstance, apiTokenInstance]
  );

  return (
    <div className={styles.wrapper}>
      <ChatAppContext.Provider value={contextValue}>
        <Contacts setActiveChatUser={setActiveChatUser} />

        <Chat />
      </ChatAppContext.Provider>
    </div>
  );
};
