import React, {Fragment, Component} from 'react';
import {NavLink} from "react-router-dom";
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';

//Component Imports: 
import Article from './Article'; 


class NewsDisplay extends Component {

    constructor() {
        super(); 

        //States: 
        this.state = {
            selectedArticle: 1 
        }

        //Refs: 
        this.ref1 = React.createRef(); 
        this.ref2 = React.createRef(); 
        this.ref3 = React.createRef(); 

        //Other Properties
        this.articleCount = [1, 2, 3];
        
        //Function Bindings: 
        this.selectArticle = this.selectArticle.bind(this); 
    }


    async selectArticle(e) {
        const selected = e.target.id; 
        await this.setState({selectedArticle: selected}); 
    }



    render() {

        if (this.props.articleInfo === null) {
            return (
                <Fragment>
                    <div className="row">
                        <header>No News Loaded! Please do a tweet search in "Tweet Selection" and an analysis in "Tweet Statistics"</header>
                    </div>
                </Fragment>
            )
        }
        
        else if (this.props.articleInfo) {
            const selectionNumber = this.state.selectedArticle;
            const articles = this.articleCount.map(recNum => {
                const recString = recNum.toString();  
                return <Article id={recString} articleNum={selectionNumber} articleInfo={this.props.articleInfo[selectionNumber - 1]}/>
            });  
            let activeArticle = articles[selectionNumber - 1];

            return (
                <Fragment>
                    <div className="row">
                        <ul className="pagination center bottom">
                            <li className="waves-effect" ><NavLink  onClick={this.selectArticle} exact to="/1" id="1" className="waves-effect">1</NavLink></li>
                            <li className="waves-effect" ><NavLink  onClick={this.selectArticle} exact to="/2" id="2" className="waves-effect">2</NavLink></li>
                            <li className="waves-effect" ><NavLink  onClick={this.selectArticle} exact to="/3" id="3" className="waves-effect">3</NavLink></li>
                        </ul>
                        {activeArticle}
                    </div>
                </Fragment>
            )
        }
    }
}

export default NewsDisplay; 


//Worth noting that React still requires anchor tags to be used in cases where external URLs are to be integrated into the programming. 

    //Reacter Router components like <link> and <NavLink> are used for internal routing within the context of the client side only, not for other servers. 