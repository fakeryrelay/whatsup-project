import { FC } from "react";
import { useState, useContext } from "react";
import styles from "../Chat.module.scss";
import { ContactItem } from "./ContactItem";
import { IContactInfo } from "../../../Types/TypeChatData";
import { sendRequestMethod } from "../../../API/sendRequestMethod";
import { ChatAppContext } from "../../../utils/context";

type Contacts = {
  setActiveChatUser: React.Dispatch<
    React.SetStateAction<IContactInfo | undefined>
  >;
};

// type TypeCheckWhatsappRequestBody = {
//   phoneNumber: number;
// };

// type TypeCheckWhatsappResponse = {
//   existsWhatsapp: boolean;
// };

type TypeGetContactInfoRequestBody = {
  chatId: string;
};

type TypeGetContactInfoResponse = IContactInfo;

export const Contacts: FC<Contacts> = ({ setActiveChatUser }) => {
  const [contacts, setContacts] = useState<IContactInfo[]>([]);
  const [contactAddInput, setContactAddInput] = useState<string>("");

  const { idInstance, apiTokenInstance, activeChatUser } =
    useContext(ChatAppContext);

  const addNewContact = async (contactAddInput: string): Promise<void> => {
    console.log(contactAddInput);
    const inputToNumber = +contactAddInput.replace("+", "");

    if (
      contactAddInput.replace("+", "") !== String(inputToNumber) ||
      !(
        contactAddInput.replace("+", "").length === 12 ||
        contactAddInput.replace("+", "").length === 11
      )
    ) {
      alert("Некорректный номер");
      return;
    }

    if (contacts.map((el) => el.chatId).includes(`${inputToNumber}@c.us`)) {
      alert("Номер уже добавлен");
      return;
    }

    try {
      // const checkWhatsappRequestBody: TypeCheckWhatsappRequestBody = {
      //   phoneNumber: inputToNumber,
      // };

      // const checkWhatsappRequest: TypeCheckWhatsappResponse = await sendRequestMethod(
      //   idInstance,
      //   apiTokenInstance,
      //   "checkWhatsapp",
      //   "POST",
      //   checkWhatsappRequestBody
      // );

      // console.log(checkWhatsappRequest)

      // if (checkWhatsappRequest.existsWhatsapp) {
      const getContactInfoRequestBody: TypeGetContactInfoRequestBody = {
        chatId: inputToNumber + "@c.us",
      };

      const getContactInfoRequest: TypeGetContactInfoResponse =
        await sendRequestMethod(
          idInstance,
          apiTokenInstance,
          "getContactInfo",
          "POST",
          getContactInfoRequestBody
        );

      setContactAddInput("");
      setContacts((prev) => [...prev, getContactInfoRequest]);
      setActiveChatUser(getContactInfoRequest);
      // } else {
      //   alert("Данного пользователя нет в WhatsUp");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.chats}>
      <div className={styles.chats__header}>
        <h1>Чаты</h1>
      </div>

      <form
        className={styles.contacts__nav}
        onSubmit={(e) => {
          e.preventDefault();
          addNewContact(contactAddInput);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Добавить контакт"
            onChange={(e) => setContactAddInput(e.target.value)}
            value={contactAddInput}
          />
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enable-background="new 0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z"
            ></path>
          </svg>
        </div>
        <button>
          <svg version="1.1" x="0px" y="0px" viewBox="0 0 459.739 459.739">
            <path d="M229.869,0C102.917,0,0,102.917,0,229.87c0,126.952,102.917,229.869,229.869,229.869s229.87-102.918,229.87-229.869 C459.739,102.917,356.821,0,229.869,0z M313.677,260.519h-53.158v53.158c0,16.925-13.724,30.649-30.649,30.649 c-16.926,0-30.649-13.724-30.649-30.649v-53.158h-53.156c-16.926,0-30.65-13.723-30.65-30.649c0-16.927,13.724-30.65,30.65-30.65 h53.156v-53.156c0-16.927,13.724-30.65,30.649-30.65c16.926,0,30.649,13.724,30.649,30.65v53.156h53.158 c16.924,0,30.648,13.723,30.648,30.65C344.325,246.796,330.601,260.519,313.677,260.519z"></path>
          </svg>
        </button>
      </form>

      <div className={styles.contacts}>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.chatId}
            contact={contact}
            activeChatUser={activeChatUser}
            setActiveChatUser={setActiveChatUser}
            contacts={contacts}
          />
        ))}
      </div>
    </div>
  );
};
