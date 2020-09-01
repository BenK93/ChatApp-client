import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import JoinComponent from "./join/join-component";
import { ChatRoomComponent } from "./chat-room/chat-room-component";

const App = () => (
  <Router>
    <Route path="/" exact component={JoinComponent} />
    <Route path="/chat" component={ChatRoomComponent} />
  </Router>
);

export default App;
