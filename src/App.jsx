import {useState, useRef } from 'react'
import './App.css';

function App() {
  const [shortLink, setShortLink] = useState({})
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN
  const outputLink = useRef('')

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
      })
      .catch(console.log)
  }

  const handleCopy = () => {
    if(navigator.clipboard){
      navigator.clipboard.writeText(outputLink.current.innerText)
        .then(console.log,console.log)
    }
  }
  return (
    <div className="App">
      <form onSubmit={shortenLink} >
        <input type="text"
          placeholder='Enter Url Here'
          name='urlInput'
          className='url-input'
        />
        <button type='submit'>Shorten Link</button>
      </form>
      <div className="display-area">
        <span className="url-output" ref={outputLink}>
          { Object.keys(shortLink).length? shortLink.link : 'Short Link' }
          
        </span>
        
        <button onClick={handleCopy} className="copy-button">
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default App;
