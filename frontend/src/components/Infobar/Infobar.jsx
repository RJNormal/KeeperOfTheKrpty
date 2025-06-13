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

    </nav>
  );
}

export default Navigation;