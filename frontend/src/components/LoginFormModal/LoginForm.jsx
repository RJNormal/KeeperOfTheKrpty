import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function LoginForm() {

    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors({});
      return dispatch(sessionActions.login({ credential, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    };
  
    const demoLogin = () => {
      return dispatch(sessionActions.login({ credential: "JohnSmith", password: 'secret password' }));
    }
  
    return (
      <div className='loginForm'>
        <h1 id='loginheader'>Log In</h1>
        <form onSubmit={handleSubmit}>
          {errors.credential && <p className='errormesg'>{errors.credential}</p>}
          <label id='usernameinput'>
            <input
              placeholder='Username or Email'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </label>
          <label id='passwordinput'>
            <input
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button id="loginbutton" type="submit">Log In</button>
        </form>
        <button id="demologinbutton" onClick={demoLogin}>Demo User</button>
      </div>
    );
  }
  
  export default LoginForm;
  