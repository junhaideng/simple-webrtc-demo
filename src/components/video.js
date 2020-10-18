import React, {createRef} from 'react';
import {Button, Divider, Select, Space} from "antd";
import "./video.css"

const constraint = {
    video:{
        width:{
            exact: 320
        },
        height:{
            exact: 240
        }
    },
    audio:false
}

class Video extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
        this.video = createRef()
        this.canvas = createRef()
        this.handleOpenVideo = this.handleOpenVideo.bind(this)
        this.takeSnap = this.takeSnap.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleOpenVideo(){
        navigator.mediaDevices.getUserMedia(constraint).then(stream =>{
            this.video.current.srcObject = stream
            const videoTracks = stream.getVideoTracks()
            console.log("通过设置限制条件获取到流：", constraint)
            console.log("使用视频设备：", videoTracks[0].label)
        }).catch(err=>{
            console.log(err)
        })
    }

    takeSnap(){
        this.canvas.current.height = this.video.current.videoHeight
        this.canvas.current.width = this.video.current.videoWidth
        this.canvas.current.getContext("2d").drawImage(this.video.current, 0, 0, this.canvas.current.width, this.canvas.current.height)
    }

    handleChange(value){
        console.log(`select ${value}`)
        this.video.current.className = value
    }



    render() {
        return <>
                <div>
                    <video playsInline autoPlay ref={this.video}/>
                </div>
            <Divider/>
            <div>
                <canvas ref={this.canvas}/>
            </div>
                <Space>
                    <Button onClick={this.handleOpenVideo}>打开摄像头</Button>
                    <Button onClick={this.takeSnap}>takeSnap</Button>
                    <Select defaultValue={"none"} onChange={this.handleChange}>
                        <Select.Option value={"none"}>none</Select.Option>
                        <Select.Option value={"blur"}>blur</Select.Option>
                        <Select.Option value={"grayscale"}>grayscale</Select.Option>
                        <Select.Option value={"invert"}>invert</Select.Option>
                        <Select.Option value={"sepia"}>sepia</Select.Option>
                    </Select>
                </Space>
            </>
    }

}

export default Video