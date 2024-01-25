import React, { useState } from 'react';
import axios from 'axios';

// Set base URL for Axios requests
axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.post('/api/test');
      console.log(response);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
