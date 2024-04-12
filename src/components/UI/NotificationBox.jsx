export default function NotificationBox({visible, text}){
    if(!visible){
        return <></>;
    }
    return <div className="notification" >{text}</div>;
}