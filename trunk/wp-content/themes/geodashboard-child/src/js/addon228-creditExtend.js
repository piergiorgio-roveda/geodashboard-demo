list_creditExtend.push('a228');

dyn_functions['a228_creditExtend'] =  function(){

  let dlg_slug = 'btn_credit_single';

  $('.dlg_btn_credit_single_title').html('Documentation');

  $('.dlg_panel_tab').css('padding-top','15px');

  $('.nav-tabs').html('');

  let c = '<li tab="tab1" class="nav-item">'
      +'<a class="nav-link active" aria-current="page" href="#">'
        +'Layers'
      +'</a>'
    +'</li>'
    +'<li tab="tab2" class="nav-item">'
      +'<a class="nav-link" href="#">'
        +'Price list'
      +'</a>'
    +'</li>'
    +'<li tab="tab3" class="nav-item">'
      +'<a class="nav-link" href="#">'
        +'Use and conditions'
      +'</a>'
    +'</li>'
    +'<li tab="tab4" class="nav-item">'
      +'<a class="nav-link" href="#">'
        +'Payment'
      +'</a>'
    +'</li>';

  $('.nav-tabs').append(c);


  $('.panel-tab1').append(''
    +'<ul></ul>'
  +'');

  let custom_list = [
    {
      'title':'CONFINI AMMINISTRATIVI	ISTAT',
      'owner':'ISTAT',
      'descr':'Livello geografico visibile in mappa come polilinea chiusa il cui colore sia nero'
    },
    {
      'title':'AREE INDUSTRIALI - COMMERCIALI - ARTIGIANALI',
      'owner':'StudioSit SA',
      'descr':'Livello geografico visibile in mappa come polilinea chiusa il cui contorno sia GRIGIO per le aree industriali, ROSSO per le aree commerciali e GIALLO CARICO QUASI ARANCIONE per le aree artigianali)'
    },
    {
      'title':  'NUMERAZIONE CIVICA',
      'owner':'StudioSit SA',
      'descr':  'Livello geografico visibile in mappa come punto con etichetta corrispondente al numero; se possibile, un tooltip tipo quello dell\'altro geoportale, che mostri il dato attributo completo come da colonna successiva'
    },
    {
      'title':  'BUILDINGS 3D VECTOR',
      'owner':'CGR S.p.A',
      'descr':  'Livello visibile in mappa tramite il suo simbolo consegnato'
    },
    {
      'title':  'PARCHEGGI PUBBLICI IN STRUTTURA',
      'owner':'StudioSit SA',
      'descr':  'Livello visibile in mappa tramite il suo simbolo consegnato'
    },
    {
      'title':  'CASELLI AUTOSTRADALI ED USCITE TANGENZIALI',
      'owner':'StudioSit SA',
      'descr':  'Livello visibile in mappa tramite il suo simbolo consegnato'
    },
    {
      'title':  'AUTOGRILL E AREE DI SERVIZIO',
      'owner':'StudioSit SA',
      'descr':  'Livello visibile in mappa tramite il suo simbolo consegnato'
    },
    {
      'title':  'NUOVO EDIFICATO 2016-2022',
      'owner':'AIRBUS s.a.',
      'descr':  'Livello geografico visibile in mappa come polilinea chiusa il cui contorno sia VIOLA'
    },
    {
      'title':  'GIARDINI PUBBLICI',
      'owner':'StudioSit SA',
      'descr':  'Livello geografico visibile in mappa come polilinea chiusa il cui contorno sia VERDE'
    },
    {
      'title':  'AREE OMI (AVERAGE HOUSE PRICES)',
      'owner':'AGENZIA DELLE ENTRATE',
      'descr':  'Livello NON visibile in mappa'
    },
    {
      'title':  'ORIENTAMENTO INGRESSO EDIFICI',
      'owner':'StudioSit SA',
      'descr':  'Livello visibile nell\'ambito del tooltip dedicato al numero civico'
    },
    {
      'title':  'PARCHEGGI TRUCKS AUTOSTRADALI',
      'owner':'StudioSit SA',
      'descr':  ''
    }
  ];

  custom_list.forEach(el => {
    $('.panel-tab1 > ul').append(''
      +'<li><b>'+el.title+'</b> ('+el.owner+') <i>'+el.descr+'</i></li>'
    +'');
  });

  //box tab2
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab2" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);'
    +'max-height: 500px;overflow-y: auto;">';
  c += '</div><!--tab2-->';

  $('.dlg_'+dlg_slug+''+'_body').append(c);

  $('.panel-tab2').append(''
    +'<table class="table table_2">'
      +'<tr>'
        +'<th style="text-align:center;width:50%;">Category (unit price)'
        +'</th>'
        +'<th style="text-align:center;width:50%;">StudioSit SA proprietary data'
        +'</th>'
        +'<th style="text-align:center;width:50%;">Integrated Opendata'
        +'</th>'
      +'</tr>'
    +'</table>'
  +'');

  $('.panel-tab2').append(''
    +'<table class="table table_3">'
      +'<tr>'
        +'<th style="text-align:center;width:50%;">Category (flat rate)'
        +'</th>'
        +'<th style="text-align:center;width:25%;">StudioSit SA proprietary data'
        +'</th>'
        +'<th style="text-align:center;width:25%;">'
        +'</th>'
      +'</tr>'
    +'</table>'
  +'');

  let custom_list2 = [
    {
      'col_a':'Toponymy and House Numbers Italy',
      'col_b':'CHF 0,18',
      'col_c':'CHF 0,03'
    },
    {
      'col_a':'Toponymy and House Principality of Monaco',
      'col_b':'CHF 0,18',
      'col_c':'' //empty
    },
    {
      'col_a':'Toponymy and House Numbers France',
      'col_b':'', //empty
      'col_c':'CHF 0,02'
    },
    {
      'col_a':'Toponymy and House Numbers Switzerland',
      'col_b':'', //empty
      'col_c':'CHF 0,01'
    },
    {
      'col_a':'Toponymy and House Numbers Romania',
      'col_b':'CHF 0,18',
      'col_c':'' //empty
    },
    {
      'col_a':'Toponymy and House Numbers Albania',
      'col_b':'CHF 0,18',
      'col_c':'' //empty
    },
    {
      'col_a':'Parking areas (structured) - geodatabase Italy',
      'col_b':'CHF 0,01',
      'col_c':'' //empty
    },
    {
      'col_a':'Parking areas (structured) - geodatabase Switzerland',
      'col_b':'', //empty
      'col_c':'CHF 0,01'
    },
    {
      'col_a':'Parking areas (structured) - vector spot by spot outdoor and indoor floor plans - Italy',
      'col_b':'CHF 0,40',
      'col_c':'' //empty
    }
  ];

  let custom_list3 = [
    {
      'col_a':'Industrial, Commercial and Artisanal areas Italy',
      'col_b':'CHF 24.000',
      'col_c':'' //empty
    },
    {
      'col_a':'Public Gardens Italy',
      'col_b':'CHF 1.800',
      'col_c':'' //empty
    },
    {
      'col_a':'Cardinal Orientation Buildings Italy',
      'col_b':'CHF 8.200',
      'col_c':'' //empty
    },
    {
      'col_a':'New Buildings 2016-2023 Italy',
      'col_b':'CHF 2.200',
      'col_c':'' //empty
    },
    {
      'col_a':'Truck Parking areas (Highways) Italy',
      'col_b':'CHF 800',
      'col_c':'' //empty
    }
  ];


  custom_list2.forEach(el => {
    $('.table_2').append(''
      +'<tr><td>'+el.col_a+'</td><td style="text-align:right;">'+el.col_b+'</td><td style="text-align:right;">'+el.col_c+'</td</tr>'
    +'');
  });

  custom_list3.forEach(el => {
    $('.table_3').append(''
      +'<tr><td>'+el.col_a+'</td><td style="text-align:right;">'+el.col_b+'</td><td style="text-align:right;">'+el.col_c+'</td</tr>'
    +'');
  });

  //box tab3
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab3" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);'
    +'max-height: 500px;overflow-y: auto;">';
  c += '</div><!--tab3-->';

  $('.dlg_'+dlg_slug+''+'_body').append(c);

  $('.panel-tab3').append(''
    +'<p></p>'
  +'');

  //box tab4
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab4" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);'
    +'max-height: 500px;overflow-y: auto;">';
  c += '</div><!--tab4-->';

  $('.dlg_'+dlg_slug+''+'_body').append(c);

  $('.panel-tab4').append(''
    +'<p>Payment conditions: 100% in advance</p>'
  +'');

  //events functions
  $('.nav-item').on('click',function(){
    $('.nav-item > a').removeClass('active');
    $(this).children('a').addClass('active');
    var tab = $(this).attr('tab');
    $('.dlg_panel_tab').css('display','none');
    $('.panel-'+tab).css('display','block');
  });

}