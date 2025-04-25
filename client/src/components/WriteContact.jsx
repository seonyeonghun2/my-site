import React from 'react';

function WriteContact() {
  return (
    <div className="w-7xl mx-auto my-5">
      <h2>Write Contact</h2>
      <form autoComplete="off">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-6xl min-w-96">
          <legend className="fieldset-legend">Contact details</legend>

          <label className="label">제목</label>
          <input type="text" className="input" placeholder="My awesome page" />

          <label className="label">내용</label>
          <input type="text" className="input" placeholder="my-awesome-page" />

          <label className="label">완료여부</label>
          <input type="text" className="input" placeholder="Name" />
          <label className="label">첨부파일</label>
          <input type="file" className="file-input file-input-primary" />
          <input type="file" className="file-input file-input-secondary" />
          <input type="file" className="file-input file-input-accent" />

          <button className="btn btn-neutral mt-4">등록</button>
        </fieldset>
      </form>
    </div>
  );
}

export default WriteContact;
