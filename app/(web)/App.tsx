import { Provider } from "react-redux";
import store from "@/store";
function App(props: any) {
  return (
    <>
      <Provider store={store}>
        <div style={{ boxSizing: "border-box", overflow: "hidden" }}>
          <div>Hello World</div>
        </div>
      </Provider>
    </>
  );
}
export default App;
