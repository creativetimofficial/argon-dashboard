

$("#myBtn").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#myBtn").click();
    }
});

function myFunction(){
		var user_id=document.getElementById("trackingNumber").value;
		window.location.href="?trackingNumber="+user_id+"&language=it";
	}

var trackid = window.location.search;

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api-eu.dhl.com/track/shipments" + trackid,
  "method": "GET",
  "headers": {
    "DHL-API-Key": "dhl-try-it-out-key",
    "Content-Type": "application/json",
  },
  "data": ""
}

$.ajax(settings).done(function (jcontent){
    
    
    
    var color1 = "badge badge-pill badge-primary" ;
var logo = "ni ni-spaceship" ;
var bagde = "badge badge-pill badge-primary" ;   

  var event = jcontent.shipments[0].status.description;

if (event == 'Spedizione in consegna'|| event == 'With delivery courier'){
    var colork = "-info" ;
    var logo = "ni ni-delivery-fast" ;
    var color1 = "badge badge-pill badge-info" ;
    var bagde = "badge badge-pill badge-info" ;
    }
else if (event == 'Spedizione ritirata' || event == 'Shipment picked up'  || event.includes("istruzioni") || event.includes("instruction")) {
    var logo = "ni ni-box-2"
    var colork = "-default" 
    var color1 = "badge badge-pill badge-default" 
    var bagde = "badge badge-pill badge-default" ;
}
else if (event.includes("Spedizione Consegnata") || event.includes("Delivered")){
    var colork = "-success"  ;
    var color1 = "badge badge-pill badge-success" ;
    var logo = "ni ni-check-bold" ;
    var bagde = "badge badge-pill badge-success" ;
}
else if (event.includes("Spedizione arrivata") || event.includes("Arrived at Delivery")){
    var colork = "-warning"  ;
    var logo = "ni ni-pin-3" ;
}
else if (event == 'Errore' || event == 'Error'){
    var colork = "-allert"  ;
    var logo = "ni ni-bell-55" ;
}

else  var colork =  "-primary" ;
   
   var last = document.getElementById('last');
last.innerHTML += '<div class="card-body"><div class="row"><div class="col"><h5 class="card-title text-uppercase text-muted mb-0" id>' + jcontent.shipments[0].status.timestamp + '</h5><span class="h2 text' + colork + ' font-weight-bold mb-0">' + jcontent.shipments[0].status.description + '</span></div><div class="col-auto"><div class="icon icon-shape bg' + colork + ' text-white rounded-circle shadow"><i class="' + logo + '"></i></div></div></div><p class="mt-3 mb-0 text-sm"><span class="text mr-2"> Numero spedizione : </i></span><span class="text-nowrap">' + jcontent.shipments[0].id + '</span></p><p class="mt-3 mb-0 text-sm"> <span class="text-success mr-2"><i class="fas fa-map-marker-alt"></i> Da : </span> <span class="text-nowrap">' + jcontent.shipments[0].origin.address.addressLocality + '</span> </p><p class="mt-3 mb-0 text-sm"> <span class="text-success mr-2"><i class="fas fa-map-marker-alt"></i> A : </span> <span class="text-nowrap">' + jcontent.shipments[0].destination.address.addressLocality + '</span> </p></div>';
   


var output = document.getElementById('id');
output.innerHTML = 'Spedizione : ' + jcontent.shipments[0].id;

for (var i = 0; i < jcontent.shipments[0].events.length; i++) {
    
    
  var color1 = "badge badge-pill badge-primary" ;
var logo = "ni ni-spaceship" ;
var bagde = "badge badge-pill badge-primary" ;   

  var event = jcontent.shipments[0].events[i].description;

if (event == 'Spedizione in consegna'|| event == 'With delivery courier'){
    var color = "timeline-step badge-info" ;
    var logo = "ni ni-delivery-fast" ;
    var color1 = "badge badge-pill badge-info" ;
    var bagde = "badge badge-pill badge-info" ;
    }
else if (event == 'Spedizione ritirata' || event == 'Shipment picked up') {
    var logo = "ni ni-box-2"
    var color = "timeline-step badge-default" 
    var color1 = "badge badge-pill badge-default" 
    var bagde = "badge badge-pill badge-default" ;
}
else if (event.includes("Spedizione Consegnata") || event.includes("Delivered")){
    var color = "timeline-step badge-success"  ;
    var color1 = "badge badge-pill badge-success" ;
    var logo = "ni ni-check-bold" ;
    var bagde = "badge badge-pill badge-success" ;
}
else if (event.includes("Spedizione arrivata") || event.includes("Arrived at Delivery")){
    var color = "timeline-step badge-warning"  ;
    var color1 = "badge badge-pill badge-warning";
    var logo = "ni ni-pin-3" ;
    var bagde = "badge badge-pill badge-warning" ;
}
else if (event == 'Errore' || event == 'Error'){
    var color = "timeline-step badge-allert"  ;
    var color1 = "badge badge-pill badge-allert" ;
    var logo = "ni ni-bell-55" ;
    var bagde = "badge badge-pill badge-allert" ;
}

else  var color =  "timeline-step badge-primary" ;

 // Time
	var d = new Date(jcontent.shipments[0].events[i].timestamp);
var formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
var formattedTime = hours + ":" + minutes;

var formattedDate = formattedDate + " " + formattedTime;
    
    
var output1 = document.getElementById('output');
output1.innerHTML += '<div class="timeline-block"><span class="' + color + '"><i class="' + logo + '"></i></span><div class="timeline-content"><small class="text-muted font-weight-bold">' + formattedDate + '</small><h5 class=" mt-3 mb-0">' + jcontent.shipments[0].events[i].location.address.addressLocality + '</h5><p class=" text-sm mt-1 mb-0">' + jcontent.shipments[0].events[i].description + '</p><div class="mt-3"><span class="' + color1 + '">' + jcontent.shipments[0].id + '</span></div></div></div>';


document.getElementById("trackingNumber").value = jcontent.shipments[0].id;

}
})


