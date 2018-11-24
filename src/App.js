import React, { Component } from "react";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import MyTestForm from "./Components/Form";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App" style={{ marginTop: "200px" }}>
          <MyTestForm />
        </div>
      </Provider>
    );
  }
}

export default App;
