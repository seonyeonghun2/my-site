import {useState} from 'react';
import jsCookies from 'js-cookie'
import axios from 'axios'
function WriteWorks() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_active: '',
    files: []
  })
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...formData,
      [name]: value
    }))
  }
  const handleFileChnage = (e) => {
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...e.target.files]
    }))
  }
  const token = jsCookies.get('auth_token')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const uploadData = new FormData()
    uploadData.append("title", formData.title)
    uploadData.append("description", formData.description)
    uploadData.append("is_active", formData.is_active)
    formData.files.forEach((file) => {
      uploadData.append("files", file)
    })
    // for (var pair of uploadData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    await axios.post("http://localhost:4000/works/add", uploadData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    }).then((response) => console.log(response)).catch((err) => console.error(err))
  }
  return (
    <div className="w-7xl mx-auto my-5">
      <h2>WriteWorks</h2>
      <form autoComplete="off" onSubmit={handleSubmit} encType='multipart/form-data'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-6xl min-w-96">
          <legend className="fieldset-legend">Works details</legend>

          <label className="label">제목</label>
          <input type="text" className="input flex md:w-3xl lg:w-5xl" name="title" onChange={handleInputChange} placeholder="My awesome page" />

          <label className="label">내용</label>
          <input type="text" className="input flex md:w-3xl lg:w-5xl" name="description" onChange={handleInputChange} placeholder="my-awesome-page" />

          <label className="label">완료여부</label>
          <input type="text" className="input flex md:w-3xl lg:w-5xl" name="is_active" onChange={handleInputChange} placeholder="Name" />
          <label className="label">첨부파일</label>
          <div className="flex md:w-3xl lg:w-5xl gap-5 justify-between">
            <input type="file" className="file-input file-input-primary" onChange={handleFileChnage} name="files" />
            <input type="file" className="file-input file-input-secondary" onChange={handleFileChnage} name="files" />
            <input type="file" className="file-input file-input-accent" onChange={handleFileChnage} name="files" />
          </div>

          <button type="submit" className="btn btn-neutral mt-4">등록</button>
        </fieldset>
      </form>
    </div>
  );
}

export default WriteWorks;
