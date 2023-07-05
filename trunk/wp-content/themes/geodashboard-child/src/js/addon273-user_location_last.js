
dyn_functions['addon273-user_location_last'+'_ready'] = function(){
  // Inizialize
  a273_inizialize();
}

async function a273_inizialize() {

  // Non needed inizialize settings and data
  prepare_a273();

  await Promise.all([
    getAllUsersLastPosition()
  ]);

  await new Promise(resolve => setTimeout(resolve, 1));  

  a273_mapReady = 1;

}

function prepare_a273(){

}

async function getAllUsersLastPosition() {

  await new Promise(resolve => setTimeout(resolve, 1));

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'getAllUsersLastPosition',
    qy_name:'A',
    geom:1
  } 
  //let r = await a273_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'getAllUsersLastPosition');
  
  //--
  // onsole.log('getAllUsersLastPosition',r);

  rUsersPos=r;

  a273_UsersPos_draw();

  return

}

function a273_UsersPos_draw(){

  let ct_slug = 'ListDriverPos';
  $('.container-'+ct_slug).html('');

  let f = rUsersPos.features;

  if(f.length>0){
    
    a273_seqReady = 1;

    f.forEach(element => {
      let p = element.properties;

      let el = document.createElement('div');
      el.className = 'display-table mapboxMarker_user_generic '+
        'a273_UsersPos-'+p.user_token;
    
      // make a marker for each feature and add to the map
      // new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
      geo_lyr['seq'+p.user_token] = new maplibregl.Marker(el);
      geo_lyr['seq'+p.user_token].setLngLat([
        p.lng,
        p.lat
      ]);
      geo_lyr['seq'+p.user_token].addTo(mymap);

      $('.a273_UsersPos-'+p.user_token).html(''+
        '<div><div><i class="bi bi-car-front-fill"></i></div></div>'+
      ''); 

      let obj = list_players.features.filter(({properties}) => properties.item_token === p.user_token);
      if(obj.length>0){

        let nickname = obj[0].properties.nickname;
        let ct_slug = 'ListDriverPos';
        let box = ct_slug+'_1';
        let c = ''+
          '<div class="box-'+box+' box-'+p.user_token+'" player_token="'+p.user_token+'">'+
          '</div>'+
          '';
        $('.container-'+ct_slug).append(c);
        //-- CREATE FORM GROUP AND LABEL
        opt = {
          "label":nickname, // "Map filter",//ONLY NOT DEFINED IN objCol
          "slug": p.user_token,//optIn.ct_slug,
          //"pCol": pCol,
        }
        $('.box-'+p.user_token).append(
          append_field_label_2(opt)
        );

        c = ''+
          '<i class="bi bi-car-front-fill"></i>&nbsp'+
          '<i>'+moment(p.time).calendar()+'</i>'+
          '';
        $('#group-'+p.user_token).append(c);

      }

    });  

    let ct_slug = 'ListDriverPos';
    let box = ct_slug+'_1';

    $('.box-'+box).on('click',function(){

      let ct_slug = 'ListDriverPos';
      let box = ct_slug+'_1';

      if($(this).attr('player_token')!=undefined){
        $('.mapboxMarker_user_generic').css('background-color','yellow');
        $('.box-'+box).css('background-color','white');
        console.log('box-info-0-item',$(this).attr('player_token'));
        $('.a273_UsersPos-'+$(this).attr('player_token')).css('background-color','red');
        $(this).css('background-color','red');
      }

    });

  }
  else{
    a273_seqReady = 0;
    // onsole.log('rUsersPos: no data.');
  }

}