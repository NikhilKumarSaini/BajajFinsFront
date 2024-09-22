import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const res = await fetch('https://bajajfins-6d9ab5b09144.herokuapp.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <p>Alphabets: {response.alphabets.join(', ')}</p>
        )}
        {selectedOptions.includes('Numbers') && (
          <p>Numbers: {response.numbers.join(', ')}</p>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <p>Highest lowercase alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <h2>Select options to display:</h2>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.includes('Alphabets')}
              onChange={() => handleOptionChange('Alphabets')}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.includes('Numbers')}
              onChange={() => handleOptionChange('Numbers')}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.includes('Highest lowercase alphabet')}
              onChange={() => handleOptionChange('Highest lowercase alphabet')}
            />
            Highest lowercase alphabet
          </label>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;