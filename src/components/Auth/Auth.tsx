import { FC } from "react";

import styles from "./Auth.module.scss";
import { useState } from "react";
import { sendRequestMethod } from "../../API/sendRequestMethod";

type Auth = {
  setIdInstance: React.Dispatch<React.SetStateAction<string>>;
  setApiTokenInstance: React.Dispatch<React.SetStateAction<string>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Auth: FC<Auth> = ({
  setIdInstance,
  setApiTokenInstance,
  setIsAuth,
}) => {
  const [id, setId] = useState<string>("");
  const [apiToken, setApiToken] = useState<string>("");

  const onSubmit = async () => {
    try {
      const getStateInstance = await sendRequestMethod(id, apiToken, 'getStateInstance', 'GET')
      
      if (getStateInstance) {
        setIdInstance(id);
        setApiTokenInstance(apiToken);
        setIsAuth(true);
      }
    } catch (error) {
      alert("Неверные данные. Попробуйте ещё раз.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <h2>Авторизация</h2>
        <div className={styles.input}>
          <p>idInstance</p>
          <input
            type="text"
            name="idInstance"
            placeholder="..."
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className={styles.input}>
          <p>apiTokenInstance</p>
          <input
            type="text"
            name="apiTokenInstance"
            placeholder="..."
            onChange={(e) => setApiToken(e.target.value)}
            required
          />
        </div>
        <button>Войти</button>
      </form>
    </div>
  );
};
