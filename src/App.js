import './App.css';
import { useState } from 'react'
import axios from 'axios';

function App() {
  let [name, setName] = useState('')
  let [pin, setPin] = useState('')
  let [phone, setPhone] = useState('')
  let [age, setAge] = useState('')
  let [error, setError] = useState('')

  let validateInputs = () => {
    if (name === "" || !/^[a-zA-Z ]{2,30}$/.test(name)) {
      setError("Invalid name. Please recheck..")
      return false
    } else if (phone === "" || !/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(phone)) {
      setError("Invalid Phone number. Please recheck..")
      return false
    } else if (pin === "" || !new RegExp("^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$").test(pin)) {
      setError("Invalid pincode. Please recheck..")
      return false
    } else if (isNaN(age) || age < 18) {
      setError("You should be over 18 years old to register. Please recheck..")
      return false
    }
    setError('')
    return true
  }

  let handleUser = () => {
    if (validateInputs()) {
      axios.post('https://covovo.herokuapp.com/addUser', {
        "name": name,
        "phone": phone,
        "pin": pin,
        "age": age
      }).then(({data}) => {
        setError("Error" + data)
      }).catch((error) => {
        setError(JSON.stringify(error))
      })
    }
  }

  let isInvalid = false

  return (
    <div className="App">
        <div className="heading">Notify me when vaccine slots are available!</div>
        <input aria-label="Enter your name" className="input" type="text" placeholder="Name"
          onChange={({ target }) => setName(target.value)} />
        <input aria-label="Enter your phone" type="text" className="input" placeholder="Phone"
          onChange={({ target }) => setPhone(target.value)} />
        <input aria-label="Enter your pincode" type="text" className="input" placeholder="Pincode"
          onChange={({ target }) => setPin(target.value)} />
        <input aria-label="Enter your age" type="text" className="input" placeholder="Age"
          onChange={({ target }) => setAge(target.value)} />
        <button
          disabled={isInvalid}
          type="submit"
          onClick={handleUser}
          className="btn-primary"
        >
          Notify me!
        </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
