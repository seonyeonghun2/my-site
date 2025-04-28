import React from 'react';
import LatestWorks from '../components/LatestWorks';
function Works() {
  return (
    <div className="w-7xl mx-auto my-5">
      <LatestWorks />
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
  );
}

export default Works;
