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
        const articles = this.articleCount.map(recNum => {
            const recString = recNum.toString();  
            return <Article id={recString} />
        });  
        const selectionNumber = this.state.selectedArticle;
        let activeArticle = articles[selectionNumber - 1]; 

        return (
            <Fragment>
               <div className="row">
                    <ul className="pagination center bottom">
                        <li className="waves-effect" ><NavLink onClick={this.selectArticle} exact to="/1" id="1" className="waves-effect">1</NavLink></li>
                        <li className="waves-effect" ><NavLink onClick={this.selectArticle} exact to="/2" id="2" className="waves-effect">2</NavLink></li>
                        <li className="waves-effect" ><NavLink onClick={this.selectArticle} exact to="/3" id="3" className="waves-effect">3</NavLink></li>
                    </ul>
                    {activeArticle}
                </div>
            </Fragment>
        )
    }
}

export default NewsDisplay; 