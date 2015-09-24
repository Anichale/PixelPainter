//namespace
var PixelPainter = window.PixelPainter || {};

//Canvas module
PixelPainter.Canvas = (function() {

  var config = PixelPainter.config;
  var swatch = PixelPainter.Options.getPalette();

  //create empty state array - manages states for undo, redo, save and load
  var stateArray = [];

  //current position in our stateArray that can be incremented or decremented to change states
  var statePos;

  //variable to check if mouse is clicked currently
  var isMouseDown = false;

  /* creates our canvas with a resolution w x h
  *  using a matrix that populates the cells using
  *  our PixelFactory module and our config object
  */
  function instantiateCanvas (colArray) {

    //matrix pattern to populate canvas
    var rows = config.height;
    var columns = config.width;
    var gridPx;
    var row;
    var counter = 0;

    //init table
    var mainGrid = document.createElement('table');

    //event listeners change the isMouseDown variable
    mainGrid.addEventListener('mousedown', checkMouseDown);
    mainGrid.addEventListener('mouseup', checkMouseUp);
    mainGrid.id = 'Canvas';

    for (var i = 0; i < rows; i++) {

      //create rows to populate table
      row = document.createElement('tr');
      row.className = 'row';
      for (var j = 0; j < columns; j++) {

        //populate each cell using PixelFactory module
        //checks if optional colArray is passed in, if so
        //give it the color at position counter
        if (colArray) {
          gridPx = PixelPainter.PixelFactory.createPixel(colArray[counter]);
          counter++;
        } else {
          gridPx = PixelPainter.PixelFactory.createPixel();
        }

        row.appendChild(gridPx);
      }

      //attach row to table
      mainGrid.appendChild(row);
    }

    //attach table to body
    document.body.appendChild(mainGrid);
  }

  /* loops through our canvas child nodes and grabs the dataset.index
  *  pushes it to an array called thisState
  * pushes thisState to our stateArray
  */
  function saveState () {
    var thisState = [];

    //grab all rows
    var rowNodes = document.querySelector('#Canvas').childNodes;
    var rowChildren;
    var thisCell;
    for (var i = 0; i < rowNodes.length; i++) {

      //grab row children
      rowChildren = rowNodes[i].childNodes;
      for (var j = 0; j < rowChildren.length; j++) {

        //individual td
        thisCell = rowChildren[j];

        //index of our swatch
        thisState.push(thisCell.dataset.index);
      }
    }

    //set a cap on our state array, if it exceeds 20
    //then remove the earliest state
    if (stateArray.length >= 20) {
      stateArray.shift();
    }

    //push our state
    stateArray.push(thisState);

    //set our position in the array to the end
    statePos = stateArray.length - 1;
  }

  //event listener function changes isMouseDown variable
  function checkMouseDown () {
    isMouseDown = true;
  }

  //event listener resets when mouse is released
  function checkMouseUp () {
    isMouseDown = false;
    saveState();
  }

  //getter function for our PixelFactory module
  function getMouseDown () {
    return isMouseDown;
  }

  //button for our encode function
  (function CreateEncodeButton () {
    var saveButton = document.createElement('button');
    saveButton.innerHTML = 'Save';
    saveButton.addEventListener('click', encode);
    document.body.appendChild(saveButton);
  })();

  // takes our current state (picture) and
  // creates a string to be saved to the hash
  function encode () {

    //grab our state
    var currentState = stateArray[statePos];

    //begin counter, because we will always have at least one color
    var counter = 1;

    //initialize our string
    var returnstring = '';

    //loop through our currentState array
    for (var i = 0; i < currentState.length; i++) {

      //if the next cell is the same color, increment our counter
      if (currentState[i] == currentState[i + 1]) {
        counter++;
      } else {

        //if its a single cell, just return it separated by a $
        if (counter === 1) {
          returnstring += currentState[i] + '$';
        } else {

          //else return the counter + 'x' and our color separated by a $
          returnstring += counter + 'x' + currentState[i] + '$';
        }

        //reset our counter to 1
        counter = 1;
      }
    }

    //set our hash to the string
    window.location.hash = returnstring;
  }

  //button for decode function
  (function CreateLoadButton () {
    var loadButton = document.createElement('button');
    loadButton.innerHTML = 'Load';
    loadButton.addEventListener('click', decode);
    document.body.appendChild(loadButton);
  })();

  // takes our hash string and
  // creates a currentState array we
  // can create a canvas with
  function decode () {
    var decoded = [];
    var cell;
    var multiplier;
    var color;

    //first take out the '#' symbol and split all the numbers by $
    var toDecode = window.location.hash.slice(1).split('$');


    //loop through new array
    for (var i = 0; i < toDecode.length; i++) {
      cell = toDecode[i];

      // if 'x' is inside the cell, this means we have multiples of the same color
      // in our array, so we have to populate multiple cells
      if (cell.includes('x')) {

        // split the numbers by x where multiplier[0] is our number of cells
        // and multipler[1] is our color
        multiplier = cell.split('x');
        for (var j = 0; j < multiplier[0]; j++) {

          //push it on to our array for the number of cells
          decoded.push(multiplier[1]);
        }
      } else {

        //if its alone, just push it on our array
        decoded.push(toDecode[i]);
      }
    }

    //clear the canvas
    document.body.removeChild(document.querySelector('#Canvas'));

    //load picture by our new stateArray
    instantiateCanvas(decoded);

    //init a state
    saveState();
  }

  // undo button
  (function CreateUndoButton () {
    var undoButton = document.createElement('button');
    undoButton.innerHTML = 'Undo';
    undoButton.addEventListener('click', undo);
    document.body.appendChild(undoButton);
  })();

  // redo button
  (function CreateRedoButton () {
    var redoButton = document.createElement('button');
    redoButton.innerHTML = 'Redo';
    redoButton.addEventListener('click', redo);
    document.body.appendChild(redoButton);
  })();

  // changes our position in our state array by -1, then redraws our canvas
  // using the selected state
  function undo () {
    if (statePos >= 0) {
      statePos--;
      var currentState = stateArray[statePos];
      document.body.removeChild(document.querySelector('#Canvas'));
      instantiateCanvas(currentState);
    }
  }

  // changes our position in our state array by +1, then redraws our canvas
  // using the selected state
  function redo () {
    if (statePos < stateArray.length - 1) {
      statePos++;
      var currentState = stateArray[statePos];
      document.body.removeChild(document.querySelector('#Canvas'));
      instantiateCanvas(currentState);
    }
  }

  // clear button
  (function CreateClearAllButton () {
    var clearAllButton = document.createElement('button');
    clearAllButton.innerHTML = 'Clear All';
    clearAllButton.addEventListener('click', clearAll);
    document.body.appendChild(clearAllButton);
  })();

  //first clears the DOM of all canvases and instantiates a new one
  // clears our states, then inits our current one
  function clearAll () {
    document.body.removeChild(document.querySelector('#Canvas'));
    PixelPainter.Canvas.instantiateCanvas();
    stateArray = [];
    saveState();
  }

  //initialize the canvas
  instantiateCanvas();

  //reveal module
  return {
    instantiateCanvas : instantiateCanvas,
    getMouseDown : getMouseDown
  };
})();