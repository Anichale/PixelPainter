//create a div pixel when invoked
//pixel will have a background color white
//width and height property
//addEventListener property click changeColor
function pixelFactory () {
  var returnPx = document.createElement('td');
  returnPx.style.width = '5px';
  returnPx.style.height = '5px';
  returnPx.style.color = '#000000';
  returnPx.addEventListener('click', changeColor);
  returnPx.addEventListener('mouseover', dragColor);
  return returnPx;
}

function changeColor () {
  this.style.background = selectedColor;
}

function dragColor () {
  if (isMouseDown) {
    this.style.background = selectedColor;
  }
}