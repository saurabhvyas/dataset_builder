//var script = document.createElement('script');
//script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
//script.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(script);



function __log(e, data) {
    log.innerHTML += "\n" + e + " " + (data || '');
  }

  var audio_context;
  var recorder;




  function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    __log('Media stream created.');

    // Uncomment if you want the audio to feedback directly
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');
    
    recorder = new Recorder(input);
    __log('Recorder initialised.');
  }

  function startRecording(button) {
    recorder && recorder.record();
    button.disabled = true;
    button.nextElementSibling.disabled = false;
    __log('Recording...');
  }

  function get_blob_from_url(blob_url) { 
  
  // this funciton gets blob from blob url and posts it to /audio

  var xhr = new XMLHttpRequest();
  xhr.open('GET', blob_url, true);
  xhr.responseType = 'blob';
  xhr.onload = function(e) {
  if (this.status == 200) {
    var myBlob = this.response;
    console.log(myBlob);
    var fd = new FormData();
    fd.append('upl',  myBlob);
    // myBlob is now the blob that the object URL pointed to.
    fetch('http://localhost:3000/audio',
{
    method: 'post',
    body: fd
}).then( function(){ 

  fetch('http://localhost:3000/next',

{    method: 'get'} ).then( function(data) { 

 data.text().then(function(data) {

 console.log(data); 

// empy the current audio list after user has submitted the audio 
$( "#recordingslist" ).empty();

 if(data === "") {

 $("#sentence").text("Finished! Thanks for your contribution, you may now close this tab");

 console.log('no more data, thanks for your voice donation');

}
  else {
 $("#sentence").text(data);
 textlen=$("#sentence").text().length + 1;
console.log('textlength = ' + textlen);

temp='http://translate.google.com/translate_tts?client=tw-ob&ie=UTF-8&idx=0&total=1'

temp_attr_value= temp  + '&tl=hi&q="' + String($("#sentence").text()) + '"'
console.log(temp_attr_value);


$('#audioelement').attr( 'src', temp_attr_value )

var audio_element = document.getElementById('audioparent');

audio_element.load(); //call this to just preload the audio without playing
  audio_element.play(); //call this to play the song right away



 }
 //location.reload(); 

 })


});


 }) 

                  }
    };
    xhr.send();


 } 

  function stopRecording(button) {
    recorder && recorder.stop();
    button.disabled = true;
    button.previousElementSibling.disabled = false;
    __log('Stopped recording.');
    
    // create WAV download link using audio data blob
    createDownloadLink();
    
    recorder.clear();
  }

  function createDownloadLink() {
    recorder && recorder.exportWAV(function(blob) {

 function success_fn(success){ console.log('success' + success) }
	
//console.log(blob);

  
     
	
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');

//console.log(url);

//var fd = new FormData();
//fd.append('upl',  blob);

//fetch('http://localhost:3000/audio',
//{
//    method: 'post',
//    body: fd
//}); 

/*
 $.ajax({
  type: "POST",
  url: 'http://localhost:3000/audio',
  data: blob ,
  success:success_fn,
 
  
});
      
*/  
    au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav'
      hf.innerHTML = 'upload this version ' + hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      recordingslist.appendChild(li);
    });
  }


  window.onload = function init() {

   
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      audio_context = new AudioContext;
      __log('Audio context set up.');
      __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      __log('No live audio input: ' + e);
    });
  };


$( document ).ready(function() {

function createAudio(src) {
  output =  '<audio id="audio">';
  // you can add more source tag
  output +=  '<source src='+src+'" type="audio/mp3" />';
  output +=  '</audio>';
}




textlen=$("#sentence").text().length + 1;
console.log('textlength = ' + textlen);

temp='http://translate.google.com/translate_tts?client=tw-ob&ie=UTF-8&idx=0&total=1'

//temp_attr_value=temp + 'textlen=' + textlen + '&tl=hi&q="' + String($("#sentence").text()) + '"'
temp_attr_value=temp +  '&tl=hi&q="' + String($("#sentence").text()) + '"'

//console.log(temp_attr_value);
console.log(temp_attr_value);

$('#audioelement').attr( 'src', temp_attr_value )

var audio_element = document.getElementById('audioparent');

audio_element.load(); //call this to just preload the audio without playing
  audio_element.play(); //call this to play the song right away

 

 function get_next_sentence() {

 fetch('http://localhost:3000/next',

{    method: 'get'} ).then( function(data) { 

 data.text().then(function(data) {

 console.log(data); 

// empy the current audio list after user has submitted the audio 
$( "#recordingslist" ).empty();

 if(data === "") {

 $("#sentence").text("Finished! Thanks for your contribution, you may now close this tab");

 console.log('no more data, thanks for your voice donation');
 $( "#recordbtn" ).remove();
 $( "#stopbtn" ).remove();
 $( "#skip" ).remove();
}
  else {

 $("#sentence").text(data);

textlen=$("#sentence").text().length + 1;
console.log('textlength = ' + textlen);

temp='http://translate.google.com/translate_tts?client=tw-ob&ie=UTF-8&idx=0&total=1'

//temp_attr_value= temp + 'textlen=' + textlen + '&tl=hi&q=' + String($("#sentence").text())
temp_attr_value= temp +  '&tl=hi&q="' + String($("#sentence").text()) + '"'

 /* temp_attr_value='https://translate.google.com/translate_tts?client=tw-ob&ie=UTF-8&idx=0&total=1&textlen=11&tl=hi&q=' + data;
 */

console.log(temp_attr_value);

//var newAudio = $(createAudio(temp_attr_value));
  //  $("#audioelement").replaceWith(newAudio);
  //newAudio.play();

$('#audioelement').attr( 'src', temp_attr_value )

var audio_element = document.getElementById('audioparent');



//$('#audioelement')[0].pause();
//$('#audioelement')[0].load();//suspends and restores all audio element

audio_element.load(); //call this to just preload the audio without playing
  audio_element.play(); //call this to play the song right away

console.log($('#audioelement').attr('src'))

 }
 //location.reload(); 

 })


});


}



   $( "#skip" ).click(function() {
   console.log('skipping sentence');
   $( "#recordingslist" ).empty();
   get_next_sentence();
   

});
    

    console.log( "jquery ready!" );
    
     $("ul").on("click","li > a",function () {
         var value = $(this).attr("href");
         console.log('working' + value);
         my_blob = get_blob_from_url(value);
           
        



    
}); 


});

