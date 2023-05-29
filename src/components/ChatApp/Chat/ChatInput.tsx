import { FC, useState } from "react";
import styles from "../Chat.module.scss";

type TypeChatInput = {
  sendMessage: (inputValue: string) => void;
  isActive: boolean
};

export const ChatInput: FC<TypeChatInput> = ({ sendMessage, isActive }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const onEnterPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    fn: React.Dispatch<React.SetStateAction<string>>
  ) => {
    e.stopPropagation();
    if (e.code === "Enter" && e.shiftKey === false) {
      sendMessage(inputValue);
      fn("");
    }
  };

  return (
    <form className={styles.chat__input} onSubmit={(e) => e.preventDefault()}>
      <textarea
        disabled={!isActive} 
        placeholder="Введите сообщение"
        value={inputValue}
        onKeyDown={(e) => {
          onEnterPress(e, setInputValue);
        }}
        onChange={(e) => {
          if (e.target.value === "\n") {
            return;
          }
          setInputValue(e.target.value);
        }}
      ></textarea>
      <button disabled={!isActive} onClick={() => {
        sendMessage(inputValue)
        setInputValue('')
      }}>
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
            d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
          ></path>
        </svg>
      </button>
    </form>
  );
};
