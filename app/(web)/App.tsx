// import { MutableRefObject, useRef } from "react";
import { DndProvider } from "react-dnd";
import Editor from "../../page/app";
import { ConfigProvider, enUS } from "../../utils/configProvider";
// import { useTranslation } from "react-i18next";
import { useEffect } from "react";
// import { globalStyle } from "./style";
import { Global } from "@emotion/react";
import { ModalGroup } from "../../utils/model/src/modal-group";
// import { TouchBackend } from "react-dnd-touch-backend";
import { NotificationGroup } from "../../utils/Notification";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "@/store";
import { HTML5Backend } from "react-dnd-html5-backend";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function App(props:any) {
//   const { id } = useParams();
  const currentUserLanguage = "en-US";
  const dragOptions = {
    enableTouchEvents: true,
    enableMouseEvents: true,
  };
//   const { i18n } = useTranslation();

//   useEffect(() => {
//     if (currentUserLanguage) {
//       i18n.changeLanguage(currentUserLanguage);
//     }
//     // axios.get(`${"http://52.183.132.161/backend"}/api/apps/${id}`).then((res) => {
//     //   localStorage.setItem("pageConfig", JSON.stringify(res.data.config));
//     // });
//   }, [currentUserLanguage, i18n, id]);
  return ( 
    <>
    <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <div style={{ boxSizing: "border-box", overflow: "hidden" }}>
        {/* <DndProvider backend={TouchBackend} options={dragOptions}> */}
          <ConfigProvider locale={enUS}>
            {/* <Global styles={globalStyle} /> */}
            {/* <NotificationGroup pt={"46px"} /> */}
            {/* <ModalGroup /> */}
            <Editor {...props}/>
          </ConfigProvider>
        {/* </DndProvider> */}
      </div>
      </Provider>
      </DndProvider>
      
    </>
  );
}
export default App;
