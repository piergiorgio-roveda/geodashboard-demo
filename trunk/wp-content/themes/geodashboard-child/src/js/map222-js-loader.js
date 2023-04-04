var js_loader_list=[
  'config201',
  'config202-client',
  'config203-style',
  'config204-labels',
  'config205-map',
  'config206-lyrs',
  'config207-vlyrs',
  'config208-tbs',
  'map201-general-map',
  'map202-base',
  //'map203-google-initialize',
  //'map204-search-cointaner',
  'map205-template',
  'map206-general',
  'map207-template-b',
  'map208-toc-box',
  'map209-user-position',
  'map210-map-center',
  'map211-add-map',
  'map215-mobile-footer',
  'map217-dialog',
  'map226-dialog-template',
  'map227-dialog-body',
  'map235-dialog-body-support',
  'map218-api',
  'map225-user-meta',
  'map223-geovar-loader',
  'map212-basemaps-nocredits',
  'map224-button',
  'map213-sidebar-footer',
  'map214-sidebar-footer-b',
  'map219-js-style',
  'map229-marker-cluster-custom',
  'map_vlyr008_1',
  'map_lyr035a',
  'map_vlyr007_1',
  'map220-gr-lyr-after',
  'map228-lyr-on-click-generic',
  'map216-toc',
  'addon201-template',
  'map221-extra',
  'addon202-explorer',
  'addon203-item1-exlorer',
  'addon204-add-poi',
  'addon205-search-classic',
  'addon210-profile',
];

load_js(0);


function load_js(iJs){
    var js_src_url='/src/js/';

  /*$.getScript( js_src_url+element+'.js', function( data, textStatus, jqxhr ) {
    //console.log( data ); // Data returned
    //console.log( textStatus ); // Success
    //console.log( jqxhr.status ); // 200
    console.log( "Load was performed. "+element );
  });*/
  //var iJs = 0;
  if(js_loader_list[iJs]){
    var element = js_loader_list[iJs];
    $.ajax({
      async: false,
      element: element,
      url: js_src_url+element+'.js?ver='+VER,
      iJs:iJs,
      dataType: 'script',
      success: function(r){
        var iJsX = this.iJs + 1;
        // _onsole.log(this.element);
        load_js(iJsX);
      }//success
    });
  }

}
