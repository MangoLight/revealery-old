/*
* Revealery, a jQuery plugin that reveals the children of an element in a random order.
* Developed by MangoLight Web Agency
* http://www.mangolight.com
*
* Revealery, un plugin jQuery pour faire apparaître de manière aléatoire les enfants d'un élément.
* Développé par l'agence Web MangoLight
* http://www.mangolight.com
*
* Released under the Apache License v2.0.
*/
(function($){
    $.fn.revealery = function(options,callback){
        var settings = $.extend({
            beginning_delay: 300, // Delay before starting to make elements appear
            delay_between: 150, // Delay between two apparitions
            duration: 500, // Duration of each apparition
            recursive: false // Apply revealery on the children of the object
        }, options);
		
        return this.each(function(){
            var children = $(this).children().stop().css({'opacity':0}); // Put opacity to 0 for each children
            setTimeout(function(){ showObj(); },settings.beginning_delay); // Start to show children after the beginning_delay
			
			/* Show the children */
            function showObj(){
                var random = Math.floor(Math.random() * children.length);
                var obj = $(children[random]); // obj is a random child
                obj.stop().animate({'opacity':1},settings.duration); // show that child
                if(settings.recursive) obj.revealery(settings); // call revealery on that object if recursive is true
                
                children.splice(random,1); // Remove that child from the children array
                if (children.length>0){ // If there are yet children to make appear
                    setTimeout(function(){ showObj(); },settings.delay_between); // Show them after the delay_between
                }else{ // If all the children has been shown, call the callback
                    setTimeout(function(){
                        if(typeof callback=='function'){
                            callback.call(this);
                        }
                    },settings.duration); // Wait for the last child to be shown before calling the callback
                }
            }
        });
    };
})(jQuery);