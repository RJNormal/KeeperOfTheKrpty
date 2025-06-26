import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LoginForm from '../LoginFormModal';
import SignupForm from '../SignupFormModal'; 
import { getAllCharactersThunk } from '../../store/characters'; 
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const characters = useSelector((state) => state.characters.userCharacters);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getAllCharactersThunk());
    }
  }, [dispatch, sessionUser]);

  if (!sessionUser) {
    return (
      <div className="home-logged-out">
        <h2>Welcome to Keeper of the Krypt</h2>
        <div className="auth-forms-container">
          <div className="loginForm">
            <LoginForm />
          </div>
          <div className="signupForm">
            <SignupForm />
          </div>
        </div>
      </div>
    );
  }

  if (characters && characters.length > 0) {
    return (
      <div className="home-logged-in">
        <h2>Your Characters</h2>
        <ul>
          {characters.map((char) => (
            <li key={char.id}>
              <strong>{char.name}</strong> - {char.className} ({char.race})
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="home-no-characters">
      <h2>You have no characters yet</h2>
      <button onClick={() => navigate('/characters/new')}>
        Create Your First Character
      </button>
    </div>
  );
}

export default HomePage;