import React from 'react';
import './App.css';
import { Tabs} from "antd";
import Video from "./components/video";
import Audio from "./components/audio";
import ShareScreen from "./components/shareScreen";
import PeerConn from "./components/peerConn";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    return <>
      <Tabs defaultActiveKey={"4"}>
        <Tabs.TabPane tab={"video"} key={"1"}>
        <Video/>
        </Tabs.TabPane>
        <Tabs.TabPane tab={"audio"} key={"2"}>
          <Audio/>
        </Tabs.TabPane>
        <Tabs.TabPane tab={"shareScreen"} key={"3"}>
          <ShareScreen/>
        </Tabs.TabPane>
        <Tabs.TabPane tab={"peerConn"} key={"4"}>
          <PeerConn/>
        </Tabs.TabPane>
      </Tabs>
      </>
  }

}

export default App;
