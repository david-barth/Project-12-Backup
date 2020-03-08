import React, {Fragment, Component} from 'react';
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';

//Component Imports: 
import StatExplanation from './StatExplanation'; 
import StatDisplay from './StatDisplay';
import StatButtons from './StatButtons';  

class Stat extends Component {
    render() {
        return (
            <Fragment>
                <div className="row">
                    <StatExplanation />
                    <StatDisplay />
                </div>
                <StatButtons componentChange={this.props.componentChange} /> 
            </Fragment>
        )
    }
}



export default Stat; 