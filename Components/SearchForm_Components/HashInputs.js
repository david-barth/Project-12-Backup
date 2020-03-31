import React, { Fragment, Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';



class HashInputs extends Component {
    constructor(props) {
        super(props); 


    }

    render() {

        const ref7 = this.props.ref7; 
        const ref8 = this.props.ref8; 

        return (
            <Fragment>
                <div className="row">
                    <div className="input-field col s12">
                        <input 
                                placeholder="Enter hashtag here..." 
                                id="hashtag1" 
                                type="text" 
                                className="validate"
                                required 
                                disabled={this.props.hashState}
                                ref={ref7}
                                />
                        <label htmlFor="hashtag1">Hashtag Item 1:</label>
                    </div>
                </div>
    
                <div className="row" onChange={this.props.toggle}>
                    <div className="input-field col s12">
                        <input 
                                placeholder="Enter second hashtag here..." 
                                id="hashtag2" 
                                type="text" 
                                className="validate"
                                required 
                                disabled={this.props.hashState}
                                ref={ref8}
                                />
                        <label htmlFor="hashtag2">Hashtag Item 2:</label>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default HashInputs; 