
$(document).ready(function(){
	var audio = document.getElementById('audio');
	audio.play();
	$("body").click(function(){
		audio.play();
	});

	var additions = "";

	var milkText= "";

	var toppingText="";
	

	var flavorText="";

	var iceText="";

	var loopVoice = true;
	$("button").click(function(){
		responsiveVoice.cancel();
		responsiveVoice.speak("That will be 128 dollars. Thank you for choosing Starbucks.","US English Female");
		var order = size+" "+flavorText+drink+ additions + milkText  + toppingText + iceText;
		$(".order").html(order);
		$(".popup").show();
		loopVoice = false;

	});


	var starter = "Can I please get a ";

	var drink = "coffee";

	var size = "";

	var milks = [];

	var toppings = [];

	var flavors = [];

	var ices = [];

	function filteredList(list,element) {
		var newList = list.filter(function(value,index,arr){
			return (value != element);
		});
		return newList;
	};


	$("li").click(function(){ 
		text = "I'll just have a... coffee";
		// responsiveVoice.speak("I'll just have a coffee", "US English Female")
	});

	$(".drink li").click(function(e){ 
		var thisLi =  $(e.currentTarget);
		$(".drink li").removeClass("selected");
		$(thisLi).addClass("selected");
		var thisDrink = $(e.currentTarget).find("h3").html();
		drink = thisDrink;
	});

	$(".size li").click(function(e){ 
		var thisLi =  $(e.currentTarget);
		$(".size li").removeClass("selected");
		$(thisLi).addClass("selected");
		var thisSize  = $(e.currentTarget).html();
		size = thisSize;
	});


	$(".milk li").click(function(e){ 
		var thisLi =  $(e.currentTarget);
		if ($(thisLi).hasClass("selected")){
			$(thisLi).removeClass("selected")
			var thisProperty = $(e.currentTarget).html();
			milks = filteredList(milks,thisProperty);
			
		} else {
			$(thisLi).addClass("selected");
			var thisProperty = $(e.currentTarget).html();
			milks.push(thisProperty);
		}
	});


	$(".topping li").click(function(e){ 
		var thisLi =  $(e.currentTarget);
		if ($(thisLi).hasClass("selected")){
			$(thisLi).removeClass("selected")
			var thisProperty = $(e.currentTarget).html();
			toppings = filteredList(toppings,thisProperty);
			
		} else {
			$(thisLi).addClass("selected");
			var thisProperty = $(e.currentTarget).html();
			toppings.push(thisProperty);
		}
	});


	$(".flavors li").click(function(e){ 
		var thisLi =  $(e.currentTarget);
		if ($(thisLi).hasClass("selected")){
			$(thisLi).removeClass("selected")
			var thisProperty = $(e.currentTarget).html();
			flavors = filteredList(flavors,thisProperty);
			
		} else {
			$(thisLi).addClass("selected");
			var thisProperty = $(e.currentTarget).html();
			flavors.push(thisProperty);
		}
	});
	$(".ice li").click(function(e){ 
		var thisLi =  $(e.currentTarget);
		if ($(thisLi).hasClass("selected")){
			$(thisLi).removeClass("selected")
			var thisProperty = $(e.currentTarget).html();
			ices = filteredList(ices,thisProperty);
			
		} else {
			$(thisLi).addClass("selected");
			var thisProperty = $(e.currentTarget).html();
			ices.push(thisProperty);
		}
	});


	$(".size li, .milk li, .topping li, .flavors li, .ice li").click(function(e){ 
		var thisLi =  $(e.currentTarget);
		var thisProperty = $(e.currentTarget).html();
		responsiveVoice.cancel();
		// responsiveVoice.speak(thisProperty,"US English Female");
		triggerAudio();
	});

	$(".drink li").click(function(e){ 
		var thisLi =  $(e.currentTarget);
		var thisDrink = $(e.currentTarget).find("h3").html();
		responsiveVoice.cancel();
		// responsiveVoice.speak(thisDrink,"US English Female");
		triggerAudio();
	});


	function triggerAudio(){
		additions = "";
		if (milks.length > 0 || toppings.length  > 0  || ices.length > 0 ){
			additions = "with ";
		}

		 milkText= "";
		for (var i = 0; i < milks.length; i++){
			milkText += milks[i] +", ";
		}
		 toppingText="";
		for (var i = 0; i < toppings.length; i++){
			toppingText += toppings[i] +", ";
		}

		 flavorText="";
		for (var i = 0; i < flavors.length; i++){
			flavorText += flavors[i] +", ";
		}
		 iceText="";
		if (ices.length > 0 && ( milks.length > 0 || toppings.length  > 0) ){
			iceText = "and";
		}
		for (var i = 0; i < ices.length; i++){
			iceText += ices[i] +", ";
		}


		var text = starter +size+" "+flavorText+drink+ additions + milkText  + toppingText + iceText;
		responsiveVoice.speak(text,"US English Female");

	}

setInterval(function(){

	if(!responsiveVoice.isPlaying() && loopVoice) {
		triggerAudio();
	  		
	}
}, 2000);

});

