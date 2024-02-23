import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup/Signup';
import SignupSignin from './Signinup/SignupSignin';
import Signin from './Signin/Signin';
import Location from './Location/location';
import Main from './Main/Main';
import Post from './Post/Post';
function App() {
  return (
    <Router>
    <Routes> 
      <Route path="/" element={<SignupSignin />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/location' element={<Location/>}/>
      <Route path='/main' element={<Main/>}/>
      <Route path='/post' element={<Post/>}/>
    </Routes>
  </Router>
  // <Location />
  );
}

export default App;