import React, {useState} from 'react';
import axios from 'axios'
function App() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    pwd: '',
    phone: '',
    email: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()    
    axios.post('/user', formData)
    .then(function (response) {
      console.log(response);
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
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 min-w-7xl mx-auto">
        <legend className="fieldset-legend">Sign Up</legend>

        <label className="label text-2xl">id</label>
        <input type="text" className="input min-w-full" placeholder="user account (id)" name="id" id="id" onChange={handleChange} />

        <label className="label text-2xl">password</label>
        <input type="text" className="input min-w-full" placeholder="password" name="pwd" id="pwd" onChange={handleChange} />

        <label className="label text-2xl">name</label>
        <input type="text" className="input min-w-full" placeholder="name" name="name" id="name" onChange={handleChange} />
        <label className="label text-2xl">phone</label>
        <input type="text" className="input min-w-full" placeholder="phone number" name="phone" id="phone" onChange={handleChange} />
        <label className="label text-2xl">email</label>
        <input type="text" className="input min-w-full" placeholder="email address" name="email" id="email" onChange={handleChange} />
        <button className="btn bg-white text-black border-[#e5e5e5]" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

  confirm
</button>
      </fieldset>
    </form>
  );
}

export default App;
