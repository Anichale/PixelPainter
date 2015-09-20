//create a div pixel when invoked
//pixel will have a background color white
//width and height property
//addEventListener property click changeColor
var pixelFactory = (function() {

  function createPixel () {
    var pixel = document.createElement('td');
    pixel.style.width = '5px';
    pixel.style.height = '5px';
    pixel.style.color = '#000000';
    pixel.addEventListener('click', changeColor);
    pixel.addEventListener('mouseover', dragColor);
    return pixel;
  }

  function changeColor () {
    this.style.background = palette.currentColor();
  }

  function dragColor () {
    if (mainGrid.getMouseDown()) {
      this.style.background = palette.currentColor();
    }
  }

  return {
    createPixel : createPixel
  };

})();