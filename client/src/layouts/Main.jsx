import React from 'react';
import About from '../components/About'
import LatestBlog from '../components/LatestBlog'
import LatestWorks from '../components/LatestWorks'
function Main() {
  return (
    <main>
      <div className="w-7xl mx-auto my-5">
        <About />
      </div>
      <div className="bg-blue-100">
        <LatestBlog />
      </div>
      <div className="w-7xl mx-auto my-5">
        <LatestWorks />
      </div>
    </main>
  );
}

export default Main;
