import './App.css'

export type MessageProps = {
    isPositive: boolean,
    message: string
    }


const Message = ({isPositive, message}: MessageProps) => {

    let tyyli = '';

    if (isPositive === true) {
        tyyli = "pos"
    }
    else {
        tyyli = "neg"
    }

    console.log('Message render: tyyli=', tyyli, 'message=', message, 'isPositive=', isPositive);
    return (
        <div className={tyyli}>
            {message}
        </div>
    )
}

export default Message