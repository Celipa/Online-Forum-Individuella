import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../css/Navbar.css';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('User');
    localStorage.removeItem('token');
    setUser(null);
    console.log('Logged out');
    setShowModal(true);
  };

  return (
    <div className='Navbar-base'>
      <div className='Navbar'>
      {user ? (
            <>
              <div className='Navbar-Buttons2'>
              <span className='Username'>{user.userName}</span>
              <button className='Logout' onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <div className='Navbar-Buttons'>
              <button className='Login-btn'onClick={() => router.push('/login')}>Login</button>
              <button className='Register-btn'onClick={() => router.push('/register')}>Register</button>
              </div>
            </>
          )}
        </div>
        <button className='Home-btn' onClick={() => router.push('/')}>Home</button>
        <img className="Chatlogo" src='/Chatlogo.png' onClick={() => router.push('/')} />
        {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h1>You have been logged out.</h1>
            <button onClick={() => {
            setShowModal(false);
            router.push('/login');
            }
            }>Close</button>
          </div>
        </div>
      )}
      </div>
  );
};

export default Navbar;