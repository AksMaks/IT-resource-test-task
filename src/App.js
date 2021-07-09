import './App.css';
import {Link, Route} from 'react-router-dom'

import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <div>
        <Link to={"/"}>Главная</Link>
        <Link to={"/Participants"}>Участники</Link>
        <Link to={"/Profile"}>Профиль</Link>
      </div>
      <Route exact path="/" render={ () => <Form/> }/>
      <Route path="/Participants" render={ () => <div>Участники</div> }/>
      <Route path="/Profile" render={ () => <div>Профиль</div> }/>
    </div>
  );
}

export default App;
