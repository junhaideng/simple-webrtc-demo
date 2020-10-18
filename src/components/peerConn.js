import {Button, Col, Row} from "antd";
import React, {createRef} from "react";

let configuration = {}

class PeerConn extends React.Component {
    constructor(props) {
        super(props);
        this.other = createRef();
        this.mine = createRef();
        this.startConn = this.startConn.bind(this);

        this.handleClick = this.handleClick.bind(this)

    }

    startConn(stream) {
       this.myConn = new RTCPeerConnection(configuration);
       this.otherConn = new RTCPeerConnection(configuration);
       // 将stream中轨道加入
       for (const track of stream.getTracks()){
           this.myConn.addTrack(track, stream);
       }
       // 监听改变
       this.otherConn.ontrack = (e) => {
           console.log(e)

           this.other.current.srcObject = e.streams[0]
       }

       this.myConn.onicecandidate = (event) => {
           if (event.candidate) {
               this.otherConn.addIceCandidate(new RTCIceCandidate(event.candidate)).then();
           }
       }
       this.otherConn.onicecandidate = (event) => {
           if (event.candidate) {
               this.myConn.addIceCandidate(new RTCIceCandidate(event.candidate)).then();
           }
       }
        // start offer，可以正常创建
         this.myConn.createOffer().then(offer => {
            console.log("offer from mine: ",offer)
             this.myConn.setLocalDescription(offer);
             this.otherConn.setRemoteDescription(offer);

            this.otherConn.createAnswer().then(offer => {
                console.log("offer from otherConn: ", offer)
                this.otherConn.setLocalDescription(offer);
                this.myConn.setRemoteDescription(offer);
            }).catch(err=>{
                console.log("Err in otherConn: ", err);
            })
        }).catch(err => {
            console.log(err)
        })

    }

    handleClick() {
        navigator.mediaDevices.getUserMedia({video: {
                width:{
                    exact: 320
                },
                height:{
                    exact: 240
                }
            }, audio: true}).then(stream => {
            this.mine.current.srcObject = stream;

            this.startConn(stream);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return <>
            <Row>
                <Col span={10}>
                    <video ref={this.mine} autoPlay/>
                </Col>
                <Col span={10} offset={4}>
                    <video ref={this.other} autoPlay/>
                </Col>

            </Row>
            <Button onClick={this.handleClick}>连接</Button>
        </>
    }
}

export default PeerConn