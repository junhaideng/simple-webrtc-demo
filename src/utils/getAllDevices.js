MediaStreamTrack.getCapabilities((sources) => {
    let audioSource = null;
    let videoSource = null;

    for(let i=0; i<sources.length; i++){
        let source = sources[i];
        if (source.kind == "audio"){
            console.log("find audio: ", source.label, source.id);
            audioSource = source.id ;

        }
        if(source.kind == "video"){
            console.log("find video: ", source.label, source.id);
            videoSource = source.id ;
        }else{
            console.log("find unknown device: ", source);
        }
    }
})