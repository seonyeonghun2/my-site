import { useState, useEffect } from 'react';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate} from 'react-router'
function Modify() {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  useEffect(() => {
    const cookie = jsCookie.get('auth_token');
    if (!cookie) {
      alert('정보가 없습니다.');
    }
    const decoded = jwtDecode(cookie);
    // console.log(decoded)
    setUserInfo(decoded)
    setFormData({
      name: decoded.user_name,
      phone: decoded.user_phone,
      email: decoded.user_email
    })
  }, []);
  console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = {
      ...formData,
      id: userInfo.user_id,
    };
    // console.log(sendData);
    axios
      .put('http://localhost:4000/api/user', sendData, {
        withCredentials: true,
      })
      .then(function (response) {
        if(response.status === 200 || response.statusText === 'OK') {
          alert("정보 수정 완료! \n 첫페이지로 이동합니다.")
          navigate('/')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 min-w-7xl mx-auto">
        <legend className="fieldset-legend">Modify</legend>

        <label className="label text-2xl">name</label>
        <input
          type="text"
          className="input min-w-full border border-black"
          placeholder="name"
          name="name"
          id="name"
          disabled
          onChange={handleChange}
          defaultValue={userInfo.user_name}
        />
        <label className="label text-2xl">phone</label>
        <input
          type="tel"
          className="input min-w-full"
          placeholder="phone number"
          name="phone"
          id="phone"
          onChange={handleChange}
          defaultValue={userInfo.user_phone}
        />
        <label className="label text-2xl">email</label>
        <input
          type="email"
          className="input min-w-full outline-0"
          placeholder="email address"
          name="email"
          id="email"
          onChange={handleChange}
          defaultValue={userInfo.user_email}
        />
        <button className="btn bg-white text-black border-[#e5e5e5]" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          confirm
        </button>
      </fieldset>
    </form>
  );
}

export default Modify;
