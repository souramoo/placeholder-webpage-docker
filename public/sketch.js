var html = [];
var footer = [];
var font_available = false;

var myFont
var fontReady = true;

function preload() {
}

render_tree = {
   "meta": {
      "img_to_text_offset_y": 5,
      "current_x": -1,
      "current_y": -1,
      "max_w": -1,
      "max_h": -1,
      "speed": 1.5,
      "w_status": true,
      "h_stauts": true,
      "pause": false,
      "default_font" : env["url_font_bold"],
      "use_default_font" :  font_available
   },
   "image": {
      "url": env["url_image"],
      "img_height": 30
   },
   "text": [{
      "text": env["headline"],
      "uppercase": true,
      "text_type": "default",
      "offset_y": 60,
      "font_type": "bold",
      "font_size": 24
   }, {
      "text": env["description"],
      "uppercase": false,
      "text_type": "default",
      "offset_y": 95,
      "font_type": "normal",
      "font_size": 16
   }, {
      "text": env["url_homepage"],
      "uppercase": false,
      "text_type": "link",
      "offset_y": 125,
      "font_type": "normal",
      "font_size": 14
   }, {
      "text": env["email"],
      "uppercase": false,
      "text_type": "email",
      "offset_y": 150,
      "font_type": "normal",
      "font_size": 14
   }],
   "footer" : {
      "height" : 40,
      "background_color" : "white",
      "url_footer_left_name" : env["url_footer_left_name"],
      "url_footer_left" : env["url_footer_left"],
      "url_footer_right_name" : env["url_footer_right_name"],
      "url_footer_right" : env["url_footer_right"]
   }
}

function setup() {
   noCanvas()
   render_tree["meta"]["current_x"] = (windowWidth * 0.5) 
   render_tree["meta"]["current_y"] = (windowHeight * 0.39) 
   draw_shieldInit();
   render_tree["meta"]["current_x"] = render_tree["meta"]["current_x"] - render_tree["meta"]["max_w"] / 2
   render_tree["meta"]["current_y"] = render_tree["meta"]["current_y"] - render_tree["meta"]["max_h"] / 2
   draw_shieldMove()
   document.title = env["pagetitle"];
   draw_footerInit();
   console.log(render_tree["image"]["url_image"])
}

function draw() {
   if (!render_tree["meta"]["pause"] && fontReady) {
      if (render_tree["meta"]["w_status"]) {
         render_tree["meta"]["current_x"] = render_tree["meta"]["current_x"] + render_tree["meta"]["speed"]
      } else {
         render_tree["meta"]["current_x"] = render_tree["meta"]["current_x"] - render_tree["meta"]["speed"]
      }
      if (render_tree["meta"]["h_status"]) {
         render_tree["meta"]["current_y"] = render_tree["meta"]["current_y"] + render_tree["meta"]["speed"]
      } else {
         render_tree["meta"]["current_y"] = render_tree["meta"]["current_y"] - render_tree["meta"]["speed"]
      }

      if (render_tree["meta"]["current_x"] + render_tree["meta"]["max_w"] + 5 >= windowWidth) {
         render_tree["meta"]["w_status"] = false
      } else if (render_tree["meta"]["current_x"] < 0) {
         render_tree["meta"]["w_status"] = true
      }

      if (render_tree["meta"]["current_y"] + render_tree["meta"]["max_h"] >= windowHeight) {
         render_tree["meta"]["h_status"] = false
      } else if (render_tree["meta"]["current_y"] < 0) {
         render_tree["meta"]["h_status"] = true
      }
      draw_shieldMove()
   }
}

function fontRead() {
}

function draw_image(img, offset_x, offset_y, width_) {
   t = '<img src="' + img + '" height="' + width_ + 'px">'
   tt = createDiv(t)
   tt.position(offset_x, offset_y)
   return tt
}

function draw_text(id, text_, upperCase, text_type, offset_x, offset_y, font_type, size) {
   t = text_
   if (upperCase) {
      t = t.toUpperCase()
   }

   switch (text_type) {
      case "link":
         t = "<a href=" + "'" + t + "'>" + t + "</a>"
         break;
      case "email":
         t = '<a href="mailto:' + t + '">' + t + "</a>"
         break;
      default:
         break;
   }

   tt = createDiv(t)
   tt.position(offset_x, offset_y)
   tt.id(id)
   tt.style("color", "black")
   tt.style("font-size", size + "px")

   switch (font_type) {
      case "bold":
         tt.style('font-family', env["url_font_bold_name"]);
         break;
      case "normal":
         tt.style('font-family', env["url_font_normal_name"]);
         break;
   }

   tt.style('font-family', "Oswald-Medium");

   return tt
}

