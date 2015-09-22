//namespace
var PixelPainter = window.PixelPainter || {};

//Canvas module
PixelPainter.Canvas = (function() {

  //variable to check if mouse is clicked currently
  var isMouseDown = false;

  /* creates our canvas with a resolution w x h
  *  using a matrix that populates the cells using
  *  our PixelFactory module
  */
  function instantiateCanvas (width, height) {

    //matrix pattern to populate canvas
    var rows = height;
    var columns = width;
    var gridPx;
    var row;

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
        gridPx = PixelPainter.PixelFactory.createPixel();
        row.appendChild(gridPx);
      }

      //attach row to table
      mainGrid.appendChild(row);
    }

    //attach table to body
    document.body.appendChild(mainGrid);
  }

  //event listener function changes isMouseDown variable
  function checkMouseDown () {
    isMouseDown = true;
  }

  //event listener resets when mouse is released
  function checkMouseUp () {
    isMouseDown = false;
  }

  //getter function for our PixelFactory module
  function getMouseDown () {
    return isMouseDown;
  }

  //set resolution
  instantiateCanvas(100, 100);

  //reveal module
  return {
    instantiateCanvas : instantiateCanvas,
    getMouseDown : getMouseDown
  };
})();