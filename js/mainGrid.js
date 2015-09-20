/*width = columns, height = rows
matrix of rows * columns
populate each cell in matrix with a pixel
append each pixel to a unique row
append row to the canvas
*/
var mainGrid = (function() {
  var isMouseDown = false;

  function instantiateCanvas (width, height) {
    var rows = height;
    var columns = width;
    var gridPx;
    var row;
    var mainGrid = document.createElement('table');
    mainGrid.addEventListener('mousedown', checkMouseDown);
    mainGrid.addEventListener('mouseup', checkMouseUp);
    mainGrid.id = 'mainGrid';

    for (var i = 0; i < rows; i++) {
      row = document.createElement('tr');
      row.className = 'row';
      for (var j = 0; j < columns; j++) {
        gridPx = pixelFactory.createPixel();
        row.appendChild(gridPx);
      }
      mainGrid.appendChild(row);
    }
    document.body.appendChild(mainGrid);
  }

  function checkMouseDown () {
    isMouseDown = true;
  }

  function checkMouseUp () {
    isMouseDown = false;
  }

  function getMouseDown () {
    return isMouseDown;
  }

  instantiateCanvas(100, 100);

  return {
    instantiateCanvas : instantiateCanvas,
    getMouseDown : getMouseDown
  };
})();