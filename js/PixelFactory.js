//namespace
var PixelPainter = window.PixelPainter || {};

//Pixel instantiator module
PixelPainter.PixelFactory = (function() {

  var swatch = PixelPainter.Options.getPalette();
  var config = PixelPainter.config;

  //init a variable for changeColor and dragColor
  var hexValue;

  //creates cells for our Canvas takes in a colorIndex
  // colorIndex is the position of a certain color in our swatch array
  function createPixel (colorIndex) {
    var pixel = document.createElement('td');
    pixel.style.width = config.gridSize;
    pixel.style.height = config.gridSize;

    //if colorIndex exists, return the color at colorIndex, else default to white
    pixel.style.backgroundColor = (colorIndex ? swatch[colorIndex] : '#FFFFFF');

    //if colorIndex exists, return colorIndex, else default to index of white
    pixel.dataset.index = (colorIndex ? colorIndex : swatch.indexOf('#FFFFFF'));
    pixel.addEventListener('click', changeColor);
    pixel.addEventListener('mouseover', dragColor);
    return pixel;
  }

  //when the colors are changed in the dom object, it converts our hexadecimal values
  // to rgb values, so we have to use this function to convert rgb colors we get from
  // our listeners and change them to hex values we can use to search through our swatch
  // array
  function rgbToHex (rgb) {
    //regex will translate either rgb or rgba into pure number values
    //first checks if string begins with rgb(a optional) then for each digit checks for an optional string (r,g,b,a) in front
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    //grabs our matched rgb values and adds a #, then parses the colors into ints, that have been
    // converted into Hex values by toString(16)
    return (rgb && rgb.length === 4) ? '#' + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }

  //changes this color to our selected brush color, which is a rgb value
  //set hexValue to our conversion, then set our dataset.index to our
  //index of our hexValue
  function changeColor () {
    this.style.backgroundColor = PixelPainter.Options.currentColor();
    hexValue = rgbToHex(this.style.backgroundColor);
    this.dataset.index = swatch.indexOf(hexValue.toString().toUpperCase());
  }

  //if the mousebutton is held down, allow user to change cells
  //by dragging, process for color and index works the same as changeColor
  function dragColor () {
    if (PixelPainter.Canvas.getMouseDown()) {
      this.style.backgroundColor = PixelPainter.Options.currentColor();
      hexValue = rgbToHex(this.style.backgroundColor);
      this.dataset.index = swatch.indexOf(hexValue.toString().toUpperCase());
    }
  }

  //reveal module
  return {
    createPixel : createPixel
  };

})();