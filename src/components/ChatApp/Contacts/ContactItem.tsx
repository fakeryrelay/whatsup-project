import { FC } from "react";
import styles from "../Chat.module.scss";
import cn from "clsx";
import { IContactInfo } from "../../../Types/TypeChatData";

type ContactItem = {
  contact: IContactInfo;
  activeChatUser: IContactInfo | undefined;
  setActiveChatUser: React.Dispatch<
    React.SetStateAction<IContactInfo | undefined>
  >;
  contacts: IContactInfo[];
};

export const ContactItem: FC<ContactItem> = ({
  contact,
  activeChatUser,
  setActiveChatUser,
}) => {
  return (
    <div
      className={cn(
        activeChatUser?.chatId === contact.chatId
          ? `${styles.contact} ${styles.contact__active}`
          : styles.contact
      )}
      onClick={() => setActiveChatUser(contact)}
    >
      {contact.avatar ? (
        <img src={contact.avatar} alt={contact.name} />
      ) : (
        <img
          src={`https://placehold.co/200x200/green/white?text=${contact.name[0]}`}
          alt={contact.name + " image"}
        />
      )}

      <div>
        <h3>{contact.name}</h3>
        <p>{"+" + contact.chatId.replace("@c.us", "")}</p>
      </div>
    </div>
  );
};
