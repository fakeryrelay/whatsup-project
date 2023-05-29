import { FC } from "react";
import styles from "../Chat.module.scss";

type MessageComponent = {
  type: "incoming" | "outgoing";
  textMessage: string;
};

export const Message: FC<MessageComponent> = ({ type, textMessage }) => {
  return (
    <div className={styles.message}>
      <div
        className={
          type === "incoming"
            ? styles.message__incoming
            : styles.message__outgoing
        }
      >
        <span></span>
        <p>{textMessage}</p>
      </div>
    </div>
  );
};
