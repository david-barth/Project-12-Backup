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
                    <StatDisplay stats={this.props.stats} />
                </div>
                <StatButtons componentChange={this.props.componentChange} getNews={this.props.getNews} /> 
            </Fragment>
        )
    }
}



export default Stat; 

//Continuation: 

    //1. Transfer all getNews related functionality up to the App level component. 

    //2. Convert the Stat component back to a functional component. 

    //3. Complete the NewsDisplay Component Functionality. 

