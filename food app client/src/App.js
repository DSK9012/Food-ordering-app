import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './MyComponents/MainComponent';
import {Provider} from 'react-redux';
import {ConfigureStore} from './Redux/ConfigureStore';
import './App.css';



class App extends React.Component{

  render(){
    return(
      <React.Fragment>
        <Provider store={ConfigureStore()} >
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </Provider>
    </React.Fragment>
    );
  };
}
export default App;
