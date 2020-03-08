import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Explanation from './Explanation'; 
import TweetInput from './TweetInput'; 


class SearchSelect extends Component {
    constructor(props) {
        super(props);
        
        
    }

    render() {

        const ref4 = this.props.ref4; 
        const ref5 = this.props.ref5; 
        const ref6 = this.props.ref6; 

        return (
            <div className="row">
                <Explanation /> 
                <TweetInput 
                            radioChoice={this.props.radioChoice} 
                            buttonState={this.props.buttonState}
                            toggle={this.props.toggle}
                            addValue={this.props.addValue}
                            ref4={ref4}
                            ref5={ref5}
                            ref6={ref6}
                            /> 
            </div>
        )
    }
}

export default SearchSelect; 