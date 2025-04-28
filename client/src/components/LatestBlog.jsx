import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios'
function LatestBlog({stringToDate}) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getBlogPosts = async () => {
      await axios
        .get('http://localhost:4000/blog/read')
        .then((response) => {
            setPosts(response.data.data)
            setIsLoading(false)
        })
        .catch((err) => console.error(err));
    };
    getBlogPosts();
  }, []);
  if (isLoading) {
    return (
      <div className="min-h-96 w-7xl mx-auto py-5 flex justify-center items-center">
        <p>로딩중...</p>
      </div>
    );
  }
  return (
    <section className="w-7xl mx-auto py-5">
      <div className="title-bar flex justify-between py-5 items-center">
        <h1 className="text-2xl">Recent Posts</h1>
        <Link to="/blog">view all</Link>
      </div>
      <ul className="flex gap-3">
        {posts.map((post) => (
          <li key={post.id} className="bg-white flex-1/2 p-3">
            <Link to={`/blog/post/${post.id}`}>
              <h1 className="text-3xl font-bold">{post.title}</h1>
              <p className="my-3">
                <span>{stringToDate(post.wr_date)}</span> &#124;{' '}
                <span className="text-gray-400">{post.categories}</span>
              </p>
              <p className="text-2xl">{post.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LatestBlog;
