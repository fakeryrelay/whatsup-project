import "./assets/styles/App.scss";
import { Auth } from "./components/Auth/Auth";
import { ChatApp } from "./components/ChatApp/ChatApp";
import { useState } from "react";

function App() {
  const [idInstance, setIdInstance] = useState<string>("");
  const [apiTokenInstance, setApiTokenInstance] = useState<string>("");
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <>
      <div className="App">
        {isAuth ? (
          <ChatApp
            idInstance={idInstance}
            apiTokenInstance={apiTokenInstance}
          />
        ) : (
          <Auth
            setIdInstance={setIdInstance}
            setApiTokenInstance={setApiTokenInstance}
            setIsAuth={setIsAuth}
          />
        )}
      </div>
    </>
  );
}

export default App;
