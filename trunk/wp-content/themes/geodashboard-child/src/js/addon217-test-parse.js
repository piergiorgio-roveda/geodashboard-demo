$(document).ready(function() {

  
/*
  var toAjax={
    type: "GET",
    url: baseUrl,  
    dataType: "json",
    crossDomain: true,
    format: "json"
  }

  toAjax['error']=function(xhr, textStatus, errorThrown ) {
    console.log('message Error' + JSON.stringify(error));
  }

  toAjax['success']=function(r){
    console.log(r)
  }//success

  $.ajax(toAjax); //ajax
*/
/*
  $.getJSON( baseUrl, { assessmentId:"123", classroomId:"234"})
    .done( function(resp){
      // handle response here
  }).fail(function(){
    alert('Oooops');
  });
*/


  //var result = foo(); // always ends up being 'undefined'
}); //$(document).ready

var baseUrl='https://www.hellomoon.io/api/nfts/listNfts?pageSize=60&offset=0&sort=VOLUME&sortDirection=DESC&timeRangeFilter=1+day';
/*
function foo() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', baseUrl);
    httpRequest.send();
    return httpRequest.responseText;
}*/

//import { get } from 'axios';

// Make a request for a user with a given ID
axios.get(baseUrl)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });