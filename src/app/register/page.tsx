'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../css/Register.css';
import Navbar from '../components/Navbar';

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};
const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useRouter().push;
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setErrorMsg("Username cannot be empty!");
      return false;
    }

    if (!formData.password.trim()) {
      setErrorMsg("Password cannot be empty!");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return false;
    }

    setErrorMsg('');
    return true;
  };

  const register = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newUser: User = {
      userName: formData.username,
      password: formData.password,
      userId: Math.floor(Math.random() * 10000), // Ensure unique userId
      isModerator: false 
    };

    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem('Users') || '[]') as User[];

    // Add the new user to the list
    users.push(newUser);

    // Save the updated list back to localStorage
    localStorage.setItem('Users', JSON.stringify(users));

    setShowModal(true);
  };

  return (
    <div>
      <Navbar/>
      <div className='Register-container'>
        <form onSubmit={register} className="register-form">
          <h1>Sign up</h1>
          <label>
            Username:
            <input type="text" name="username" autoComplete="on" onChange={handleInputChange} required />
          </label>
          <label>
            Password:
            <input type="password" name="password" autoComplete="off" onChange={handleInputChange} required />
          </label>
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" autoComplete="off" onChange={handleInputChange} required />
          </label>
          <input type="submit" value="Register" />
        </form>
        <div className='Error'>{errorMsg && <p>{errorMsg}</p>}</div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h1>Success!</h1>
              <p>Your account has been created.</p>
              <button onClick={() => {
                setShowModal(false);
                navigate('/login');
              }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;



// const Register: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     username: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [errorMsg, setErrorMsg] = useState('');
//   const navigate = useRouter().push;
//   const [showModal, setShowModal] = useState(false);

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

//     if (formData.password !== formData.confirmPassword) {
//       setErrorMsg("Passwords do not match!");
//       return false;
//     }

//     setErrorMsg('');
//     return true;
//   };

//   const register = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     const newUser: User = {
//         userName: formData.username,
//         password: formData.password,
//         userId: Math.floor(Math.random() * 10),
//         isModerator: false 
//       };

//     localStorage.setItem('User', JSON.stringify(newUser));
//     setShowModal(true);
//     navigate('/login');
//   };

//   return (
//     <div>
//     <Navbar/>
//     <div className='Register-container'>
//       <form onSubmit={register} className="register-form">
//         <h1>Sign up</h1>
//         <label>
//           Username:
//           <input type="username" name="username" autoComplete="on" onChange={handleInputChange} required />
//         </label>
//         <label>
//           Password:
//           <input type="password" name="password" autoComplete="off" onChange={handleInputChange} required />
//         </label>
//         <label>
//           Confirm Password:
//           <input type="password" name="confirmPassword" autoComplete="off" onChange={handleInputChange} required />
//         </label>
//         <input type="submit" value="Register" />
//       </form>
//       <div className='Error'>{errorMsg && <p>{errorMsg}</p>}</div>
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h1>Success!</h1>
//             <p>Your account has been created.</p>
//             <button onClick={() => {
//             setShowModal(false);
//             navigate ('/login');
//             }
//             }>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// }

// export default Register;