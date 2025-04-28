import React from 'react';
import About from '../components/About'
import LatestBlog from '../components/LatestBlog'
import LatestWorks from '../components/LatestWorks'
function Main() {
  function stringToDate(dateString){
    const date = new Date(dateString).toLocaleDateString().split('.').join('/').replaceAll(" ", "").substring(0, 9)
    return date
  }
  return (
    <main>
      <div className="w-7xl mx-auto my-5">
        <About />
      </div>
      <div className="bg-blue-100">
        <LatestBlog stringToDate={stringToDate} />
      </div>
      <div className="w-7xl mx-auto my-5">
        <LatestWorks stringToDate={stringToDate} />
      </div>
    </main>
  );
}

export default Main;
