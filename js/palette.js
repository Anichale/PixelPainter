//global variable
var selectedColor = '#000000';

//create a static grid of color divs
//hard coded colors
//add event listner to each pixel colorSelector
function paletteGrid () {

  var rows = 6;
  var col = 6;
  var counter = 0;
  var palettePx;
  var row;
  var paletteDiv = document.createElement('table');
  paletteDiv.id = 'paletteDiv';

  for (var i = 0; i < rows; i++) {
    row = document.createElement('tr');
    row.className = 'row';
    for (var j = 0; j < col; j++) {
      palettePx = palettePixelFactory(colorArr[counter]);
      row.appendChild(palettePx);
      counter++;
    }
    paletteDiv.appendChild(row);
  }

  document.body.appendChild(paletteDiv);
}

function palettePixelFactory (color) {
  var returnDiv = document.createElement('td');
  returnDiv.style.background = color;
  returnDiv.style.width = '20px';
  returnDiv.style.height = '20px';
  returnDiv.addEventListener('click', colorSelector);
  return returnDiv;
}

//return clicked pixels color store global
function colorSelector () {
  selectedColor = this.style.background;
}

var colorArr = ['#CD4A4A','#CC6666','#BC5D58','#FD5E53','#FF7538','#9F8170','#FAA76C','#FF8D88','#FFCF48','#FCE883','#BAB86C','#FDFC74','#87A96B','#1DF914','#76FF7A','#6DAE81','#1CAC78','#178086', '#FFFFFF', '#CFCFCF', '#ABABAB', '#838485', '#494A4A', '#000000', '#CB4154', '#FF9BAA', '#EF98AA', '#EE204D', '#EE204D', '#FC89AC', '#FF1DCE', '#C364C5', '#9D81BA', '#7366BD', '#5D76CB', '#1F75FE'];

paletteGrid();