function draw_shieldInit() {
   html[0] = draw_image(
      render_tree["image"]["url"],
      render_tree["meta"]["current_x"],
      render_tree["meta"]["current_y"],
      render_tree["image"]["img_height"])

   for (var i = 0; i < render_tree["text"].length; i++) {
      off = render_tree["meta"]["img_to_text_offset_y"]
      if (render_tree["text"][i]["text"] == "") {} else {
         html.push(draw_text(
            i + 1,
            render_tree["text"][i]["text"],
            render_tree["text"][i]["uppercase"],
            render_tree["text"][i]["text_type"],
            render_tree["meta"]["current_x"],
            off + render_tree["meta"]["current_y"] + render_tree["text"][i]["offset_y"],
            render_tree["text"][i]["font_type"],
            render_tree["text"][i]["font_size"]
         ))
         s = (i + 1) + ""

         if (document.getElementById(s).offsetWidth > render_tree["meta"]["max_w"]) {
            render_tree["meta"]["max_w"] = document.getElementById(s).offsetWidth
         }

         if (i == render_tree["text"].length - 1) {
            o = document.getElementById(s).style.top
            o = o.substring(0, o.length - 2) * 1
            o = o + document.getElementById(s).offsetHeight
            o = o - render_tree["meta"]["current_y"]
            o = o + render_tree["footer"]["height"]
            render_tree["meta"]["max_h"] = o
         }
      }
   }
}

function draw_shieldMove() {
   for (var i = 0; i < html.length; i++) {
      off_w = render_tree["meta"]["current_x"]
      off_h = render_tree["meta"]["current_y"]
      if (i > 0) {
         off_h = render_tree["meta"]["current_y"] + render_tree["meta"]["img_to_text_offset_y"] + render_tree["text"][i - 1]["offset_y"]
      }
      html[i].position(off_w, off_h)
   }
}

function draw_shieldReset() {
   render_tree["meta"]["current_x"] = (windowWidth * 0.5) 
   render_tree["meta"]["current_y"] = (windowHeight * 0.39)
   render_tree["meta"]["current_x"] = render_tree["meta"]["current_x"] - render_tree["meta"]["max_w"] / 2
   render_tree["meta"]["current_y"] = render_tree["meta"]["current_y"] - render_tree["meta"]["max_h"] / 2
   render_tree["meta"]["pause"] = true
}

function draw_footerInit() {
   footer[0] = createDiv("")
   h_ = render_tree["footer"]["height"]
   footer[0].position(0,windowHeight-h_)
   footer[0].style("color", "red")
   footer[0].style("border-top", "1px solid #e6e6e6")
   footer[0].style("background-color", render_tree["footer"]["background_color"])
   footer[0].style("font-size", size + "px")
   footer[0].style("width", windowWidth + "px")
   footer[0].style("height", h_ + "px")
   
   b_ = "<a href='" + render_tree["footer"]["url_footer_left"] + "'>" + render_tree["footer"]["url_footer_left_name"] + "</a>"
   footer[1] = createDiv(b_)
   footer[1].id(render_tree["footer"]["url_footer_left"])
   footer[1].style('font-family', env["url_font_normal_name"])
   footer[1].style("font-size", 12 + "px")
   footer[1].position(10,windowHeight-h_ + render_tree["footer"]["height"]/3)
   
   c_ = "<a href='" + render_tree["footer"]["url_footer_right"] + "'>" + render_tree["footer"]["url_footer_right_name"] + "</a>"
   footer[2] = createDiv(c_)
   footer[2].id(render_tree["footer"]["url_datenschutz"])
   footer[2].style('font-family', env["url_font_normal_name"])
   footer[2].style('color:hover', "black")
   footer[2].style("font-size", 12 + "px")
   
   l = windowWidth - 110
   footer[2].position(l, windowHeight - h_ + render_tree["footer"]["height"]/3)
}

function draw_footerRefresh() {
   l = windowWidth - 110
   h_ = render_tree["footer"]["height"]
   footer[0].style("width", windowWidth + "px")
   footer[0].position(0,windowHeight-h_)
   footer[1].position(10,windowHeight-h_ + render_tree["footer"]["height"]/3)
   footer[2].position(l, windowHeight - h_ + render_tree["footer"]["height"]/3)
}

function windowResized() {
   draw_shieldReset();
   draw_shieldMove();
   draw_footerRefresh();
}

function mousePressed() {
   togglePause();
}

function keyPressed() {
   if (keyCode === ENTER) {
      draw_shieldReset();
      draw_shieldMove();
   }
}

function togglePause() {
   if (render_tree["meta"]["pause"]) {
      render_tree["meta"]["pause"] = false;
   } else {
      render_tree["meta"]["pause"] = true;
   }
}