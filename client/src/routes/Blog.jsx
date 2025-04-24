import {useEffect, useState} from 'react'
import axios from 'axios'
function Blog() {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const getBlogPosts = () => {
      axios.get("http://localhost:4000/blog/read").then((response) => {
        setPosts(response.data.data)
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
  return (
    <div>
      {
        posts.map(post => (
          <div key={post.id} className='my-5'>
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
            <hr className='my-5 border-gray-300'/>
          </div>
        ))
      }
    </div>
  )
}

export default Blog