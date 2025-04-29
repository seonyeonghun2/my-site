import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import jsCookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
function ViewPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const params = useParams(); // object

  useEffect(() => {
    const token = jsCookies.get('auth_token');
    const decoded = jwtDecode(token);
    // 관리자가 user3 이라면, isAdmin을 true 처리
    setIsAdmin(true);
    // 1.post 1개를 서버에 요청하는 함수
    function getPost() {
      axios
        .get(`http://localhost:4000/blog/post/${parseInt(params.postId)}`)
        .then((response) => {
          setPost(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // 2.함수를 호출(=실행)
    getPost();
  }, []);

  if (isLoading) {
    return <div>로딩중..</div>;
  }
  function stringToDate(dateString) {
    const date = new Date(dateString)
      .toLocaleDateString()
      .split('.')
      .join('/')
      .replaceAll(' ', '')
      .substring(0, 9);
    return date;
  }
  const handleClick = () => {
    navigate('/');
  };
  const handleRemove = async () => {
    console.log(post.id)
    await axios
      .delete(`http://localhost:4000/blog/delete/${post.id}`)
      .then((response) => response.data.data ? navigate("/blog"): null)
      .catch((err) => console.error(err));
  };
  return (
    <div className="min-w-96 mx-auto mb-5 md:w-5xl lg:w-7xl">
      <h1 className="text-3xl font-bold my-5">Blog</h1>
      <section>
        <div>
          <span className="badge badge-soft badge-primary">제목</span>
          <span>{post.title}</span>
        </div>
        <div>
          <span className="badge badge-soft badge-primary">작성자</span>
          <span>{post.wr_id}</span>
        </div>
        <div>
          <span className="badge badge-soft badge-primary">작성일</span>
          <span>{stringToDate(post.wr_date)}</span>
        </div>
        <div>
          <span className="badge badge-soft badge-primary">카테고리</span>
          <span>{post.categories}</span>
        </div>
        <div>
          <span className="badge badge-soft badge-primary">내용</span>
          <span>{post.content}</span>
        </div>
      </section>
      <div className="flex justify-end gap-3">
        <button className="btn btn-soft" onClick={handleClick}>
          목록보기
        </button>
        {isAdmin && (
          <>
            <button className="btn btn-warning" onClick={handleClick}>
              수정하기
            </button>
            <button className="btn btn-error" onClick={handleRemove}>
              삭제하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ViewPost;
