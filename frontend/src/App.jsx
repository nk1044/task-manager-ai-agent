import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './Components/Home';
import Task from './Components/Task';
import Agent from './Components/Agent';

const AppLayout = () => {
  return (
    <div className="app-container">
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {index: true, element: <Home />},
      {path: 'tasks/:id', element: <Task />},
      {path: 'agent', element: <Agent />}
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;