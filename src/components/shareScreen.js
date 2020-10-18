import React, {createRef} from "react";
import {Button} from "antd";

class ShareScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.video = createRef()

        this.shareScreen = this.shareScreen.bind(this)
    }

    shareScreen() {
        /*
        显示的时候会出现递归，原因是这样的
        video中获取屏幕的信息显示在屏幕里面，这些屏幕被捕获到，然后显示在video里面
        然后这些又被捕获显示在里面，如此反复
         */
        navigator.mediaDevices.getDisplayMedia({
            video: true
        }).then(stream => {
            this.video.current.srcObject = stream
            console.log("使用资源名称：",stream.getVideoTracks()[0].label)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return <>
            <div>
                <video playsInline autoPlay ref={this.video} width={640}/>
            </div>
            <Button onClick={this.shareScreen}>共享屏幕</Button>
        </>
    }
}

export default ShareScreen