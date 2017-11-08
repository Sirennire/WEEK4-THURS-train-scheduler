var config = {
    apiKey: "AIzaSyA21CmBdx79_wQJcwE3trbPkUqdhcrhbBg",
    authDomain: "fir-hw-1.firebaseapp.com",
    databaseURL: "https://fir-hw-1.firebaseio.com",
    projectId: "fir-hw-1",
    storageBucket: "fir-hw-1.appspot.com",
    messagingSenderId: "218378892162"
  };

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

$("#add-train").on("click", function(event) {
	 event.preventDefault();
	 
	 database.ref().push({
        name: $("#name-input").val(),
        des: $("#des-input").val(),
        ftt: $("#ftt-input").val(),
        freq: $("#freq-input").val(),
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
      });

	 $("#name-input").val("");
	 $("#des-input").val("");
	 $("#ftt-input").val("");
	 $("#freq-input").val("");
	 //console.log($("#ftt-input").val());

});

database.ref().on("child_added", function(childSnapshot) {
	//console.log(childSnapshot.val().fft);
	//console.log(childSnapshot.val().freq)
	console.log(then);
	var hours = parseInt(childSnapshot.val().ftt); 

	var now = new Date().getTime();
	var then = new Date().getTime(childSnapshot.val().ftt);
	var mins = then - now; 


	//var then2 = new Date(childSnapshot.val().date).getTime(); 
	//var numMil = now - then2; 
	//var months = Math.round(numMil/1000/60/60/24/30.42);
	//var billed = months * (childSnapshot.val().rate);
	//console.log(months);
	//console.log(billed);

      // Log everything that's coming out of snapshot
      //console.log(now);
      //console.log(then);
      //console.log(mins);
      //console.log(childSnapshot.val().rate);

      // full list of items to the well
      $(".table").append("<tr><td> " + childSnapshot.val().name +
        " </td><td> " + childSnapshot.val().des +
        " </td><td> " + childSnapshot.val().freq +
        " </td><td> " + mins +
      	" </td><td> " + mins +
      	" </td></tr>");
      	//console.log(childSnapshot.val().name, childSnapshot.val().des);

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
