import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import GeoSelect from './GeoSelect'; 
import HashtagFilter from './HashtagFilter'; 


class SearchForm extends Component {
    
    constructor(props) {
        super(props);

        //Refs: 
        this.geoRef = React.createRef(); 
        this.hashRef = React.createRef(); 


        //State Designations: 
        this.state = {
            geoState: null, 
            hashState: null, 
            radioState: 'option1',
            formPart: null,   
        };

        //Function Bindings: 
        this.initialize = this.initialize.bind(this);
        this.advanceForm = this.advanceForm.bind(this); 
        this.geoSelection = this.geoSelection.bind(this);
        this.hashSelection = this.hashSelection.bind(this); 
        this.radioChoice = this.radioChoice.bind(this);
    }

    initialize () {
        this.setState({ 
            geoState: false,
            hashState: false, 
            formPart: 1
        }); 
    }

    get initialState() {
        return {
          activeComponent: ''
        };
      }

    componentDidMount() {
        this.initialize();
    }

    componentDidUpdate() {
        const geoNode = this.geoRef.current; 
        const hashNode = this.hashRef.current; 

       if (this.state.formPart === 1) {
            hashNode.style.display = 'none'           
       } else {
            geoNode.style.display = 'none'; 
            hashNode.style.display = 'block'; 
       }
    }
    //The Update lifecycle event will apply with the initialization of states in componentDidMount. 
    //This will allow for a seamless (from the user perspective) changing of the div displays as needed. 


    advanceForm () {
        this.setState({formPart: 2}); 
    }


    geoSelection(e) {
        const selection = e.target.value; 
        if (selection === 'geographical' && this.geoState) {
            this.setState((prevState) => ({
                geoState: !prevState.geoState  
              })); 
        } 
        else if (selection === 'global' && !this.geoState) {
            this.setState((prevState) => ({
                geoState: !prevState.geoState 
              })); 
        }
    } 
    //Logic: If geographical, then input must go from disabled (true) to enabled (false), vice versa


    hashSelection() {
        if (this.state.radioState === 'option1' && !this.state.hashState) {
            this.setState((prevState) => ({
                hashState: !prevState.hashState  
            })); 
        } 
        else if (this.state.radioState === 'option2' && this.state.hashState) {
            this.setState((prevState) => ({
                hashState: !prevState.hashState  
            })); 
        }
    }

    //Logic: If option1 is selected, then the hashState is false for disabled.  Vice versa applied.

    radioChoice(e) {
        this.setState({
            radioState: e.target.value
        });        
    }
    //Note: e can be used in place of other event based names for React based event handlers


    render() {
        const initialized = this.state.formPart;
        const geoState = this.state.geoState; 
        const hashState = this.state.hashState; 

        const ref1 = this.props.ref1; 
        const ref2 = this.props.ref2; 
        const ref3 = this.props.ref3; 
        const ref4 = this.props.ref4; 
        const ref5 = this.props.ref5; 
        const ref6 = this.props.ref6; 
        const ref7 = this.props.ref7; 
        const ref8 = this.props.ref8; 


        return (
            <div className="row">
                <form className="col s12" onSubmit={this.props.submitHandler}>
                        <GeoSelect 
                            toggle={this.geoSelection} 
                            geoState={geoState} 
                            advance={this.advanceForm}
                            reference={this.geoRef}
                            ref1={ref1}
                            ref2={ref2}
                            ref3={ref3}
                        />
                        <HashtagFilter 
                            radioChoice={this.radioChoice} 
                            buttonState={this.state.radioState}
                            hashState={hashState}
                            toggle={this.hashSelection}
                            reference={this.hashRef}  
                            ref4={ref4}
                            ref5={ref5}
                            ref6={ref6}
                            ref7={ref7}
                            ref8={ref8}
                        />;  
                </form>
            </div>
        )
    }
}

export default SearchForm; 

//Remaining Issues for Later: 

    //Change the state issue that comes with the GeoSelect selection menu (Ie incorrect disabling of geographical mode inputs). 


//Continuation: Continue experimenting with why refs are undefined.  Resolve this issue. 
