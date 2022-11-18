import React from "react";
import axios from "axios"
import Input from "@mui/material/Input"
import { useState, useRef } from "react";
import ReactPlayer from 'react-player/youtube'
import Button from "@mui/material/Button"
import FormGroup from "@mui/material/FormGroup"
import YouTube, { YouTubeProps } from 'react-youtube'
import { useEffect } from "react";
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import { Paper, Typography } from "@mui/material";
import MessageList from "../components/MessageList";
import io from 'socket.io-client'


const Video = () => {
    const [video, setVideo] = useState(null)
    const [duration, setDuration] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState([])
    const [socket] = useState(() => io(':8000'))
    const ref = useRef(null)
    const onVideoSubmit = (e) => {
        e.preventDefault()
        setVideo(e.target[0].value)
        console.log(e.target[0].value)
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/video')
        .then(res =>{
            setVideo(res.data[0])
            let messages = res.data[0].messages
            let sorted = messages.sort((a, b) => a.time > b.time ? 1 : -1)
            setMessages(sorted)
            console.log(res.data[0])
            setLoaded(true)
        })
    socket.on('new_message', msg => {
    console.log('new message')
    setMessages(prevMessages => {
        return [msg, ...prevMessages].sort((a, b) => a.time > b.time ? 1 : -1);
    })})
    return () => socket.disconnect(true);
    }, []);
    
    const messageHandler = (e) => {
        e.preventDefault()
        
        let message = {
            text:messageText,
            time:duration
        }
        socket.emit('message', message)
        let newMessages = [...messages, message]
        newMessages = newMessages.sort((a, b) => a.time > b.time ? 1 : -1)
        setMessages(newMessages)
        axios.post(`http://localhost:8000/api/video/${video._id}`, message)
        .then(res => console.log(res) )
        .catch(err => console.error(err))
    }
    const messageTextHandler = (e) => {

        e.preventDefault()
        if (ref.current) setDuration(ref.current.getCurrentTime())
        setMessageText(e.target.value)
        
    }
    const seekHandle = (time) => {
        if(ref.current) {ref.current.seekTo(time);
        ref.current.playVideo()}
    }
    const durationHandler = () => {

        if (ref.current) { setDuration(ref.current.getCurrentTime()) }
    }
    return (
        <div>
            <Typography variant='h3' sx={{margin:'10px'}}>Video Page </Typography>
            <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 3 }}>
                <Grid item xs={7} >
                    {loaded && <ReactPlayer ref={ref} url={video.url} width="100%" height="40em" config={{ youtube: { playerVars: { controls: 1 } } }} />}
                    <form onSubmit={onVideoSubmit}>
                        <FormGroup>
                            {/* <Input type="text" />
                            <Button variant="contained" type="submit" value="Load Video">Submit Video</Button>
                            <Button variant="contained" onClick={() => durationHandler()}>Playtime Change</Button> */}
                        </FormGroup>
                    </form>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ height: '80%', width: '80%', backgroundColor: "gray" }}>
                        <Paper sx={{ height: "90%", overflow:"auto" }}><MessageList seekHandle={seekHandle} messages={messages}/></Paper>
                        <Paper sx={{ height: "10%", display:"flex", justifyContent:"space-between" }}>
                            <form style={{display:'flex', justifyContent:"space-between"}} onSubmit={messageHandler}>
                            <Input type="text" value={messageText} onChange={messageTextHandler} sx={{ width: "70%", height: "100%" }} />
                            <Button type="submit" variant="contained" sx={{width:"25%"}}>Send Message</Button>
                            </form>
                        </Paper>

                    </Box>
                </Grid>
            </Grid>

        </div>
    );
}

export default Video
