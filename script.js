//function to collect a new poem based on user input from poetrydb.org 


let $textArea = document.getElementById("main");
let $titleH3 = document.getElementById("title");
let poem =[];
let poemTitle;
let author;




//build API query string 
//    @@from user input. Available options are author (will be a radio input) and poem length (short, medium, long?)
function getPoem(author, length) {
  let requestURL = "http://poetrydb.org/author,linecount/Shakespeare;14/lines,title";
  let request = new XMLHttpRequest();
  let responseJSON; 
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  
  request.onload = function() {
    responseJSON = request.response;
    let responseLength = Object.keys(responseJSON).length;
    console.log(responseJSON);
    let poemObject = responseJSON[Math.floor(Math.random() * responseLength)];
    let linesArray = poemObject.lines;
    poemTitle = poemObject.title;
    // console.log(poemTitle);
    // console.log(linesArray);
    let nextLine;
    for (i in linesArray){
      nextLine = linesArray[i].split(" ");
      for (k in nextLine){
        poem.push(nextLine[k]);
      }
    }
    prepareRead();

  }
  

}


function prepareRead() {
  // Create the countdown timer.
  $titleH3.textContent = poemTitle;   
  let countDown = 5;
  let countDownTimer = setInterval(function() {
    $textArea.textContent = "Prepare to read real fast in...." + countDown;
    countDown--;
    if(countDown === 0) {
      clearInterval(countDownTimer);
      speedRead();
    }
  }, 1000);

}



function speedRead() {
  // Print words to the screen one at a time.
  let displayWord = "";
  let displayIndex = 0;
  let poemLength = poem.length;

  let speedReadTimer = setInterval(function(){
    $textArea.textContent = poem[displayIndex];
    displayIndex++;
    if(displayIndex === poemLength){
      clearInterval(speedReadTimer);
    }

  }, 150);

}


getPoem("x", "y");