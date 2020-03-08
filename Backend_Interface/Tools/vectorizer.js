//Modules and Defined Lists 
const emojione = require('emojione'); 
const stopWords = [ 'i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']; 
const contractions = require('./Exported_Word_Lists').contracted;
const contractions2 = require('./Exported_Word_Lists').contracted2;
const emoticons = require('./Exported_Word_Lists').emoticons; 
const slangTranslator = require('slang-translator');
const natural = require('natural'); 
    stemmer = natural.PorterStemmer;
    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();
const lemmatizer = require('wink-lemmatizer'); 
const SpellChecker = require('simple-spellchecker');
const dictionary = SpellChecker.getDictionarySync("en-US", function(err, dictionary) {
        return dictionary; 
    });
    
      





//Vectorizer Class Declaration: 



class Vectorizer {

    constructor(textList) {
        this.textList = textList; 
    }

    clean() {
        //Declare inputMatix
        let cleanTexts = [] 

        //Iterate through textList array and clean each text: 
        for (let text = 0; text < this.textList.length; text++) {
            let current = this.textList[text]; 
            const tokens = this.initializeTokens(current); 
            const uncontracted = this.stopWordRemove(tokens);
            const negated = this.negationRemove(uncontracted); 
            const lemmaTokens = this.lemmatization1(negated);
            const cleaned = this.finalSpellCheck(lemmaTokens);  
            cleanTexts.push(cleaned);
            console.log(text);
        }; 

       //Convert cleaned texts to vectors:
        return cleanTexts; 
    }


    switchList(newTextList) {
        //Switch out old textList for new textList in Constructor; 
        this.textList = newTextList; 
    }; 


