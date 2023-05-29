import { FC } from "react";
import { IContactInfo } from "../../../Types/TypeChatData";
import styles from "../Chat.module.scss";

type TypeChatHeader = {
  userData: IContactInfo | undefined;
};

export const ChatHeader: FC<TypeChatHeader> = ({ userData }) => {
  return (
    <>
      {userData ? (
        <div className={styles.chat__header}>
          {userData.avatar ? (
            <img src={userData.avatar} alt={userData.name} />
          ) : (
            <img
              src={`https://placehold.co/200x200/green/white?text=${userData.name[0]}`}
              alt={userData.name + " image"}
            />
          )}
          <h3>{userData.name}</h3>
        </div>
      ) : (
        <div className={styles.chat__header}>
          <h3>Выберите активный чат</h3>
        </div>
      )}
    </>
  );
};
