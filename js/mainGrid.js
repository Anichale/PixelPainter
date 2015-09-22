//namespace
var PixelPainter = window.PixelPainter || {};

//Canvas module
PixelPainter.Canvas = (function() {

  var swatch = PixelPainter.Options.getPalette();
  var stateArray = [];
  var statePos;

  //variable to check if mouse is clicked currently
  var isMouseDown = false;

  /* creates our canvas with a resolution w x h
  *  using a matrix that populates the cells using
  *  our PixelFactory module
  */
  function instantiateCanvas (width, height, colArray) {

    //matrix pattern to populate canvas
    var rows = (height ? height : 20);
    var columns = (width ? width : 20);
    var gridPx;
    var row;
    var counter = 0;

    //init table
    var mainGrid = document.createElement('table');

    //event listeners change the isMouseDown variable
    mainGrid.addEventListener('mousedown', checkMouseDown);
    mainGrid.addEventListener('mouseup', checkMouseUp);
    mainGrid.id = 'mainGrid';

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

  function saveState () {
    var thisState = [];
    var rowNodes = document.querySelector('#mainGrid').childNodes;
    var rowChildren;
    var thisCell;
    for (var i = 0; i < rowNodes.length; i++) {
      rowChildren = rowNodes[i].childNodes;
      for (var j = 0; j < rowChildren.length; j++) {
        thisCell = rowChildren[j];
        thisState.push(thisCell.dataset.index);
      }
    }
    if (stateArray.length >= 20) {
      stateArray.shift();
    }
    stateArray.push(thisState);
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

  function getStates () {
    return stateArray;
  }

  (function CreateUndoButton () {
    var undoButton = document.createElement('button');
    undoButton.innerHTML = 'Undo';
    undoButton.addEventListener('click', undo);
    document.body.appendChild(undoButton);
  })();

  (function CreateRedoButton () {
    var redoButton = document.createElement('button');
    redoButton.innerHTML = 'Redo';
    redoButton.addEventListener('click', redo);
    document.body.appendChild(redoButton);
  })();

  function undo () {
    if (statePos >= 0) {
      statePos--;
      var currentState = stateArray[statePos];
      document.body.removeChild(document.querySelector('#mainGrid'));
      instantiateCanvas(20, 20, currentState);
    }
  }

  function redo () {
    if (statePos < stateArray.length - 1) {
      statePos++;
      var currentState = stateArray[statePos];
      document.body.removeChild(document.querySelector('#mainGrid'));
      instantiateCanvas(20, 20, currentState);
    }
  }

  (function CreateClearAllButton () {
    var clearAllButton = document.createElement('button');
    clearAllButton.innerHTML = 'Clear All';
    clearAllButton.addEventListener('click', clearAll);
    document.body.appendChild(clearAllButton);
  })();

  //first clears the DOM of all canvases and instantiates a new one
  function clearAll () {
    stateArray = [];
    statePos = stateArray.length - 1;
    document.body.removeChild(document.querySelector('#mainGrid'));
    instantiateCanvas();
  }

  //set resolution
  instantiateCanvas();

  //reveal module
  return {
    instantiateCanvas : instantiateCanvas,
    getMouseDown : getMouseDown,
    getStates : getStates
  };
})();