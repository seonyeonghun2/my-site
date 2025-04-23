import {useState} from 'react'

function SignIn() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        pwd: '',
        phone: '',
        email: ''
      })
      const handleSubmit = (e) => {
        e.preventDefault()    
        axios.post('http://localhost:4000/api/user', formData)
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