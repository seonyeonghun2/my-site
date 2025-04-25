import { useState } from 'react';
import jsCookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'
function WriteBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categories: ''
  })
  const token = jsCookies.get('auth_token')  
  const handleChangeInput = (e) => {
    const {name, value} = e.target
    setFormData(prevdata => ({
      ...prevdata,
      [name]: value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/blog/create", formData, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      withCredentials: true
    }).then((response) => {
      if (response.status === 200 || response.statusText === 'OK') {
        alert("등록 성공!\n목록으로 이동합니다")
        window.location.href = '/blog'
      }
    }).catch((err) => console.error(err))      
  }
  return (
    <div className="w-7xl mx-auto my-5">
      <h2>WriteBlog</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-6xl min-w-96">
          <legend className="fieldset-legend">Blog details</legend>

          <label className="label">제목</label>
          <input type="text" className="input" name="title" onChange={handleChangeInput} placeholder="My awesome page" />

          <label className="label">내용</label>
          <input type="text" className="input" name="content" onChange={handleChangeInput} placeholder="my-awesome-page" />

          <label className="label">구분</label>
          <input type="text" className="input" name="categories" onChange={handleChangeInput} placeholder="해시태그" />

          <button type="submit" className="btn btn-neutral mt-4">등록</button>
        </fieldset>
      </form>
    </div>
  );
}

export default WriteBlog;
