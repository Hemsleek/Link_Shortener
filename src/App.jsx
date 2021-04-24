import {useState, useRef} from 'react'
import './App.css';

function App() {
  const [shortLink, setShortLink] = useState({})
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN
  const urlOutput = useRef('')

  const shortenLink = (e) => {
      e.preventDefault()
      const longLink = e.target.urlInput.value

      fetch('https://api-ssl.bitly.com/v4/shorten',{
        method:'POST',
        headers:{
          'Authorization':`Bearer ${accessToken}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({'long_url':longLink,'domain':'bit.ly'})
      })
      .then(response => response.json()).then(data => {
        setShortLink(data)
        urlOutput.current = shortLink.link
      })
      .catch(console.log)
  }

  return (
    <div className="App">
      <form onSubmit={shortenLink} >
        <input type="text"
          placeholder='Enter Url Here'
          ref={urlOutput}
          name='urlInput'
          className='url-input'
        />
        <button type='submit'>Shorten Link</button>
      </form>
      <div className="display-area">
        <input type="text"
          placeholder="shorted Link"
          value={Object.keys(shortLink)? shortLink.link : ''}
          
          className='url-output'
          readOnly
        />
        <button className="copy-button">
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default App;
