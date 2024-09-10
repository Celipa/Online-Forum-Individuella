'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../css/Login.css';
import Navbar from '../components/Navbar';

type FormData = {
  username: string;
  password: string;
};
const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useRouter().push;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const validateForm = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      setErrorMsg("Username and password cannot be empty!");
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem('Users') || '[]') as User[];

    // Find the user with matching credentials
    const user = users.find(u => u.userName === formData.username && u.password === formData.password);

    if (user) {
      // Set the logged-in user in localStorage
      localStorage.setItem('User', JSON.stringify(user));
      navigate('/');
    } else {
      setErrorMsg("Invalid username or password!");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className='Login-container'>
        <form onSubmit={login} className="login-form">
          <h1>Login</h1>
          <label>
            Username:
            <input type="text" name="username" autoComplete="on" onChange={handleInputChange} required />
          </label>
          <label>
            Password:
            <input type="password" name="password" autoComplete="off" onChange={handleInputChange} required />
          </label>
          <input type="submit" value="Login" />
        </form>
        <div className='Error'>{errorMsg && <p>{errorMsg}</p>}</div>
      </div>
    </div>
  );
}

export default Login;


// const Login = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState<FormData>({
//     username: '',
//     password: ''
//   });
//   const [errorMsg, setErrorMsg] = useState('');

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value
//     });
//   };

//   const validateForm = () => {
//     if (!formData.username.trim()) {
//       setErrorMsg("Username cannot be empty!");
//       return false;
//     }

//     if (!formData.password.trim()) {
//       setErrorMsg("Password cannot be empty!");
//       return false;
//     }

//     setErrorMsg('');
//     return true;
//   };

//   const login = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     const storedUser = JSON.parse(localStorage.getItem('User') || 'null');
//     if (storedUser && storedUser.userName === formData.username && storedUser.password === formData.password) {
//       localStorage.setItem('token', 'dummy-token');
//       alert('You are now logged in!');
//       router.push('/');
//     } else {
//       setErrorMsg('Invalid username or password!');
//     }
    
//   };

//   return (
//     <div>
//       <Navbar />
//     <div className='Login'>
//       <form onSubmit={login} className="login-form">
//         <h1>Log in</h1>
//         <label>
//           Username:
//           <input type="text" name="username" autoComplete="on" onChange={handleInputChange} required />
//         </label>
//         <label>
//           Password:
//           <input type="password" name="password" autoComplete="off" onChange={handleInputChange} required />
//         </label>
//         <input type="submit" value="Log in" />
//         {errorMsg && <p className="error">{errorMsg}</p>}
//         <div>
//           <li>Don't have an account?</li>
//           <button onClick={() => router.push('/register')}>Register</button>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
//   console.log(errorMsg);
// };

// export default Login;