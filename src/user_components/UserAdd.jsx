import { useState } from 'react'
import '../App.css'
import UserService from '../services/UserService.js'
//import bcrypt from 'bcryptjs'

const UserAdd = ({x, reload, setMessage, setShowMessage, setIspositive}) => {
 
  // Statet
  const [newFirstname, setNewFirstname] = useState('')
  const [newLastname, setNewLastname] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newAccesslevel, setNewAccesslevel] = useState(2)
  const [showForm, setShowForm] = useState(false)

  const formSubmit = async e => {
    e.preventDefault()

    // Salasana kryptataan
    //const hashed = await bcrypt.hash(newPassword, 10)

    const newUser = {
      firstname: newFirstname,
      lastname: newLastname,
      username: newUsername,
     // password: hashed, //käytetään kryptattua
      password: newPassword,
      acceslevel: newAccesslevel
    }

    //alert(newUser.password)

    UserService.create(newUser)
      .then(response => {
       
        setNewFirstname('')
        setNewLastname('')
        setNewUsername('')
        setNewPassword('')
        setNewAccesslevel('')

        setMessage("Lisättiin käyttäjä: " + newUser.username)
        setIspositive(true)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false),
            reload(!x)
        }, 5000)
      })
      .catch(error => {
        setMessage(error.response.data)
        setIspositive(false)
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 6000)
      })
  }

  return (
    <>
      <h3 onClick={() => setShowForm(!showForm)}>(+)Adding new user</h3>

      {showForm && (
        <>
          <hr />
          <form onSubmit={formSubmit} className='addform'>
        
            <div>
              <label>First Name</label>
              <input value={newFirstname} onChange={e => setNewFirstname(e.target.value)} />
            </div>
            <div>
              <label>Last Name</label>
              <input value={newLastname} onChange={e => setNewLastname(e.target.value)} />
            </div>
            <div>
              <label>Username</label>
              <input value={newUsername} onChange={e => setNewUsername(e.target.value)} />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </div>
            <div>
              <label>Access level</label>
              <input type="number" min={1} max={2} value={newAccesslevel} onChange={e => setNewAccesslevel(e.target.value)} />
              {newAccesslevel == 1 ? <label>Admin user</label> : <label>Basic user</label>}
            </div>
           
            <button type="submit">Save</button>
          </form>
        </>
      )}
    </>
  )
}

export default UserAdd
