//create a div pixel when invoked
//pixel will have a background color white
//width and height property
//addEventListener property click changeColor
function pixelFactory () {
  var returnPx = document.createElement('td');
  returnPx.style.width = '40px';
  returnPx.style.height = '40px';
  returnPx.style.color = '#000000';
  returnPx.addEventListener('click', changeColor);
  return returnPx;
}

function changeColor () {
  this.style.background = selectedColor;
}