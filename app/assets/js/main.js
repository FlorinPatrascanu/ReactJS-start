$(document).ready(function() {
	window.validateSelf = function(arg) {		/* 
			Usage for inputs & textarea: $("input textarea").on("focusout", function(e){ validateSelf(this); });
			Usage for select: $("select").on("change", function(e){ validateSelf(this); });
			Behaviour: Can be attached to any text input, select, textarea. !!!Password field check is hardcoded and needs to be updated!!!
			WIP: Separate password field check from the function.
		*/
		var value = arg.val();
		var name = arg.attr("name");
		// var type = arg.type;
		// var tag = arg.tagName
		
		// var passwordFieldID = "#" + passwordField;
		// var passwordFieldConfirmID = "#" + passwordFieldConfirm;
		// Password Field Configuration END - !Hardcoded!
		
		
		if (arg.is(":radio") || arg.is(":checkbox")) { //ignores radio and checkbox inputs
			return false;
		}

	  //If FIELD is Empty
		if (value === "") { 
	    validateStateEvent(arg,"neutral");
	    return;
	  }

	  //If FIELD is Email
	  if (name.search("Email") !== -1 || name.search("E-mail") !== -1) { 
	    if (value.search(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/) !== -1) {
	      validateStateEvent(arg,"valid");
	    } else {      
	    	arg.val("");
	      validateStateEvent(arg,"invalid-email");
	    }
	    return;
	  }

	  //If FIELD is Phone
	  if (name.search("Phone") !== -1) { 
	    if ((value.search(/(?:\(?\+\d{2}\)?\s*)?\d+(?:[ -]*\d+)*$/) !== -1) && (value.length === 10)) {
	      validateStateEvent(arg,"valid"); 
	    } else {  	      
	      arg.val("");
	      validateStateEvent(arg,"invalid-phone");
	    }
	    return;
	  }

	  
	  validateStateEvent(arg,"valid");
	} 

	window.validateStateEvent = function(arg,state) {
		/*
			Usage with objects: validateStateEvent(this,"state");
			Usage with jQuery elements: validateStateEvent($(this)[0],"state");
			Behaviour: Adds/Removes classes based on event triggered by the "state" argument of the function. Can further customized on demand.
		*/
		// var classList = arg.classList;
		var correct = "input-valid"; //css class for valid input
		var error = "input-invalid"; //css class for invalid input
		var emailError = "Please fill in a valid email address."; //email invalid error message -- special event
		var phoneError = "Please fill in a valid phone number."; //phone invalid error message -- special event
		if (state === "neutral") { 
			arg.removeClass(error);
  		arg.removeClass(correct);
			return;
		}
		if (state === "valid") {
			arg.removeClass(error);
  		arg.addClass(correct);
  		arg.parent().find(".popover").remove();
			return;
		}
		if (state === "invalid") {
			arg.removeClass(correct);
  		arg.addClass(error);
  		return;
		}
		if (state === "invalid-email") {
			arg.removeClass(correct);
  		arg.addClass(error);
  		arg.popover({content: "Please enter a valid e-mail.",placement: "top"});
  		arg.popover("show");
  		return;
		}
		if (state === "invalid-phone") {
			arg.removeClass(correct);
  		arg.addClass(error);  			    
  		return;
		}
		arg.addClass(correct);
	}




	$('input[type="text"], textarea').on("focusout", function(e){		
		validateSelf($(this));
	});
	$("select").on("change", function(e){
		validateSelf($(this));
	});


	

});
