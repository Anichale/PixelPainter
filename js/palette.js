var palette = (function () {
  //global variable initialized to black;
  var selectedColor = '#000000';

  //swatch values for the palette
  var swatchArray = ['#CD4A4A','#CC6666','#BC5D58','#FD5E53','#FF7538','#9F8170','#FAA76C','#FF8D88','#FFCF48','#FCE883','#BAB86C','#FDFC74','#87A96B','#1DF914','#76FF7A','#6DAE81','#1CAC78','#178086', '#FFFFFF', '#CFCFCF', '#ABABAB', '#838485', '#494A4A', '#000000', '#CB4154', '#FF9BAA', '#EF98AA', '#EE204D', '#EE204D', '#FC89AC', '#FF1DCE', '#C364C5', '#9D81BA', '#7366BD', '#5D76CB', '#1F75FE'];

  //create a static grid of color divs
  //hard coded colors
  //add event listner to each pixel colorSelector
  (function createPaletteGrid () {
      var rows = 6;
      var col = 6;
      var arrayPos = 0;
      var swatch;
      var paletteRow;
      var paletteTable = document.createElement('table');
      paletteTable.id = 'paletteTable';

      for (var i = 0; i < rows; i++) {
        paletteRow = document.createElement('tr');
        paletteRow.className = 'paletteRow';
        for (var j = 0; j < col; j++) {
          swatch = createPaletteSwatch(swatchArray[arrayPos]);
          paletteRow.appendChild(swatch);
          arrayPos++;
        }
        paletteTable.appendChild(paletteRow);
      }
      document.body.appendChild(paletteTable);
    })();

  function createPaletteSwatch (color) {
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

  (function CreateEraseButton () {
    var eraseButton = document.createElement('button');
    eraseButton.innerHTML = 'Erase';
    eraseButton.addEventListener('click', eraser);
    document.body.appendChild(eraseButton);
  })();

  (function CreateClearAllButton () {
    var clearAllButton = document.createElement('button');
    clearAllButton.innerHTML = 'Clear All';
    clearAllButton.addEventListener('click', clearAll);
    document.body.appendChild(clearAllButton);
  })();

  function eraser () {
    selectedColor = '#FFFFFF';
  }

  function clearAll () {
    document.body.removeChild(document.querySelector('#mainGrid'));
    mainGrid.instantiateCanvas(100, 100);
  }

  function currentColor () {
    return selectedColor;
  }

  return {
    currentColor : currentColor
  };

})();