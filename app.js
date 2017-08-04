// Single state object
var state = {
    mainScreen: true,
    qNumber: 0,
    correctCount: 0,
    isCorrect: false,
    isQuestion: false,
    question: [
    {
        description: "How ugly is Briane of Tarth?",
        allChoices: ['Not bad for 7 feet tall',"She's about a 4",'She is uglier in the books','Ugh, man is she ugly'],
        correctChoice: 'choice 3'

    },
    {
        description: "What is the worst thing Cersei has done?",
        allChoices: ['Pushing her childhood friend down a well','Blowing up the sept of baelor','Killing King Roberts bastard children',"Hard to say, they're all pretty terrible"],
        correctChoice: 'choice 4'

    },
    {
        description: "What position has Tyrion Lannister not held",
        allChoices: ['Hand to a king and queen','Warden of the North','Master of Coin','Charge of the sewers'],
        correctChoice: 'choice 2'

    },
    {
        description: "Why can Hodor only say his name",
        allChoices: ["He's retarded",'Hodor is not his name, He was trying to "hold the door"','He never learned to speak','He is bound by honor to not speak anything else'],
        correctChoice: 'choice 2'

    },
    {
        description: "What does the Night King of the White Walkers want?",
        allChoices: ["Nobody knows",'Your soul','The wall to collapse and to kill John Snow','To enslave all of Westeros'],
        correctChoice: 'choice 1'

    }
    ],
    answer:[
    "In the book she is described as more homely with crooked teath and terrible hair", 
    "She also poisons Tyene Sand and has Tyene's mother chained to watch her die. Seems like every episode she does something terrible, often leading to her own undoing",
    "Tyrion did hang out with John Snow a bit at the wall, but held no position there. He was in charge of the sewers when he was younger to be humiliated by his father Tywin",
    "Hodor's actual name is Wylis. With white walkers attacking, Hodor holds the back exit of the cave with the three eyed raven to allow Bran and Meera time to escape. Bran inadvertently wargs into Wylis, linking the minds of the present-day Hodor and his past self. This mental trauma causes Wylis to suffer a seizure, during which he hears Meera shouting the phrase \"Hold the door!\" slurring the sentence together until it becomes \"Hodor\".",
    "Nobody knows what the white walkers want. They appear to be the only pure evil characters on the show (except for possibly Cersei). The Night King was created originally by the children of the forrest to protect them from men, however the white walkers have appeared to turn pure evil. They have killed the children of the forrest, including Leaf, as well as men"
    ]
};


// Render functions
var renderPage = function() {
    console.log(state.mainScreen)
    console.log(state.isQuestion)

    if(state.mainScreen===true){
        var itemsHTML= '<form id="js-enterQuiz-form">'+
      '<label for="shopping-list-entry">Are you ready for the GoT Quiz??<br> Warning, there are spoilers in here!!</label>'+
      '<p></p>'+
      '<button type="submit" id="start-button">Click here to continue</button>'+
        '</form>'
       
        }

    if(state.isQuestion===true){
        
        var itemsHTML= '<form class="js-Question-form">'+
        'Question '+parseInt(state.qNumber+1)+ ' of '+state.question.length+': '+state.question[state.qNumber].description+'<br>'+
        '<input type="radio" name="qRadio" value="choice 1" required>'+state.question[state.qNumber].allChoices[0]+'<br>'+
        '<input type="radio" name="qRadio" value="choice 2" required>'+state.question[state.qNumber].allChoices[1]+'<br>'+
        '<input type="radio" name="qRadio" value="choice 3" required>'+state.question[state.qNumber].allChoices[2]+'<br>'+
        '<input type="radio" name="qRadio" value="choice 4" required>'+state.question[state.qNumber].allChoices[3]+'<br>'+
        '<button type="submit" id="submit-question">Click here to submit your answer</button><br>'+
        '</form>'
    }
    
    

    if(state.isQuestion===false && state.mainScreen===false){
        console.log(state.question.length)
        if(state.qNumber<state.question.length-1){
            var itemsHTML= '<form class="js-Answer-form">'
        }
        else{
            var itemsHTML= '<form class="js-startOver-form">'
        }
        if(state.isCorrect===true){
            itemsHTML+="Correct! <br>" 
            state.correctCount++
            
        }
        else{
            var correctLocation=(state.question[state.qNumber].correctChoice.slice(-1))-1
            console.log(correctLocation)
            itemsHTML+='Wrong! the correct answer is '+state.question[state.qNumber].correctChoice+": "+
            state.question[state.qNumber].allChoices[correctLocation]+'<br>'
             }

        itemsHTML+=state.answer[state.qNumber]+'<br>'
           
        if(state.qNumber<state.question.length-1){
            itemsHTML+='<button type="submit" id="next-question">Click here to go to the next question</button>'
        }
        else{
            itemsHTML+='You got ' +state.correctCount+ " out of "+state.question.length+ " questions correct <br>"
            itemsHTML+='<button type="submit" id="next-question">Click here to restart the quiz</button>'
        }

        +'</form>'
    }

   console.log(itemsHTML);
    $('.js-QuizPage').html(itemsHTML);
    
};


// Event listeners and state modification
$('.js-QuizPage').on('submit','#js-enterQuiz-form',function(event) {
    event.preventDefault();
    event.stopPropagation();
    state.mainScreen=false;
    state.isQuestion=true;
   console.log(state.isQuestion);
    renderPage();
    
});

$('.js-QuizPage').on('submit','.js-Question-form',function(event) {
    event.preventDefault();
    event.stopPropagation();
    var myChoice=$('input[name="qRadio"]:checked').val();
    console.log('choice= '+myChoice)
    console.log('correct= '+state.question[state.qNumber].correctChoice)
    if (myChoice===state.question[state.qNumber].correctChoice){
        state.isCorrect=true;
    }
    else{state.isCorrect=false};
    state.isQuestion=false;
    // var item=addItem($('#shopping-list-entry').val());
   console.log(state.isQuestion);
    renderPage();
    
});

$('.js-QuizPage').on('submit','.js-Answer-form',function(event) {
    event.preventDefault();
    event.stopPropagation();

    state.isQuestion=true;
    state.qNumber++
    // var item=addItem($('#shopping-list-entry').val());
   console.log(state.isQuestion);
    renderPage();
    
});

$('.js-QuizPage').on('submit','.js-startOver-form',function(event) {
    event.preventDefault();
    event.stopPropagation();

    state.isQuestion=false;
    state.qNumber=0;
    state.mainScreen=true;
    state.correctCount=0;
    state.isCorrect=false;
   console.log(state.isQuestion);
    renderPage();
    
});


renderPage()