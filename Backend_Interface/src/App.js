//Main Module Imports
import React, { Fragment, Component } from 'react';
import {
  BrowserRouter,
  Switch, 
  Route
} from "react-router-dom";
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

//Component Imports: 
import Nav from './Components/Nav';
import SideNav from './Components/SideNav_Components/SideNav'; 
import SearchForm from './Components/SearchForm_Components/SearchForm';
import Stat from './Components/Stat_Components/Stat';
import NewsDisplay from './Components/NewsDisplay_Components/NewsDisplay';  

//Key Variables: 

const backendURL = 'http://localhost:9000'

class App extends Component {
  constructor () {
    super(); 

    //States:
    this.state = {
      activeComponent : null, 
    }

    //Refs: 
    this.ref1 = React.createRef(); 
    this.ref2 = React.createRef(); 
    this.ref3 = React.createRef(); 
    this.ref4 = React.createRef(); 
    this.ref5 = React.createRef(); 
    this.ref6 = React.createRef(); 
    this.ref7 = React.createRef(); 
    this.ref8 = React.createRef();
    
    this.refCollection = [];  

    //Method Bindings:
    this.componentChange = this.componentChange.bind(this); 
    this.submitHandler = this.submitHandler.bind(this);  
  }


  componentDidUpdate () {
    this.refCollection = [this.ref1.current, 
                          this.ref2.current, 
                          this.ref3.current, 
                          this.ref4.current, 
                          this.ref5.current, 
                          this.ref6.current, 
                          this.ref7.current, 
                          this.ref8.current
                          ];
  }

  get initialState() {
    return {
      activeComponent: ''
    };
  }

  async componentChange(e) {
    const active = e.target.id; 
    await this.setState(this.initialState)
    this.setState((prevState) => ({
      activeComponent: prevState.activeComponent + active
    }))
  }

  submitHandler(e) {
    //Prevent Redirecting of page: 
    e.preventDefault(); 

    //Render Stat Component: 
    this.renderStat(); 

    //Collection of input Values: 
    const inputValues = this.assembleValues(this.refCollection) 

    //Sending to the backend: 
    this.sendValues(inputValues); 
  }

  async renderStat() {
    await this.setState(this.initialState); 
    this.setState((prevState) => ({
      activeComponent: prevState.activeComponent + 'Stat'
    })); 
  }

  assembleValues(refCollection) {
    const valueCollection = []; 
    refCollection.forEach((ref) => {
      const value = ref.value; 

      if (ref.checked) {
        valueCollection.push(ref.checked)
      } else {
        valueCollection.push(value); 
      }

    })
    return valueCollection;
  }

  sendValues(inputValues) {
    const postData = Object.assign({}, inputValues); 

    fetch(backendURL + '/tweetPost', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(postData)
    }); 
  }


  render() {
    const active = this.state.activeComponent;
    let activePart; 

    if (active === "SearchForm" || active === "Augment") {
      activePart = <Route exact to="/search" component={() => (<SearchForm
                                                                           submitHandler={this.submitHandler}
                                                                           ref1={this.ref1} 
                                                                           ref2={this.ref2}
                                                                           ref3={this.ref3} 
                                                                           ref4={this.ref4} 
                                                                           ref5={this.ref5}
                                                                           ref6={this.ref6}
                                                                           ref7={this.ref7}
                                                                           ref8={this.ref8}
                                                                           />)}/>  
    }
    else if (active === "Stat") {
      activePart = <Route exact to="/stat" component={() => (<Stat componentChange={this.componentChange} />)}/> 
    }

    else if (active === "NewsDisplay" || active === "ReadNews") {
      activePart = <Route exact to="/display" component={() => (<NewsDisplay />)}/>
    }

    if (active === "Intro" || active === null || active === "Home") {
      return (
        <BrowserRouter>
          <Fragment>
            <Nav componentChange={this.componentChange}/>
            <SideNav />
            <Switch>
              {activePart}          
            </Switch>
          </Fragment>    
        </BrowserRouter>
      )
    } else {
      return (
        <BrowserRouter>
          <Fragment>
            <Nav componentChange={this.componentChange}/>
            <Switch>
              {activePart}          
            </Switch>
          </Fragment>    
        </BrowserRouter>
        )
    }
  }
}


export default App;

//List of Issues to Resolve: 

  //1. Need to implement a waiting bar for the backend operation to process, before moving to the stats page. 

  //2. 