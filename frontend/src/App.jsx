import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter,RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Infobar/Infobar';
import * as sessionActions from './store/session'
import CreateCharacter from './components/Characters/CharacterCreation';
import HomePage from './components/Home Page/HomePage';
import CharacterDetail from './components/Characters/CharacterDetailsPage';


function Layout() {
const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/characters/new',
        element: <CreateCharacter/>
      },
      {
        path: '/characters/:id',
        element: <CharacterDetail />
      }
         ]
  }
]);


function App() {
  return <RouterProvider router={router} />;
}


export default App;
