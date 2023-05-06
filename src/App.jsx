import { useContext, useState } from 'react';
import OTP from './modals/OTP';
import { AuthContext } from './contexts/AuthContext';
import './App.css';

const App = () => {
  const [number, setNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const handleVerifyFunction = () => {
    const pattern = /^[6-9]{1}[0-9]{9}$/;
    if (!pattern.test(number)) {
      setMessage(
        'Please enter a valid phone number,which is ten digits long and starts with numbers between 6-9.'
      );
    } else {
      setPhone(number);
      setShowModal(true);
    }
  };
  const { setPhone } = useContext(AuthContext);
  return (
    <>
      <div className="app-container">
        <h1>Phone Verification</h1>
        <div>
          <label htmlFor="number">Enter your phone number:</label>
          <input
            id="number"
            type="number"
            minLength={10}
            maxLength={13}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <p>{message}</p>
          <button onClick={handleVerifyFunction}>Verify Phone</button>
        </div>
      </div>
      {showModal && (
        <div className="modal-container">
          <div className="modal">
            <OTP setShowModal={setShowModal} />
          </div>
        </div>
      )}
      This will display the modal in the center of the page with a
      semi-transparent black background. You can adjust the styles as needed to
      achieve your desired look.
    </>
  );
};

export default App;
