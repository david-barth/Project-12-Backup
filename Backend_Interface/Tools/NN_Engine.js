const vector = require('../models/vector');  
const tf = require('../../node_modules/@tensorflow/tfjs-node'); 

//Essential Variables: 
const loadingKey = 'file://'+__dirname+'/Project_Engine/NN_Weights/model.json'; 



//Class Specifications: 


class NN_Engine {
    constructor() {
        this.categories = ['global', 'science and technology', 'business', 'football', 'environment']
    }; 

    async predictCategory() {
        //Load Model 
        const model = await this.loadModel(loadingKey);     
        
        //Load tweets from DB and isolate input array:  
        const loadedData = await vector.find({label: 'Prediction'});
        const inputArray = [loadedData[0].vector];

        //Convert input array to tensor and normalise: 
        const inputTensor = tf.tensor2d(inputArray);
        const normalisedInput = this.normalise(inputTensor).tensor;

        //Run prediction and model and process result to normal array: 
        const predictionTensor = await model.predict(normalisedInput); 
        const prediction = predictionTensor.dataSync(); 

        //Convert result to yield news prediction: 
        const result = this.categorize(prediction);
        return result; 
         
    }

    async loadModel(loadingKey) {
        const loadedNetwork = await tf.loadLayersModel(loadingKey);
        const optimizer = tf.train.adam(); 
        loadedNetwork.compile({
            loss: 'categoricalCrossentropy', 
            optimizer, 
            metrics: ['acc'],
        });

        return loadedNetwork; 
    }


    normalise(tensor, previousMin = null, previousMax = null) {
        const min = previousMin || tensor.min();
        const max = previousMax || tensor.max();
        const normalisedTensor = tensor.sub(min).div(max.sub(min));
        return {
          tensor: normalisedTensor,
          min,
          max
        };
    }

    categorize(prediction) {
        const mostProbable = Math.max(...prediction);  
        let maxIndex; 
        prediction.forEach((probability, i) => {
            if (probability === mostProbable) {
                maxIndex = i; 
            }
        }); 
        const predictedCategory = this.categories[maxIndex]; 
        return predictedCategory;  
    }
}


module.exports.NN_Engine = NN_Engine; 


//Continuation:  

    //3. Connect news response to the front end and complete programming for object - card formatting of the news results as needed. 