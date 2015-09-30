//namespace
var PixelPainter = window.PixelPainter || {};

//Options & Swatch Module
PixelPainter.Options = (function () {
  //paintbrush initialized to black;
  var selectedColor = '#000000';
  var target;
  var prevTarget;

  var leftBar = document.getElementById('pixelPainter');

  //swatch values for the palette
  var swatchArray = ['#CD4A4A','#CC6666','#BC5D58','#FD5E53','#FF7538','#9F8170','#FAA76C','#FF8D88','#FFCF48','#FCE883','#BAB86C','#FDFC74','#87A96B','#1DF914','#76FF7A','#6DAE81','#1CAC78','#178086', '#ADFF2F', '#32CD32', '#20B2AA', '#00FFFF', '#E0FFFF', '#00CED1', '#48D1CC', '#AFEEEE', '#4682B4', '#000080', '#00008B', '#4169E1', '#8A2BE2', '#4B0082', '#9400D3', '#DDA0DD', '#DA70D6', '#FF69B4', '#FFB6C1', '#FAEBD7', '#F5F5DC', '#FFEBCD', '#FAFAD2', '#8B4513', '#A0522D', '#D2691E', '#FFE4E1', '#FFF0F5', '#FAF0E6', '#FFEFD5', '#E6E6FA', '#F8F8FF', '#F0FFF0', '#FFFFF0','#FFFFFF','#CFCFCF','#ABABAB','#838485','#494A4A','#000000','#CB4154','#FF9BAA','#EF98AA','#EE204D','#EE204D','#FC89AC','#FF1DCE','#C364C5','#9D81BA','#7366BD','#5D76CB','#1F75FE'];

  /*  creates a color palette with a fixed amount of
  *   swatches created with our createPaletteSwatch()
  *   function on a 6x6 matrix
  */
  (function createPaletteGrid () {
    //init variables for later changes in matrix
    var rows = 12;
    var col = 5;
    var arrayPos = 0;
    var swatch;
    var paletteRow;

    //creates table to hold table rows and cells
    var paletteTable = document.createElement('table');
    paletteTable.id = 'paletteTable';

    //use a matrix pattern to populate the table
    for (var i = 0; i < rows; i++) {

      //first loop creates rows to populate table
      paletteRow = document.createElement('tr');
      paletteRow.className = 'paletteRow';

      //second loop creates cells to populate rows
      for (var j = 0; j < col; j++) {
        swatch = createPaletteSwatch(swatchArray[arrayPos]);
        paletteRow.appendChild(swatch);
        arrayPos++;
      }

      //append row to table
      paletteTable.appendChild(paletteRow);
    }

    //append table to body
    leftBar.appendChild(paletteTable);
  })();

  //takes in @param color to create a cell swatch
  function createPaletteSwatch (color) {
    var paletteSwatch = document.createElement('td');
    paletteSwatch.style.backgroundColor = color;
    paletteSwatch.style.width = '20px';
    paletteSwatch.style.height = '20px';
    paletteSwatch.addEventListener('click', colorSelector);
    return paletteSwatch;
  }

  //for event listener, changes our brush color to this color
  //adds a border for selected swatch and removes the old one
  //on click
  function colorSelector (e) {
    if (prevTarget) {
      prevTarget.style.border = '';
    }
    target = e.target;
    selectedColor = this.style.backgroundColor;
    target.style.border = '5px solid black';
    prevTarget = target;

  }

  //erase button sets brush color to white
  (function CreateEraseButton () {
    var eraseButton = document.createElement('div');
    eraseButton.innerHTML = 'ERASE';
    eraseButton.addEventListener('click', eraser);
    leftBar.appendChild(eraseButton);
  })();

  function eraser () {
    selectedColor = '#FFFFFF';
  }

  //getter function for other modules to grab the brush color
  function currentColor () {
    return selectedColor;
  }

  //getter fucntion for other modules to grab the swatch
  function getPalette () {
    return swatchArray;
  }

  //reveal module
  return {
    currentColor : currentColor,
    getPalette : getPalette
  };

})();