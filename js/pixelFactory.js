//namespace
var PixelPainter = window.PixelPainter || {};

//Pixel instantiator module
PixelPainter.PixelFactory = (function() {

  //creates cells for our Canvas
  function createPixel (color) {
    var pixel = document.createElement('td');
    pixel.style.width = '5px';
    pixel.style.height = '5px';
    pixel.style.color = (color ? color : '#000000');
    pixel.addEventListener('click', changeColor);
    pixel.addEventListener('mouseover', dragColor);
    return pixel;
  }

  //changes this color to our selected brush color
  function changeColor () {
    this.style.background = PixelPainter.Options.currentColor();
  }

  //if the mousebutton is held down, allow user to change cells
  //by dragging
  function dragColor () {
    if (PixelPainter.Canvas.getMouseDown()) {
      this.style.background = PixelPainter.Options.currentColor();
    }
  }

  //reveal module
  return {
    createPixel : createPixel
  };

})();