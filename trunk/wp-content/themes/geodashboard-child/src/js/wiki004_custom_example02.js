
$(document).ready(function() {

  wiki004_ready();

}); //$(document).ready

function wiki004_ready(){
  if (f_wait.wiki_sub==0) {
    //_onsole.log('wait');
    setTimeout(function(){wiki004_ready()},100);
    return;
  } else {
    //_onsole.log('Done!');
    prepare_wiki004();
  };
}

function prepare_wiki004(){

  console.log('wiki004_ready2');
  
  let social_list=wiki_sub_last_r.features.filter(({properties}) => properties.item_token === '22734cdc1b2fd8e6fe2f26c0d937c7b5')[0];

  let social_list_text=new Array();
  let fields = new Array();

  if(social_list!==undefined){
    social_list_text=social_list.properties.post_content[0].child[0].text;
    fields = social_list_text.split('<br>');
  }
  //_onsole.log(fields);

  $('.wiki-sub').html('');
  let i=0;
  wiki_sub_last_r.features.forEach(element => {
    console.log(element);
    let children = element.properties.post_content[0].child;
    children.forEach(child => {

      // check if arr is array
      let result = Array.isArray(child.image);

      if(result) {
        childImage = child.image.sample();
      }
      else {
        childImage = child.image;
      }

      $('.wiki-sub').append(''
        +'<div class="row" style="margin-top:10px;" item_token="'+element.properties.item_token+'">'
          +'<div class="col"><img src="'+childImage+'" style="width:200px;"></div>'
          +'<div class="col"><div class="ct-text card" style="padding:5px;margin-bottom:5px;" id="text-'+i+'">'
            +child.text+'<br> '
            +'<br>&nbsp;'+fields.sample()+'&nbsp;'
            +'<br>&nbsp;'+fields.sample()+'&nbsp;'
            +'<br>&nbsp;'+fields.sample()+'&nbsp;<br> '
          +'</div>'
          +'<div class="col" style="text-align: center;"><button class="btn btn-warning btn-sm" id="button-'+i+'" onclick="CopyToClipboard(\'text-'+i+'\')">Click to copy</button></div>'
        +'</div>'
      +'');
      i++;
    });
  });



}

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

// function CopyToClipboard(containerid) {
//   /* if (document.selection) {
//     var range = document.body.createTextRange();
//     range.moveToElementText(document.getElementById(containerid));
//     range.select().createTextRange();
//     document.execCommand("copy");
//   } else if (window.getSelection) {
//     var range = document.createRange();
//     range.selectNode(document.getElementById(containerid));
//     window.getSelection().addRange(range);
//     document.execCommand("copy");
//     console.log('Text copied',$(document.getElementById(containerid)).html())
//   } */
//   var $temp = $("#temp");
//   $("body").append($temp);
//   $temp.val($("#"+containerid).text()).select();
//   document.execCommand("copy");
//   $temp.remove();
// }

function CopyToClipboard(containerid){
 var range = document.createRange();
 range.selectNode(document.getElementById(containerid));
 window.getSelection().removeAllRanges(); // clear current selection
 window.getSelection().addRange(range); // to select text
 document.execCommand("copy");
 window.getSelection().removeAllRanges();// to deselect
}

// async function CopyToClipboard(containerid) {
//   if (!navigator.clipboard) {
//     // Clipboard API not available
//     return
//   }

//   try {
//     const text = await navigator.clipboard.writeText(document.getElementById(containerid).innerText);
//     document.getElementById(containerid).innerText = text + " AAA ";
//   } catch (err) {
//     console.error('Failed to copy!', err)
//   }
// }

// function updateClipboard() {
//   // Here You Can Debug without DomException
//   debugger
//   const clipboard = document.querySelector('.clipboard-content').innerText;
//   document.querySelector('.clipboard-content').innerText = 'Updated => ' + clipboard;
// }