$(document).ready(function() {

  // _onsole.log('Ready-8!');
  //update_drag_coords();
  //--NEW
  $('#mapid').css('display','block');
  $('#mapid').append('<table class="table mapid-table"></table>')
  //var dataString = get_var;

  //generic_api(dataString,'show_table');
}); //$(document).ready

dyn_functions['succ_show_table'] = function(r){

  var f = r.features;
  var p = f.properties;
  var f0 = r.features[0];
  var foo = Object.keys(f0.properties);

  $('.mapid-table').append('<thead><tr></tr></thead>');
  $('.mapid-table').append('<tbody></tbody>');

  foo.forEach((foo_el) => {
    $('.mapid-table > thead > tr').append('<th scope="col">'+foo_el+'</th>');
  });

  var c=0;
  f.forEach(element => {
    ++c;
    var p = element.properties;
    var foo = Object.keys(p);
    $('.mapid-table > tbody').append('<tr id="tr-'+c+'"></tr>');
    foo.forEach((foo_el) => {
       $('#tr-'+c).append('<td>'+p[foo_el]+'</td>');
    });
  });

}
