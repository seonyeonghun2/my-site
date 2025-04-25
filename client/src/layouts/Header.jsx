import React from 'react'
import { NavLink, Link} from 'react-router';
function Header({handleLogout, isSignin}) {
  return (
    <header>
        {/* daisyui > components > Navigation > Navbar */}
        <div className="bg-base-100 shadow-sm">
          <div className='navbar w-7xl mx-auto justify-end'>
            <div className="flex gap-2 items-center">
              {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
              <nav>
                <ul className="flex gap-2 capitalize">
                  <li>
                    <NavLink to="/">home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/works">works</NavLink>
                  </li>
                  <li>
                    <NavLink to="/blog">blog</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">contact</NavLink>
                  </li>
                </ul>
              </nav>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  {isSignin && <li>
                    <Link className="justify-between">
                      대시보드
                      <span className="badge">준비중</span>
                    </Link>
                  </li>}
                  { isSignin ? (<>
                    <li>
                    <Link to='/modify'>정보수정</Link>
                  </li>
                  <li>
                    <span onClick={handleLogout}>로그아웃</span>
                  </li>
                  </>):(
                    <>
                    <li>
                    <Link to='/signup'>회원가입</Link>
                  </li>
                  <li>
                    <Link to='/signin'>로그인</Link>
                  </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header