import React, {Fragment, Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';


class TweetInput extends Component {
    constructor(props) {
        super(props); 

        //Refs:
        this.ref4 = this.props.ref4; 
        this.ref5 = this.props.ref5;
        this.ref6 = this.props.ref6;
    }

    render() {
        return (
            <Fragment>
                <div className="input-field col s6">
                    <input  placeholder="Enter tweet subject..." 
                            id="tweetSubject" 
                            type="text" 
                            className="validate" 
                            disabled={false}
                            ref={this.ref4}
                            />
                    <label htmlFor="tweet_Subject">Tweet Subject</label>
                </div>        
    
                <div className="input-field col s6" onChange={this.props.toggle}>
                    <p>
                        <label>
                        <input 
                                name="hashtagFilter" 
                                value="option1" 
                                type="radio" 
                                checked={this.props.buttonState === 'option1'}
                                onChange={this.props.radioChoice}
                                ref={this.ref5}
                        />
                        <span>I want Hashtag Filtering</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input 
                                name="general" 
                                value="option2" 
                                type="radio" 
                                checked={this.props.buttonState === 'option2'}
                                onChange={this.props.radioChoice}
                                ref={this.ref6}
                                />
                        <span>No a general search is good</span>
                        </label>
                    </p>
                </div>          
            </Fragment>
        )        
    }
}


export default TweetInput; 