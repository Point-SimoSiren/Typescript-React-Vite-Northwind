import './App.css'
import React, {useState} from 'react'
import LoginService from './services/LoginService'
//import bcrypt from 'bcryptjs'

const Login = ({setIspositive, setMessage, setShowMessage, setLoggedInUser}) => {

// Komponentin tilan määritys
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = async e => {
      e.preventDefault()

    // Salasana kryptataan
    //const hashed = await bcrypt.hash(password, 10)

      var userForAuth = {
        username: username,
        password: password
        //password: hashed
    }

    //alert(userForAuth.password)

    // Käytetään services/Auth.js tiedoston metodia
    LoginService.authenticate(userForAuth)
    .then(response => {
        if (response.status === 200) {
     
        // Talletetaan tietoja selaimen local storageen (f12 application välilehti)
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("accesslevel", response.data.accesslevel)
        localStorage.setItem("token", response.data.token)
        
        // Asetetaan app komponentissa olevaan stateen
        setLoggedInUser(response.data.username)

       setMessage(`Logged in as: ${userForAuth.username}`)
       setIspositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

    }
      })
      .catch(error => {
        setMessage(error)
        setIspositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }

    // Kenttien tyhjennys
    const emptyFields = () => {
        setUsername("")
        setPassword("")
    } 


  return (
    <div id="loginWindow">
       <h2>Login</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={username} placeholder="Username"
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                <input type="password" value={password} placeholder="Password"
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            
         <input type='submit' value='Login' />
         <input type='button' value='Empty' onClick={() => emptyFields()} />
       </form>

    </div>
  )
}

export default Login