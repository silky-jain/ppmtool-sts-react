import React, { Component } from 'react';

import './App.css';
import Dashboard from './components/Dashboard';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Header from './components/Layout/Header';
import AddProject from './components/Project/AddProject';
import {Provider} from 'react-redux';
import store from './store';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/Project/ProjectBoard';
import AddProjectTask from './components/ProjectTask/AddProjectTask';
import UpdateProjectTask from './components/ProjectTask/UpdateProjectTask';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
      <Header/>
    
      <Route path="/addprojects" component={AddProject}></Route>
      <Route exact path="/dashboard" component={Dashboard}></Route>
      <Route exact path="/updateProject/:id" component={UpdateProject}></Route>
      <Route exact path="/projectBoard/:id" component={ProjectBoard}></Route>
      <Route exact path="/addProjectTask" component={AddProjectTask}></Route>
      <Route exact path="/updateProjectTask/:projectSequence" component={UpdateProjectTask}></Route>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
