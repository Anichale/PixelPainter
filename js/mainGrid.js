//setup blank canvas with changeable pixels

/*width = columns, height = rows
matrix of rows * columns
populate each cell in matrix with a pixel
append each pixel to a unique row
append row to the canvas
*/
function PixelPainter (width, height) {
  var rows = height;
  var columns = width;
  var gridPx;
  var row;
  var mainGrid = document.createElement('table');
  mainGrid.id = 'mainGrid';

  for (var i = 0; i < rows; i++) {
    row = document.createElement('tr');
    row.className = 'row';
    for (var j = 0; j < columns; j++) {
      gridPx = pixelFactory();
      row.appendChild(gridPx);
    }
    mainGrid.appendChild(row);
  }
  document.body.appendChild(mainGrid);
}

PixelPainter(15, 15);