import { Typography, Button } from "@mui/material"

const MessageList =(props) => {
    const messageMap = (message, i) => {
        // let minutes = (Math.floor(message.time / 60))
        // let seconds = (Math.floor(message.time))
        console.log(message.time)
        let time = new Date(message.time * 1000).toISOString().substring(14, 19)
    return(<Typography key={i}><Button onClick={(e) => props.seekHandle(message.time)}>{time}</Button> - {message.text}</Typography>)}
    return (props.messages.map(messageMap))
}

export default MessageList