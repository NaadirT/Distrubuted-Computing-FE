import React, { useState } from 'react';
import './styles.css';

function App() {
  const [inputHash, setInputHash] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/checkPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputHash, algorithm })
      });

      const data = await response.text();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="loading"></div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Input hash here:</label>
        <textarea value={inputHash} onChange={(e) => setInputHash(e.target.value)} rows="4" cols="50"></textarea>
        <label htmlFor="hash-algos">Choose a hash algos:</label>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} name="algorithm" id="algorithm">
          <option value="">Select an algorithm</option>
          <option value="MD5">MD5</option>
          <option value="SHA1">SHA1</option>
          <option value="SHA2">SHA2</option>
          <option value="SHA256">SHA256</option>
          <option value="NTLM">NTLM</option>
          <option value="LANMAN">LANMAN</option>
        </select>
        <button type="submit">Submit!</button>
      </form>
      <div id="result">{result}</div> {/* Empty div to display result */}
    </div>
  );
}

export default App;
