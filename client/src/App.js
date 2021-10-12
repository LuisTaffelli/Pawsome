import './App.css';
import {Route, Switch} from 'react-router-dom';
import Main from './Components/Main-Page/Main.js';
import Home from './Components/Home-Page/Home.jsx';
import NavigationBar from "./Components/Dogs-Routes/Navigation-Bar.js";
import Form from "./Components/Form-Page/Form.js";
import DogCards from "./Components/Cards/DogCards.js"



function App(props) {


  //Routes personalizados
  const DogRoute = (props) => {
    const directory = props.location.pathname.split('/')
    return (<Route {...props}>
      <NavigationBar />
      <DogCards 
      dir= {directory[directory.length-1]} 
      />
    </Route>)
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path= '/'>
          <Main />
        </Route>
        <Route exact path= '/home'>
          <Home />
        </Route>
        <Route exact path= '/create'>
          <NavigationBar />
          <Form />
        </Route>
        <DogRoute path= '/:id'/>
      </Switch>
    </div>
  );
}

export default App;
