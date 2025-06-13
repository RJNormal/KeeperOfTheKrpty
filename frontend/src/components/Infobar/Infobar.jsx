import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navbar">
      <div id='homelink'>
        <NavLink to="/">
          <img id='imglink' src='insert.jpg'></img>
          <p>Keeper of The Krypt</p>
        </NavLink>
      </div>

      <div id='profile'>
      <div id='newspotform'>
        {sessionUser && (
          <NavLink to='/spots/new'>
        <p id='newspotform'>Creat a New Spot</p>
      </NavLink>

        )}
      </div>
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>
    </nav>
  );
}

export default Navigation;