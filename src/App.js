import './App.css';
import { useState } from 'react'
import axios from 'axios';

function App() {
  let [name, setName] = useState('')
  let [pin, setPin] = useState('')
  let [phone, setPhone] = useState('')
  let [age, setAge] = useState('')
  let [error, setError] = useState('')
  let [message, setMessage] = useState('')
  let [enabled, setEnabled] = useState(true)

  let validateInputs = () => {
    if (name === "" || !/^[a-zA-Z ]{2,30}$/.test(name)) {
      setError("Invalid name. Please recheck..")
      return false
    } else if (phone === "" || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(phone)) {
      setError("Invalid Email address. Please recheck..")
      return false
    } else if (pin === "" || !new RegExp("^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$").test(pin)) {
      setError("Invalid pincode. Please recheck..")
      return false
    } else if (isNaN(age) || (age < 18 || age > 130)) {
      setError("You should be over 18 years old to register. Please recheck..")
      return false
    }
    setError('')
    return true
  }

  let handleUser = () => {
    setEnabled(false)
    if (validateInputs()) {
      axios.post('https://covovo.herokuapp.com/addUser', {
        "name": name,
        "phone": phone,
        "pin": pin,
        "age": age
      }).then(({data}) => {
        if (data.error) {
          setError("Seems like you already registered. We will keep you posted!")
          setEnabled(true)
        } else {
          setMessage("Thanks for registering! We will send you a message when slots are available!")
          setError('')
          setEnabled(true)
        }
      }).catch(({error}) => {
        setError("Some error occured on our servers.. Please try again later")
        setMessage('')
        setEnabled(true)
      })
    } else {
      setEnabled(true)
    }
  }

  return (
    <div className="App">
      <div className="heading">Get notified when vaccination slots are available!</div>
      <div className="container">
      <div className="image">
        <img src = "taxi-657.png" className="doctor"/>
      </div>
      <div className="flex">
        <input aria-label="Enter your name" className="input" type="text" placeholder="Name"
          onChange={({ target }) => setName(target.value)} />
        <input aria-label="Enter your email" type="text" className="input" placeholder="Email"
          onChange={({ target }) => setPhone(target.value)} />
        <input aria-label="Enter your pincode" type="text" className="input" placeholder="Pincode"
          onChange={({ target }) => setPin(target.value)} />
        <input aria-label="Enter your age" type="text" className="input" placeholder="Age"
          onChange={({ target }) => setAge(target.value)} />
        <button
          disabled={!enabled}
          type="submit"
          onClick={handleUser}
          className={`btn-primary ${!enabled && `disabled`}`}
        >
          Notify me!
        </button>
        {error && <div className="error">{error}</div>}
        {message && <div className="message">{message}</div>}
      </div>
      </div>
      <div className="credits">
          <div>It's open source. Please feel free to check out at <a href="https://github.com/karaarora/covac-client">Github</a></div>
          <div>Illustration by <a href="https://icons8.com/illustrations/author/5c3c1a17569980000ee8cf05">Aleksey Chizhikov</a> from <a href="https://icons8.com/illustrations">Ouch!</a></div>
        </div>
    </div>
  );
}

export default App;
