// App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  console.log("Authenticated:", authenticated);

  return (
    <div>
      {/* Other components or layout */}

      <Routes>
        {/* Redirect to /login if not authenticated */}
        <Route
          path="/"
          element={<Login setAuthenticated={setAuthenticated} />}
        />
        {/* Add other routes for authenticated users */}
        <Route
          path="/home"
          element={authenticated ? <Home setAuthenticated={setAuthenticated} /> : <Navigate to="/" />}
        />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}



export default App;
