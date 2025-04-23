import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
function SignIn() {
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        id: '',
        pwd: '',
      })
      const handleSubmit = (e) => {
        e.preventDefault()    
        axios.post('http://localhost:4000/api/signin', formData, {
          withCredentials: true
        })
        .then(function (response) {
          if (response.status === 200 || response.statusText === 'OK') {
            alert(`${response.data.msg}!, \n처음화면으로 이동합니다`)
            navigate('/')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
      }
  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 min-w-7xl mx-auto">
        <legend className="fieldset-legend">Sign In</legend>

        <label className="label text-2xl">id</label>
        <input type="text" className="input min-w-full" placeholder="user account (id)" name="id" id="id" onChange={handleChange} />

        <label className="label text-2xl">password</label>
        <input type="password" className="input min-w-full" placeholder="password" name="pwd" id="pwd" onChange={handleChange} />

        <button className="btn bg-white text-black border-[#e5e5e5]" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

  login
</button>
      </fieldset>
    </form>
  );
}

export default SignIn