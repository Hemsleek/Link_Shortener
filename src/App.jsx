import './App.css';

function App() {
  return (
    <div className="App">
      <form >
        <input type="text"
          placeholder='Enter Url Here'
          className='url-input'
        />
        <button>Shorten Link</button>
      </form>
      <div className="display-area">
        <input type="text"
          placeholder="shorted Link"
          className='url-output'
        />
        <button className="copy-button">
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default App;
