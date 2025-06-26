import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';


function SignupForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1 id='signuptitle'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label className='inputs'>
        
          <input
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          
          />
        </label>
        {errors.email && <p className='errormesg'>{errors.email}</p>}
        <label className='inputs'>
          
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
          />
        </label>
        {errors.username && <p className='errormesg'>{errors.username}</p>}
        <label className='inputs'>
          
          <input
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          
          />
        </label>
        {errors.firstName && <p className='errormesg'>{errors.firstName}</p>}
        <label className='inputs'>
          
          <input
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          
          />
        </label>
        {errors.lastName && <p className='errormesg'>{errors.lastName}</p>}
        <label className='inputs'>
          
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </label>
        {errors.password && <p className='errormesg'>{errors.password}</p>}
        <label className='inputs'>
          <input
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            
          />
        </label>
        {errors.confirmPassword && (
          <p className='errormesg'>{errors.confirmPassword}</p>
        )}
        <button id='submitbutton' type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupForm;