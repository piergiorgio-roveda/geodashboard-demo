/*
# CodePen: Binary Rain | David
author: (David)[https://codepen.io/dmeldrum6]
source: https://codepen.io/dmeldrum6/pen/bGGGJdz
UID: p-cp2
*/
class Drop {
    constructor(x, y){
      var elem = document.createElement("div");
      elem.classList = ["drop"];
      elem.style.left = `${x}px`;
      elem.style.color = "darkblue";
      elem.style.fontSize = "small";
      elem.style.fontFamily = "consolas";
      elem.style.opacity = "0."+ Math.floor((Math.random() * 10) + 1);
      elem.style.top = `${y}px`;
      elem.style.zIndex = "1";
      elem.innerHTML = "<span class='leader'>"+GetAString(1)+"</span>";
      //document.getElementById("divRain").appendChild(elem);
      $('body').append(elem);
         
    }
  }
  var myVar = setInterval(myTimer, 2000); 
  function myTimer() {
    console.log('test');
    $('.drop').remove();
    //cleanup();
  }  

  function GetAString(len) {
    var chars = "01";
    var strOut = "";
    for(var i = 0; i < len ; i++) {
      strOut += chars.substr(Math.floor((Math.random() * chars.length) ), 1);
    }
    return strOut;
  }
  
  function cleanup(){
    var elements = document.getElementsByClassName("drop");
    for(var i = 0; i < elements.length ; i++) {
      // don't always flip it
      if (Math.floor((Math.random() * 10) + 1) > 9)
        {
          elements[i].innerHTML = "<span class='leader'>"+GetAString(1)+"</span>";
        }
    }
    while (elements.length > 400) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  
    
  }
  
  function loop(){
    // Get X start 
    var rx = Math.floor((Math.random() * window.innerWidth) + 1);
    new Drop(rx, 0);
    requestAnimationFrame(loop);
    cleanup();
  }
  
  loop();