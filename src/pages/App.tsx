import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

/**
 * @description
 * 
 * restricted scenario; redirect to sign-up page
 */
const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/sign-up");
  }, [navigate]);

  return (
    <div>
      {/* ... */}
    </div>
  )
}

export default App