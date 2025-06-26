import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Infobar.css';



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navbar">
      <div id='homelink'>
        <NavLink to="/">
          <img id='imglink' src='/2407507.png'></img>
        </NavLink>
      </div>

      <div id='profile'>

        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>
    </nav>
  );
}

export default Navigation;