import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Preview from "./Preview";
import "./App.css";
import WebCamCapture from "./WebCamCapture";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login></Login>
        ) : (
          <>
            <img
              className="app__logo"
              src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
              alt=""
            />
            <div className="app__body">
              <div className="app__bodyBg">
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                  <Route path="/chats/view">
                    <ChatView></ChatView>
                  </Route>
                  <Route path="/chats">
                    <Chats></Chats>
                  </Route>
                  <Route path="/preview">
                    <Preview></Preview>
                  </Route>
                  <Route exact path="/">
                    <WebCamCapture></WebCamCapture>
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
