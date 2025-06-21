import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
//import './ProfileButton.css'
import { NavLink, useNavigate } from 'react-router-dom';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden")+(user ? " dropdownloggedin" : " dropdownloggedout");

  return (
    <>
      <button id='NavButton' onClick={toggleMenu}>
        <FaBars />
        <FaUserCircle />
        
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p className='loginptag'>Hello, {user.firstName}</p>
            <p className='loginptag'>{user.email}</p>
            <NavLink id='managespotslink' to='/spots/current'>Manage Spots</NavLink>
            <>
              <button id='logout' onClick={logout}>Log Out</button>
            </>
          </>
        ) : (
          <div id='modalmenu'>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
                />
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;