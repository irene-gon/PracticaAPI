window.onload = function comprobarAPI() {
  if (window.File && window.FileReader && window.FileList) {
    console.log("Todas las APIs soportadas");
  } else {
    alert("La API de FILE no es soportada en este navegador.");
  }
};
function datosCargados() {
  if (document.getElementById("cargando")) {
    var cargando = document.getElementById("cargando");
    cargando.parentNode.removeChild(cargando);
  }
  console.log("CARGA COMPLETADA");
  botonera.style.display = "inline";
}

function resetear() {
  if (document.getElementById("mensaje")) {
    var mensaje = document.getElementById("mensaje");
    mensaje.parentNode.removeChild(mensaje);
  }
  if (document.getElementById("video")) {
    var video = document.getElementById("video");
    video.parentNode.removeChild(video);
  }
}

function handleFileSelect(evt) {
  //inicializamos
  resetear();
  var botonera = document.getElementById("botonera");
  botonera.style.display = "none";
  var file = evt.target.files[0]; //  object
  if (!file.type.match("video.*")) {
    FileList;
    console.log("Fichero no permitido");
    var mensaje = document.createElement("mensaje");
    mensaje.id = "mensaje";
    mensaje.innerHTML = "Formato de fichero no válido";

    document.getElementById("list").appendChild(mensaje);
  } else {
    var reader = new FileReader();
    reader.onload = function (theFile) {
      var fileContent = theFile.target.result;
      var video = document.getElementById("figure");
    
      video.innerHTML =
        '<video id="video" autoplay=true onloadeddata="datosCargados()">' +
        '<source  src="' +
        fileContent +
        '" type="video/mp4">' +
        '<p>Navegador no soportado</p"/>' +
        +"</video>";

      document.getElementById("list").appendChild(video);
      document.getElementById('video').volume=0.5;

    };
    reader.readAsDataURL(file);
    reader.onloadstart = function () {
      var cargando = document.createElement("cargando");

      cargando.id = "cargando";
      cargando.innerHTML='<div class="d-flex flex-column align-items-center justify-content-center spinner">'+
      '<div class="row">'+
          '<div class="spinner-border" role="status">'+
              '<span class="sr-only">Loading...</span>'+
          '</div>'+
      '</div>'+
       '<div class="row" >'+
         '<strong>Cargando</strong>'+
       '</div>'+
  '</div>'
     // cargando.innerHTML = '<div class="spinner-border spinner"> <span class="sr-only">Loading...</span></div>';
      document.getElementById("list").appendChild(cargando);
    };
  }
}

function subirVolumen(){
  try{
  document.getElementById('video').volume +=0.1;
  }
  catch (DOMException){
    console.log( "Ya se ha alcanzado volumen máximo");
  }
  finally{
  console.log( document.getElementById('video').volume);
  }
}
function bajarVolumen(){
  try{
    document.getElementById('video').volume -=0.1;
    }
    catch (DOMException){
      console.log( "Ya se ha alcanzado volumen mínimo");
    }
    finally{
    console.log( document.getElementById('video').volume);
    }
}
