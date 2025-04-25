import {useState, useEffect} from 'react';
import { Outlet } from 'react-router';
import jsCookie from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

function Home() {
  const [isSignin, setIsSignIn] = useState(false)
  useEffect(() => {
    const cookie = jsCookie.get('auth_token')   
    if (cookie) {
      const decode = jwtDecode(cookie)
      setIsSignIn(true) // true와 같은 결과
    }
  }, [])
    const handleLogout = () => {
      jsCookie.remove("auth_token")
      setIsSignIn(false) 
    }
  return (
    <>
      <Header handleLogout={handleLogout} isSignin={isSignin} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Home;
