//namespace
var PixelPainter = window.PixelPainter || {};

//Pixel instantiator module
PixelPainter.PixelFactory = (function() {

  var swatch = PixelPainter.Options.getPalette();
  var hexValue;

  //creates cells for our Canvas
  function createPixel (colorIndex) {
    var pixel = document.createElement('td');
    pixel.style.width = '15px';
    pixel.style.height = '15px';
    pixel.style.backgroundColor = (colorIndex ? swatch[colorIndex] : '#FFFFFF');
    pixel.dataset.index = (colorIndex ? colorIndex : swatch.indexOf('#FFFFFF'));
    pixel.addEventListener('click', changeColor);
    pixel.addEventListener('mouseover', dragColor);
    return pixel;
  }

  function rgbToHex (rgb) {

    //regex will translate either rgb or rgba into pure number values
    //first checks if string begins with rgb(a optional) then for each digit checks for an optional string (r,g,b,a) in front
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    console.log(rgb);
    //
    return (rgb && rgb.length === 4) ? '#' + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }

  //changes this color to our selected brush color
  function changeColor () {
    this.style.backgroundColor = PixelPainter.Options.currentColor();
    hexValue = rgbToHex(this.style.backgroundColor);
    this.dataset.index = swatch.indexOf(hexValue.toString().toUpperCase());
  }

  //if the mousebutton is held down, allow user to change cells
  //by dragging
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