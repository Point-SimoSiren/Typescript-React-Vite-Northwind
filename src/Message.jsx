import './App.css'

const Message = ({ isPositive, message }) => {
  let tyyli = ''

  if (isPositive === true) {
    tyyli = 'pos'
  } else {
    tyyli = 'neg'
  }

  console.log('Message render: tyyli=', tyyli, 'message=', message, 'isPositive=', isPositive)
  return (
    <div className={tyyli}>
      {message}
    </div>
  )
}

export default Message
