      async function start_geovar_action() {
        let slug='geovar_action';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_button() {
        let slug='geovar_button';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_collection() {
        let slug='geovar_collection';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_dialog() {
        let slug='geovar_dialog';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_tb() {
        let slug='geovar_tb';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_master() {
        let slug='geovar_master';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_label_full() {
        let slug='geovar_label';
        g_meta[slug+'_full'] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_1() {

        await Promise.all([
          start_geovar_action(), 
          start_geovar_button(), 
          start_geovar_collection(), 
          start_geovar_dialog(),
          start_geovar_tb(), 
          start_geovar_master(),
          //-- 
          start_geovar_label_full()
        ]);

        // _onsole.log('start_geovar_1');
        show_loading2('.mapid-loading');
        
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end geovar_1');        
      }

      async function start_gLang() {
        // _onsole.log('gLang start');

        await Promise.all([
          start_geovar_1()
        ]);

        // _onsole.log('gLang end');

        g_meta.geovar_label_full.forEach(element => {
          if(element.name=='en_GB'){
            //gLang=element.features;
            element.features.forEach(e => {
              gLang[e.properties.g_slug]=e.properties.g_label;
            });
          }
        });
        // _onsole.log('start_gLang');
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end gLang');          
      }

      async function start_loadingIcon() {
        // _onsole.log('gLang start');

        await Promise.all([
          start_geovar_1()
        ]);

        // _onsole.log('gLang end');

        g_meta.geovar_label_full.forEach(element => {
          if(element.name=='en_GB'){
            //gLang=element.features;
            element.features.forEach(e => {
              gLang[e.properties.g_slug]=e.properties.g_label;
            });
          }
        });
        // _onsole.log('start_gLang');
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end gLang');          
      }

      async function start_geovar_lyr_style() {

        let slug='geovar_lyr_style';

        let params = new URLSearchParams();
        params.append('g_map_slug', MAPSLUG);

        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
        // _onsole.log('start '  + slug);

        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_lyr() {
        let slug='geovar_lyr';

        let params = new URLSearchParams();
        params.append('g_map_slug', MAPSLUG);

        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
        // _onsole.log('start '  + slug);

        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_map() {
        let slug='geovar_map';

        let params = new URLSearchParams();
        params.append('g_map_slug', MAPSLUG);

        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
        // _onsole.log('start '  + slug);
        
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_map_tb() {
        let slug='geovar_map_tb';

        let params = new URLSearchParams();
        params.append('g_map_slug', MAPSLUG);

        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
        // _onsole.log('start '  + slug);

        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_2(){

        // _onsole.log('start_');

        await Promise.all([
          start_geovar_lyr_style(), 
          start_geovar_lyr(), 
          start_geovar_map(), 
          start_geovar_map_tb()
        ]);

        // _onsole.log('end_');
        // _onsole.log(g_meta);

        // _onsole.log('start_geovar_2');
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end geovar_2'); 

        // _onsole.log(g_meta);

        if(g_meta.geovar_map.features[0].properties.g_group.includes('public')==false
          || window.location.href.includes('/map_2/profile/')){
            
          if(window.location.href.includes('?user_token=')){
  
            let user_token_from_url = window.location.href.split('?user_token=')[1];
            localStorage.setItem('user_token', user_token_from_url);
            let url = window.location.href.split('?')[0];
            window.open(url,"_self");
  
          }
          else{
  
            let value = localStorage.getItem('user_token');
            if(value === null){
  
              if(mapuser_meta[0]['user_token']=='0x0'){
                
                let url = HOME_PROJECT+'/map_2/profile/';
                if(window.location.href!=url){
                  window.open(url,"_self");
                }
                
              }
              else{
                localStorage.setItem('user_token', mapuser_meta[0]['user_token']);
              }
              
            }
            else{
  
              if(mapuser_meta[0]['user_token']!='0x0'){
                localStorage.setItem('user_token', mapuser_meta[0]['user_token']);
              }
              else if(value!='0x0'){
              }
              else{
                let url = HOME_PROJECT+'/map_2/profile/';
                if(window.location.href!=url){
                  window.open(url,"_self");
                }
              }
              
            }
  
          }
        }           

      }

      async function page_inizialize() {

        await Promise.all([
          start_loadingIcon(),
          start_gLang(),
          start_geovar_2()
        ]);

        // _onsole.log(g_meta);   

        // _onsole.log('foo end');
        // _onsole.log(g_meta);
        // _onsole.log('start page_inizialize');
  
        await new Promise(resolve => setTimeout(resolve, 1));
        // _onsole.log('end page_inizialize'); 

        hide_loading2('.mapid-loading');

        //then load scripts functions        

        //require
          //map203-google-initialize
          //map204-search-cointaner
        if (typeof google === 'object' && typeof google.maps === 'object') {
          aggiungi_box_ricerca();
        }

        //require
          //map223-geovar-loader   
        m223_ready();

        //require
          //map207-template-b    
        m207_ready();

        if(document.getElementById("mapid") !== null)
        {
          //require
            //map211-add-map 
          // m211_ready();
          m211_testroutingrotate_ready();
        }        

        //require
          //map225-user-meta
        m225_ready();

        //require
          //map239-fill_labels
        m239_ready();

        tmp_meta_ready();
        tmp_access_ready();

        //require
          //map232-basemaps
        if (typeof mymap !== 'undefined') {
          // map232_ready();
          map232_testroutingrotate_ready();
        }

        // //require
        //   //map214-sidebar-footer-b
        // map214_ready();

        // //require
        //   //map231-js-loader.js
        // // m231_ready();

        // //require
        //   //map230-map-click.js
        // m230_ready();

        // //require
        //   //map236-template-mobile.js
        // m236_ready();

        // js_loader_list_map_lyr.forEach(element => {
        //   if(dyn_functions[element+'_ready']!=null){
        //     dyn_functions[element+'_ready']();
        //   }
        // });

        // js_loader_list_map_config.forEach(element => {
        //   if(dyn_functions[element+'_ready']!=null){
        //     dyn_functions[element+'_ready']();
        //   }
        // });

        // if(typeof dyn_external !== 'undefined' && dyn_external.length>0){
        //   dyn_external.forEach(element => {
        //     // _onsole.log('dynFuncExt',element)
        //     dyn_functions[element]();
        //   });
        // }


      }

      page_inizialize();//page_inizialize...