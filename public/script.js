$(function() {

	console.log("I live to serve.");

	$.get('/api/taquerias', function(data){
		var taquerias = data;
		// Get: Albums
		taquerias.forEach(function(t){
			console.log(t);
			$('#h1b').append("<li>"+t.name+"</li>");
		});
	});

});