import {useState} from 'react'
import {Link} from 'react-router'
function LatestBlog() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Making a design system from scratch",
            content: "첫번째 블로그 post 입니다",
            categories: 'daily',
            wr_id: "user3",
            wr_date: "2025-04-24"
        },
        {
            id: 2,
            title: "두번째 post 입니다.",
            content: "두번째 블로그 post 입니다",
            categories: 'daily',
            wr_id: "user3",
            wr_date: "2025-04-24"
        }
    ])
    // axios.get("http://localhost:4000/blog/latest")
  return (
    <section className="w-7xl mx-auto py-5">
        <div className="title-bar flex justify-between py-5 items-center">
            <h1 className='text-2xl'>Recent Posts</h1>
            <Link to='/blog/post/read'>view all</Link>
        </div>
        <ul className='flex gap-3'>
            {posts.map(post => (
                <li key={post.id} className='bg-white flex-1/2 p-3'>
                    <Link to={`/blog/post/${post.id}`}>
                        <h1 className="text-3xl font-bold">{post.title}</h1>
                        <p className='my-3'>
                            <span>{post.wr_date}</span> &#124; <span className="text-gray-400">{post.categories}</span>
                        </p>
                        <p className='text-2xl'>{post.content}</p>
                    </Link>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default LatestBlog