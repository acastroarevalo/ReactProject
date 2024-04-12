import { useState } from "react";

export default function useNotification(){
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');

    function showNotification(text, ms) {
        setVisible(true);
        setText(text);
        setTimeout(() => {
            setVisible(false);
        }, ms);
    }

    return {visible, text, showNotification};
}