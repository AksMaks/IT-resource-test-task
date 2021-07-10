import './App.css';
import {Link, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from './components/Main/Form';
import People from './components/People/People.js';
import Profile from './components/Profile/Profile.js';

function App() {
  return (
    <div className="App">
      <div className={"navbar nav"}>
        <Link to={"/"} className="nav-item">Главная</Link>
        <Link to={"/Participants"} className="nav-item">Участники</Link>
        <Link to={"/Profile"} className="nav-item">Профиль</Link>
      </div>
      <Route exact path="/" render={ () => <Form/> }/>
      <Route path="/Participants" render={ () => <People/> }/>
      <Route path="/Profile" render={ () => <Profile/> }/>
    </div>
  );
}

export default App;
