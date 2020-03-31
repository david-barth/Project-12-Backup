import React, {Fragment, Component} from 'react';
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';


class ModelInputs extends Component {
    constructor(props) {
        super(props); 

    }

    render() {
        const geoState = this.props.geoState;
        const ref2 = this.props.ref2; 
        const ref3 = this.props.ref3;  

        return (
            <Fragment>
              <div className="row">
                  <div className="input-field col s12">
                      <input 
                              placeholder="Type a location..." 
                              id="location" 
                              type="text" 
                              className="validate"
                              required  
                              disabled={geoState}
                              ref={ref2} 
                              />
                      <label htmlFor="location">Location</label>
                  </div>
              </div>
      
              <div className="row">
                  <div className="input-field col s12">
                      <input  
                              placeholder="Specify a radius..." 
                              id="radius" 
                              type="text" 
                              className="validate"
                              required 
                              disabled={geoState}
                              ref={ref3} 
                              />
                      <label htmlFor="radius">Radius</label>
                  </div>
                  <div className="col s6 offset-s5">
                      <a id="next-button" onClick={this.props.advance} className="waves-effect waves-light btn-large">Next</a>
                  </div>
              </div>
            </Fragment>
          )
    }
}

export default ModelInputs; 