import React from 'react';
import { useNavigate } from 'react-router'
function LatestWorkItem({ lists, listType }) {
  const navigate = useNavigate();
  if (lists.length < 1) {
    return <div>데이터가 없습니다</div>;
  }
  const handleClick = () => {
    navigate('/works/write')
  }
  function stringToDate(dateString){
    const date = new Date(dateString).toLocaleDateString().split('.').join('/').replaceAll(" ", "").substring(0, 9)
    return date
  }
  return (
    <>
      <div className="featured-title text-3xl font-bold my-3 flex justify-between">
        {listType ? "Featured Works" : "Work"} <button className="btn btn-outline btn-primary" onClick={handleClick}>Write</button>
      </div>
      <div className="featured-body">
        {lists &&
          lists.map((list) => (
            <div key={list.work_id}>
              <div className="featured-work flex gap-5">
                <div className="work-image">
                  <img
                    src={`http://localhost:4000/${list.file_name}`}
                    className="max-w-sm rounded-lg shadow-2xl"
                  />
                </div>
                <div className="work-desc">
                  <h2 className="desc-title text-3xl mb-3">{list.title}</h2>
                  <div className="badge badge-primary mr-2">
                    {stringToDate(list.created_at)}
                  </div>
                  <span className="badge badge-accent mr-2">{list.is_active ? "Done":"In process"}</span>
                  {/* <span className="text-gray-400">dashboard</span> */}
                  <p className="mt-3">{list.description}</p>
                </div>
              </div>
              <hr className="my-5 border-gray-200" />
            </div>
          ))}
      </div>
    </>
  );
}

export default LatestWorkItem;
