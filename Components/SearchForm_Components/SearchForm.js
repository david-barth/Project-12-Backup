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
        this.validationCheck = this.validationCheck.bind(this); 
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
       hashNode.style.display = 'none'
       
       if (this.state.formPart === 2) {
            geoNode.style.display = 'none'; 
            hashNode.style.display = 'block'; 
       }
    }
    //The Update lifecycle event will apply with the initialization of states in componentDidMount. 
    //This will allow for a seamless (from the user perspective) changing of the div displays as needed. 


    advanceForm () {
        const signal = this.validationCheck(); 
        
        if (signal === 'Pass') {
            this.setState({formPart: 2});
        } else {
            alert(signal); 
        }
    }

    validationCheck() {
        let inputs = [
            this.props.ref1.current, 
            this.props.ref2.current,
            this.props.ref3.current 
        ]; 

        //Make check for global selection in mode select menu: 
        if (inputs[0].value === 'global') {
            return 'Pass'; 
        }

        //Set up initial message: 
        let initial = 'Please fill out or select the following fields:\n'; 
        let message = initial; 

        //Make check for empty inputs: 
        for (let i in inputs) {
           if (inputs[i].value === '' || inputs[i].value === 'DEFAULT' || inputs[i].disabled === true) {
               message += `Field: ${inputs[i].id}\n`
           } 
        }

        if (message !== initial) {
            return message
        }

        //Check for numbers in radius input: 
        const regexNum = /^\d+(\\.\d+)?$/; 
        if (inputs[1].value.search(regexNum) === 0) {
            message = 'Location field: Please enter a location using letters only.'; 
            return message; 
        }
       
        //Check for numbers in radius input: 
        if (inputs[2].value.search(regexNum) === -1) {
            message = 'Radius Field: Please enter a numerical value';
            return message;  
        }
        
        return 'Pass';  
    }
 

    async geoSelection(e) {
        const selection = e.target.value;
        
        if (selection === 'global') {
            await this.setState({geoState: true}); 
        } 
        else if (selection === 'geographical') {
            await this.setState({geoState: false}); 
        }
    } 

    

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


//Strategy for React-HTML5 form validity: 

    //Separate validations must be accounted for each half of the submit form. 

    //The first half must have an event handler or function that will allow for the advancing of the component rendering. 

    //This validation will have to be applied with the logic in the componentDidUpdate method in order to prevent rendering from occuring. 

    //The biggest issue is not being able to allow for the HTML 5 validation message to shown as needed