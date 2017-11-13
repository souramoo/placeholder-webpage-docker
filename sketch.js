html = []

function setup() {
  noCanvas()
  w = windowWidth/4
  h = windowHeight/3
  text_ = "Rancher-Compose"
  text_ = text_.toUpperCase()
  html[0] = createDiv(text_)
  html[0].position(w,h)
  html[0].style("color", "#06102A")
  html[0].style("font-size", "32px")
  html[0].style('font-family', 'Open Sans');

  text_ = "Docker | Node.JS | P5.JS"
  text_ = text_.toUpperCase()  
  html[1] = createDiv(text_)
  html[1].position(w,h+30)
  html[1].style("color", "#06102A")
  html[1].style("font-size", "16px")
  html[1].style('font-family', 'Open Sans');
}

function draw() {
}


function windowResized() {
  w = windowWidth/4
  h = windowHeight/3
  html[0].position(w,h)
  html[1].position(w,h+30)
  console.log("test")  
}