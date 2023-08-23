function m230_ready(){

  if (typeof mymap !== 'undefined') {
    mymap.on('click', on_mapclick);
    dMap.mapclick_status = true;
  }

}

//---

setInterval(
  function() {
    // _onsole.log('prepare_mapclick')
    prepare_mapclick();
  },
  500
);

function on_mapclick(e){
  
  sessionStorage.mapclick_lat=e.latlng.lat;
  sessionStorage.mapclick_lng=e.latlng.lng;

  if(dMap.mapclick_status===true){

    list_mapclick.forEach(element => {

      let itemAddon = element;
      let o = g_meta.geovar_addon.features;
      let obj_fileterd=o.filter(
        ({properties}) => properties.g_slug === itemAddon
      );
      let obj_addon = obj_fileterd[0];
    
      if(obj_addon.properties.mapclick_status=='enabled'){
        
        if(dyn_mapclick[element]!=null){
          dyn_mapclick[element](e);
        }
        else{
          console.log('dyn_mapclick['+element+'] is not defined')
        }
      }
      
    });

  }
  
}

function prepare_mapclick(){

  let disable_mapclick_count=0;

  var g = dMap.analisi01.grLyr;
  g.forEach(lyr => {

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    if(obj_lyr.disable_mapclick!=undefined 
      && obj_lyr.disable_mapclick===true){
      if(dMap.analisi01[element].visible===true){
        disable_mapclick_count++;
      }
    }

  });

  if(disable_mapclick_count>0){
    dMap.mapclick_status = false;
  }
  else{
    dMap.mapclick_status = true;
  }
}

// name a function to disable all click except this element
// function that disables all clicks on a web page except 
// for a specified element:
function disableMapClicksExcept(element) {
  // _onsole.log('disableMapClicksExcept',element.id);
  let itemAddon = element.id.replace('btn_', '');
  let o = g_meta.geovar_addon.features;
  let obj_fileterd=o.filter(
    ({properties}) => properties.g_slug === itemAddon
  );
  let obj_addon = obj_fileterd[0];

  if(obj_addon.properties.mapclick_status=='enabled'){

    obj_addon.properties.mapclick_status='disabled';

    $('#'+element.id).css('background-color','white');
    $('#mapid').css('cursor','default');

    if(dyn_functions['disable_'+itemAddon]!=null){
      dyn_functions['disable_'+itemAddon]();
    }

  }
  else{
    // Get all clickable elements on the page
    const clickableElements = document.querySelectorAll('.btn-map-click');
    
    // Loop through each clickable element
    clickableElements.forEach(clickableElement => {
      // // Disable the element's click event listener
      // clickableElement.removeEventListener('click', disableClickEvent);

      let itemAddon = clickableElement.id.replace('btn_', '');

      // _onsole.log(itemAddon)
      let objFileterd=g_meta.geovar_addon.features.filter(
        ({properties}) => properties.g_slug === itemAddon
      );
      let objAddon = objFileterd[0];
      
      // If the element is not the specified element, disable its click event listener
      if (clickableElement !== element) {
        //clickableElement.addEventListener('click', disableClickEvent);

        objAddon.properties.mapclick_status='disabled';

        $('#'+clickableElement.id).css('background-color','white');

        if(dyn_functions['disable_'+itemAddon]!=null){
          dyn_functions['disable_'+itemAddon]();
        }

      }

    });

    let itemAddon = element.id.replace('btn_', '');

    // _onsole.log(itemAddon)
    let objFileterd=g_meta.geovar_addon.features.filter(
      ({properties}) => properties.g_slug === itemAddon
    );
    let objAddon = objFileterd[0];

    objAddon.properties.mapclick_status='enabled';

    $('#'+element.id).css('background-color','yellow');
    $('#mapid').css('cursor','crosshair');

    if(dyn_functions['enable_'+itemAddon]!=null){
      dyn_functions['enable_'+itemAddon]();
    }    

  }


  
  // Define a function to disable the click event
  // function disableClickEvent(event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }
}