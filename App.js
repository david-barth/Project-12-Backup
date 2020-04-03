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
import ErrorPart from './Components/ErrorPart'; 
import SearchForm from './Components/SearchForm_Components/SearchForm';
import LoadingBar from './Components/LoadingBar'
import Stat from './Components/Stat_Components/Stat';
import NewsDisplay from './Components/NewsDisplay_Components/NewsDisplay';  

//Key Variables: 
const initial = 'http://localhost:9000/tweetPost'
const augment = 'http://localhost:9000/tweetAugment'
const newSearch = 'http://localhost:9000/newSearch'



//App Class Declaration: 
class App extends Component {
  constructor () {
    super(); 

    //States:
    this.state = {
      activeComponent : null,
      articleInfo: null,
      statusCode: 0,  
      message: '',
      tweetCount: 0, 
      tweetSearch: 0, 
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
    this.submitHandler1 = this.submitHandler1.bind(this);  
    this.submitHandler2 = this.submitHandler2.bind(this);  
    this.formatNews = this.formatNews.bind(this); 
    this.getNews = this.getNews.bind(this);
    this.prepareStats = this.prepareStats.bind(this);
    this.newSearch = this.newSearch.bind(this); 
  }

  componentDidUpdate () {
    this.refCollection = [
      this.ref1.current, 
      this.ref2.current, 
      this.ref3.current, 
      this.ref4.current, 
      this.ref5.current, 
      this.ref6.current, 
      this.ref7.current, 
      this.ref8.current,  
      ];
  }


  get initialState() {
    return {
      activeComponent: ''
    };
  }


  prepareStats() {
    let rec; 

    if (this.state.tweetCount < 50) {
      rec = 'Redo search with augment!'; 
    } 
    else if (this.state.tweetCount >= 50) {
      rec = 'Click "Read"! There are enough tweets.'; 
    }

    let stats = {
      tweetCount: this.state.tweetCount, 
      tweetSearch: this.state.tweetSearch, 
      rec: rec,  
    }

    return stats; 
  }

  

  async getNews(e) {
    const button = e.target.id; 
    
    if (button === 'ReadNews') {
        //Render Loading Bar:
        this.renderBar();

        //Fetch news articles from backend and format from json: 
        const response = await fetch('http://localhost:9000/getNews'); 
        const newsArticles = await response.json(); 
        
        if (newsArticles.code === 200) {
          //Format news response set to new object and set state and reset tweet statistics: 
            const formatted = this.formatNews(newsArticles.response); 
            await this.setState({ articleInfo: formatted, 
                                  activeComponent: '', 
                                  tweetCount: 0, 
                                  tweetSearch: 0
                                });
            

            //Render NewsDisplay:
            this.setState({activeComponent: button})    
        } 
        
        else if (newsArticles.code === 500) {
          await this.setState({activeComponent: 'Error',
                                tweetSearch: 0})       
        }
        
    }
}

formatNews(newsArticles) {
    let container = [];
    for (let article in newsArticles) {
        let articleInfo = {};
        let newsObject = newsArticles[article];  
        articleInfo.title = newsObject.webTitle; 
        articleInfo.section = newsObject.sectionName; 
        articleInfo.url = newsObject.webUrl; 
        articleInfo.date = newsObject.webPublicationDate; 
        container.push(articleInfo); 
    }

    return container
} 


  async componentChange(e) {
    const active = e.target.id || e;
    await this.setState(this.initialState)
    this.setState((prevState) => ({
      activeComponent: prevState.activeComponent + active
    }))
  }

  async renderBar() {
    await this.setState(this.initialState)
    this.setState((prevState) => ({
      activeComponent: prevState.activeComponent + 'Loading'
    }))
  }

  submitHandler1(e) {
    //Prevent Redirecting of page: 
    e.preventDefault(); 

    //Render loading bar until backend signal comes: 
    this.renderBar(); 

    //Collection of input Values: 
    const inputValues = this.assembleValues(this.refCollection) 

    //Sending to the backend: 
    this.sendValues(inputValues, initial); 
  }

  submitHandler2(e) {
    //Prevent Redirecting of page: 
    e.preventDefault(); 

    //Render loading bar until backend signal comes: 
    this.renderBar(); 

    //Collection of input Values: 
    const inputValues = this.assembleValues(this.refCollection) 

    //Sending to the backend: 
    this.sendValues(inputValues, augment); 
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

  async sendValues(inputValues, endpoint) {
    const postData = Object.assign({}, inputValues); 
    const fetchRequest = await fetch(endpoint, 
      {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
    
    const response = await fetchRequest.json();  
    
    if (response.tweetCount === undefined) {
      response.tweetCount = 0; 
    }

    
    this.setState((prevState) => 
      ({tweetCount: prevState.tweetCount + response.tweetCount, 
        tweetSearch: prevState.tweetSearch + 1}));

    if(response.code === 200) {
      this.renderStat(); 

    } else {
      await this.setState({activeComponent: 'Error', message: response.message, statusCode: response.code})
    }
  }

  async newSearch() {
    const fetchRequest = await fetch(newSearch); 
    const response = await fetchRequest.json(); 

    if (response.code === 200) {
        await this.setState({tweetCount: 0, tweetSearch: 0});
    } else {
        await this.setState({activeComponent: 'Error', message: response.message, statusCode: response.code})
    }
  }

  render() {
    const active = this.state.activeComponent;
    let activePart;
  
    if (active === "SearchForm" || active === "SearchFormError") {
      activePart = <Route exact to="/search" component={() => (<SearchForm
                                                                           submitHandler={this.submitHandler1}
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

    else if (active === "Augment" || active =="AugmentError") {
      activePart = <Route exact to="/search" component={() => (<SearchForm
                                                                          submitHandler={this.submitHandler2}
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

    else if (active === 'Error') {
      activePart = <ErrorPart 
                              statusCode={this.state.statusCode} 
                              message={this.state.message} 
                              tweetSearch={this.state.tweetSearch}
                              tweetCount={this.state.tweetCount}
                              componentChange={this.componentChange}
                              /> 
    }

    else if (active === 'Loading') {
      activePart = <LoadingBar />      
    }

    else if (active === "Stat") {
      activePart = <Route exact to="/stat" component={() => (<Stat 
                                                                  stats={this.prepareStats()} 
                                                                  getNews={this.getNews} 
                                                                  componentChange={this.componentChange} 
                                                                  />)}/> 
    }

    else if (active === "NewsDisplay" || active === "ReadNews") {
      activePart = <Route exact to="/display" component={() => (<NewsDisplay articleInfo={this.state.articleInfo} />)}/>
    }

    if (active === "Intro" || active === null || active === "Home" || active === 'nav') {
      return (
        <BrowserRouter>
          <Fragment>
            <Nav newSearch={this.newSearch} componentChange={this.componentChange}/>
            <SideNav />
          </Fragment>    
        </BrowserRouter>
      )
    } else {
      return (
        <BrowserRouter>
          <Fragment>
            <Nav newSearch={this.newSearch} componentChange={this.componentChange}/>
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

//Continuation:  

    //2. Implement error handling and controls: 
    
        //Implement the getNews error handlings. 

    //3. Add comments to all major portions of the code and eliminate all redundant unused pieces of code.  

    //4. Ensure that the package.json file contains all the necessary dependencies. 

    //5. Host the web app on a hosting service. 