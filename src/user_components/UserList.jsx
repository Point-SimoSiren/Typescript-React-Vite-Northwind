import { useEffect, useState } from 'react'
import '../App.css'
import UserService from '../services/UserService.js'
import UserAdd from '../user_components/UserAdd.jsx'

const UserList = ({ setMessage, setShowMessage, setIspositive, hideMessage }) => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [x, reload] = useState(false)
  const normalizedSearch = search.trim().toLowerCase()

  const filteredUsers = users.filter(u => {
    if (!u) {
      return false
    }

    const lastName = typeof u.lastname === 'string' ? u.lastname.toLowerCase() : ''

    if (normalizedSearch === '') {
      return true
    }

    return lastName.includes(normalizedSearch)
  })
  
  useEffect(() => {
    UserService.getAll()
      .then(data => setUsers(data))
      .catch(error => alert('Users could not be loaded. ' + error.message))
  }, [x])

  return (
    <>
      <h2>Users</h2>

      <UserAdd
        setMessage={setMessage}
        setShowMessage={setShowMessage}
        setIspositive={setIspositive}
        x={x}
        reload={reload}
      />

      <div className='user-table-section'>
        <div className='user-table-toolbar'>
          {/* hakukentta */}
          <input
            type='text'
            className='user-search'
            placeholder='Search by name'
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </div>

        <div className='user-table-wrapper'>
          <table className='user-table'>
            <caption className='user-table-caption'>Active users</caption>
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Username</th>
                <th>User type</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.userId}>
                  <td>{u.firstname}</td>
                  <td>{u.lastname}</td>
                  <td>{u.username}</td>
                  <td>{u.acceslevel == 1 && "Admin"}
                    {u.acceslevel != 1 && "Basic user"}
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan='4' className='user-table-empty'>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default UserList
