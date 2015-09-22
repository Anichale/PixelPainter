//namespace
var PixelPainter = window.PixelPainter || {};

//Canvas module
PixelPainter.Canvas = (function() {

  var stateArray = [];

  //variable to check if mouse is clicked currently
  var isMouseDown = false;

  /* creates our canvas with a resolution w x h
  *  using a matrix that populates the cells using
  *  our PixelFactory module
  */
  function instantiateCanvas (width, height, stateArray) {

    //matrix pattern to populate canvas
    var rows = (height ? height : 100);
    var columns = (width ? width : 100);
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
        //checks if optional stateArray is passed in, if so
        //give it the color at position counter
        if (stateArray) {
          gridPx = PixelPainter.PixelFactory.createPixel(stateArray[counter]);
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
        thisState.push(thisCell.background);
      }
    }
    if (stateArray.length >= 20) {
      stateArray.shift();
    }
    stateArray.push(thisState);
    console.log(stateArray);
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

  //set resolution
  instantiateCanvas();

  //reveal module
  return {
    instantiateCanvas : instantiateCanvas,
    getMouseDown : getMouseDown,
    getStates : getStates
  };
})();