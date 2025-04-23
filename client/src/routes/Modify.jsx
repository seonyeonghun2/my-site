import {useState} from 'react'
import axios from 'axios'
import jsCookie from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
function Modify() {
    const cookie = jsCookie.get('auth_token')
    if (!cookie) {
        alert('정보가 없습니다.')
    } 
    const decoded = jwtDecode(cookie)    
    
    const [formData, setFormData] = useState({        
        name: '',
        pwd: '',
        phone: '',
        email: ''
      })
      const handleSubmit = (e) => {
        e.preventDefault()    
        const sendData = {
            ...formData,
            id: decoded.id
        }
        console.log(sendData);
        // axios.post('http://localhost:4000/api/user', formData)
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
      }
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
      }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 min-w-7xl mx-auto">
        <legend className="fieldset-legend">Modify</legend>

        <label className="label text-2xl">password</label>
        <input type="password" className="input min-w-full" placeholder="password" name="pwd" id="pwd" onChange={handleChange} />

        <label className="label text-2xl">name</label>
        <input type="text" className="input min-w-full" placeholder="name" name="name" id="name" onChange={handleChange} />
        <label className="label text-2xl">phone</label>
        <input type="tel" className="input min-w-full" placeholder="phone number" name="phone" id="phone" onChange={handleChange} />
        <label className="label text-2xl">email</label>
        <input type="email" className="input min-w-full" placeholder="email address" name="email" id="email" onChange={handleChange} />
        <button className="btn bg-white text-black border-[#e5e5e5]" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

  confirm
</button>
      </fieldset>
    </form>
  )
}

export default Modify