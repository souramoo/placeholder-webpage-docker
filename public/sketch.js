html = []

w_status = true
h_status = false

function setup() {
noCanvas()
  w = windowWidth/4
  h = windowHeight/3
  text_ = []
  text_[0] = title
  text_[0] = text_[0].toUpperCase()
  html[0] = createDiv(text_[0])
  html[0].position(w,h)
  html[0].id("title")
  html[0].style("color", "#06102A")
  html[0].style("font-size", "32px")
  html[0].style('font-family', 'Open Sans');


  text_[1] = description
  html[1] = createDiv(text_[1])
  html[1].position(w,h+30)
  html[1].id("description")
  html[1].style("color", "#06102A")
  html[1].style("font-size", "16px")
  html[1].style('font-family', 'Open Sans');
  
  
  text_[2] = url
  text_[3] = name
  
  text_[4] = "<a href= " + text_[2] + ">" + text_[3] + "<a/>"
  html[2] = createDiv(text_[4])
  html[2].id("link")
  html[2].position(w,h+60)
  html[2].style("color", "#06102A")
  html[2].style("font-size", "16px")
  html[2].style('font-family', 'Open Sans');
  
  a = []
  a[0] = document.getElementById("title").offsetWidth
  a[1] = document.getElementById("description").offsetWidth
  a[2] = document.getElementById("link").offsetWidth
  max_w = Math.max(a[0], a[1], a[2])
  

  a[5] = document.getElementById("link").offsetHeight
  
  console.log(max_w)

  fill(33,33,33)
  rect(30,30, 300, 300)
}

function draw() {
   speed = 1.0
   if(w_status) { w = w+speed } else { w = w-speed }
   if(h_status) { h = h+speed } else { h = h-speed }
   if(w+max_w+2 >= windowWidth) { w_status = false } else if (w < 0){  w_status = true }
   if(h >= windowHeight - a[5] -60) { h_status = false } else if (h < 0) { h_status = true }

   html[0].position(w,h)
   html[1].position(w,h+30)
   html[2].position(w,h+60)
}




function windowResized() {
  w = windowWidth/4
  h = windowHeight/3
  html[0].position(w,h)
  html[1].position(w,h+30)
}