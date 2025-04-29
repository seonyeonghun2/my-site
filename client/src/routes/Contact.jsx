import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router'

function Contact() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    const getContacts = () => {
      axios.get("http://localhost:4000/contacts/all").then((response) => {
        // 오름차순
        setContacts(response.data.data)
        // 내림차순
        // setPosts(response.data.data.sort((a,b) => b - a))
        setIsLoading(false)
      }).catch((err) => {
        console.log(err)
      })
    }
    getContacts();
  }, [])
  if (isLoading) {
    return (
      <div>로딩중..</div>
    )
  }
  function stringToDate(dateString) {
    return new Date(dateString).toLocaleDateString("ko-kr", {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    }).split(".")
  }
  const handleClick = () => {
    navigate('/contact/write')
  }
  return (
    <div className="w-7xl mx-auto my-5">
      <div className="featured-title text-3xl font-bold my-3 flex justify-between">
        Contact <button className="btn btn-outline btn-primary" onClick={handleClick}>Write</button>
      </div>
      { !contacts.length && <div>포스가 없습니다</div>}
      {
        contacts.map(contact => (
          <div key={contact.id} className='my-5'>            
            <>
              <Link to={`/contacts/read/${contact.id}`}>
                <h1 className='text-3xl font-extrabold'>{contact.title}</h1>
                <p className='text-2xl my-2'>
                  <span>{stringToDate(contact.wr_date)}</span>
                  <span> &#47; </span>
                  <em className='mr-3 text-gray-400'>{contact.categories}</em>
                  {/* <span>{contact.categories.map(cate => (
                    <em className='mr-3 text-gray-400'>{cate}</em>
                  ))}</span> */}
                </p>
                <p>{contact.content}</p>
              </Link>
              <hr className='my-5 border-gray-300'/>
            </>
          </div>
        ))
      }
      <div className="flex justify-center">
        <div className="join">
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="1"
            checked="checked" readOnly
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="2"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="3"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="4"
          />
        </div>
      </div>
    </div>
  )
}

export default Contact