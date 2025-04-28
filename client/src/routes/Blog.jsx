import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router'

function Blog() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const getBlogPosts = () => {
      axios.get("http://localhost:4000/blog/read").then((response) => {
        // 오름차순
        setPosts(response.data.data)
        // 내림차순
        // setPosts(response.data.data.sort((a,b) => b - a))
        setIsLoading(false)
      }).catch((err) => {
        console.log(err)
      })
    }
    getBlogPosts();
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
    navigate('/blog/write')
  }
  return (
    <div className="w-7xl mx-auto my-5">
      <div className="featured-title text-3xl font-bold my-3 flex justify-between">
        Blog <button className="btn btn-outline btn-primary" onClick={handleClick}>Write</button>
      </div>
      {
        posts.map(post => (
          <div key={post.id} className='my-5'>            
            <>
              <Link to={`/blog/post/${post.id}`}>
                <h1 className='text-3xl font-extrabold'>{post.title}</h1>
                <p className='text-2xl my-2'>
                  <span>{stringToDate(post.wr_date)}</span>
                  <span> &#47; </span>
                  <em className='mr-3 text-gray-400'>{post.categories}</em>
                  {/* <span>{post.categories.map(cate => (
                    <em className='mr-3 text-gray-400'>{cate}</em>
                  ))}</span> */}
                </p>
                <p>{post.content}</p>
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

export default Blog