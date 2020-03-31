import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';



class Welcome extends Component {


    render() {
        return (
            <div className="row">
                <div className="col s6 offset-s4">
                   <h1 className="red-text lighten-2">Welcome to the tweet news app</h1>
                </div>
            </div>         
        ) 
    }
}

export default Welcome; 