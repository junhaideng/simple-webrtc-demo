import React, {createRef} from 'react';
import {Button, Space} from "antd";

const constraint = {
    video:false,
    audio:true
}

class Audio extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
        this.audio = createRef()
        this.handleOpenAudio = this.handleOpenAudio.bind(this)
    }

    handleOpenAudio(){
        navigator.mediaDevices.getUserMedia(constraint).then(stream =>{
            this.audio.current.srcObject = stream
            const audioTracks = stream.getAudioTracks()
            console.log("通过设置限制条件获取到流：", constraint)
            console.log("使用视频设备：", audioTracks[0].label)
            stream.oninactive = ()=>{
                console.log("Stream 停止")
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return <>
            <div>
                <audio controls autoPlay ref={this.audio}/>
            </div>
            <Space>
                <Button onClick={this.handleOpenAudio}>打开麦克风</Button>
            </Space>
        </>
    }

}

export default Audio