    initializeTokens(text) {
        //Initial Tokenization: 
        let tokensInitial = text.split(' ');

        //Emoji Conversion: 
        let converted = this.emojiConvert(tokensInitial); 


        //Translate slang terms in text: 
        for (let i in converted) {
            let slang = slangTranslator.translate(converted[i]); 
            if (converted[i] !== slang) {
                converted.splice(i, 1, slang)
            }; 
        }  

        let deSlanged = converted.join(' ').toLowerCase();

        //Remove HTML tags, URLs (https, http, ftp based), and non-letter based characters from the string: 
        const regexCollection = [/(&nbsp;|<([^>]+)>)/ig, /(?:https?|ftp):\/\/[\n\S]+/g, /[^a-zA-Z' ]/g]; 
        for (let regex of regexCollection) {
            deSlanged = deSlanged.replace(regex, ''); 
        }; 

        //Tokenize by splitting into array elements based on spacing: 
        const dirtyTokens = deSlanged.split(' '); 


        //Eliminate '' entries:
        const tokens = dirtyTokens.filter(token => {
            return token !== ''
        }); 


        return tokens; 
        }


    emojiConvert(tokens) {
        //Loop through individual tokens: 
        tokens.forEach((token, i) => {

        //For each token, verify for potential matches in the emoticons object: 
        for (let emotion in emoticons) {
            if (emoticons[emotion].includes(token)) {
                //Replace emoji token with the corresponding word
                 tokens.splice(i, 1, emotion); 
            } 
        }
        
        //Convert unicode emojis to short words: 
        const unicodeConvert = emojione.toShort(token); 
        if (token !== unicodeConvert) {
            tokens.splice(i, 1, unicodeConvert); 
        }
        });
    
        return tokens;   
    }


    stopWordRemove(tokens) {
        //Loop through the tokens
        for (let i = 0; i < tokens.length; i++) {
            //For each token, loop through list of stopwords to check for match
            for (let j = 0; j < stopWords.length; j++) {
                if (tokens[i] === stopWords[j]) {
                    //Replace matched tokens with '' as universal removal character
                     tokens.splice(i, 1, '')     
                }
            }
        }
    
        //Filter out '' from the tokens array and return new array
        const filtered = tokens.filter(word => {
            return word !== ''; 
        }); 
    
        return filtered; 
    }


    loopList (array, contractionList, word, index) {
        for (let j in contractionList) {
            if (word === j) {
                array.splice(index, 1, contractionList[j]); 
            }
        };
    }


    negationRemove(filtered) {
        //Run loop for each tokenized word in filtered
        filtered.forEach((word, i) => {
        //Iterate through contractions object for each word in filtered
            this.loopList(filtered, contractions, word, i); 
            this.loopList(filtered, contractions2, word, i);
        });     
    
        return filtered;
    }


    lemmatization1(tokenList) {
        //Wink-Lemmatizer run: 
        for (let i = 0; i < tokenList.length; i++) {
            if (tokenList[i] !== lemmatizer.verb(tokenList[i])) {
                tokenList.splice(i, 1, lemmatizer.verb(tokenList[i])  +'changed');
            }
            else if (tokenList[i] !== lemmatizer.noun(tokenList[i])) {
                tokenList.splice(i, 1, lemmatizer.noun(tokenList[i])  +'changed');
            }
            else if (tokenList[i] !== lemmatizer.adjective(tokenList[i])) {
                tokenList.splice(i, 1, lemmatizer.adjective(tokenList[i]) +'changed');
            }
        };


        //Porter-Algorithm run: 
        for (let i = 0; i < tokenList.length; i++) {
            let verification = dictionary.spellCheck(tokenList[i]); 
            let verificationPorter = dictionary.spellCheck(stemmer.stem(tokenList[i])); 
            if (!tokenList[i].includes('changed') && verification === true && verificationPorter === true) {
                //Only add words that are properly spelled, properly stemmed from the Porter run and unlabeled: 
                tokenList.splice(i, 1, stemmer.stem(tokenList[i]));
            }
        }

        //UnLabeling: 
        tokenList.forEach((token, i) => {
            if (token.includes('changed')) {
                const reverted = token.substr(0, token.length - 'changed'.length); 
                tokenList.splice(i, 1, reverted);
            }
        });  
        
        return tokenList;
}

    finalSpellCheck(tokens) {
        //Singularize tokens with ' ' into single word tokens
        let splitTokens = []; 
        for (let i in tokens) {
            if (tokens[i].includes(' ')) {
            const splits = tokens[i].split(' '); 
            splits.forEach(split => splitTokens.push(split)); 
            } else {
                splitTokens.push(tokens[i]); 
            }
        }


        //SpellCheck all tokens one final time before vectorization: 
        const finalTokens = splitTokens.filter(token => {
            return dictionary.spellCheck(token); 
        })
        
        
        return finalTokens;    
    }

  tfidfGen(word, corpusDictionary, wordMap) {
   //Add texts to corpus:
   for (let i in corpusDictionary) {
        tfidf.addDocument(corpusDictionary[i]); 
   } 
   
   //Calculate the TF-IDF value and update the proper word map property:  
   tfidf.tfidfs(word, function(i, measure) {
        wordMap[word] = measure; 
   }); 
  }
}; 


/**Vectorizer class: 
 * Remove undesired elements from an input array of texts including: HTML elements, non-letter characters, and gibberish characters. 
 * Convert contractions, emojis, and slang to common words.  
 * Stems and lemmatizes words where possible in order to provide common root words for easier pattern recognition for MLAs. 
 * Tokenizes words based on spacing and converts words to frequency based vectors, based on the "Bag of Words" technique. 
 * Assembles all vectors into a returned input matrix for further use. 
 * 
 * Note: This only involves cleaning up the features for the MLA; label assignments for training and test data sets must be handled outside of the vectorizer instance.
 * Note2: So far this vectorizer only uses a frequency space transformation, based on a simple BoW model.  tfidf (term frequency - inverse document frequency) can be used for assigning statistical weights to words in the texts.  
 * Note3: Vectorizer must accept an array of words in order to work properly.
 * 
 * Note4: The natural TFIDF uses the following syntax to perform its function: 
 *  tfidf.addDocument(string). 
 *  Therefore all documents in the corpus array can be added to the natural TDIDF algorithm. 
 *  The inclusion of a text is therefore not added, as the texts can be directly added to create the corpus right away. 
 *  This should ideally be done only once. 
 */


module.exports.Vectorizer = Vectorizer; 