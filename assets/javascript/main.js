var config = {
    apiKey: "AIzaSyA21CmBdx79_wQJcwE3trbPkUqdhcrhbBg",
    authDomain: "fir-hw-1.firebaseapp.com",
    databaseURL: "https://fir-hw-1.firebaseio.com",
    projectId: "fir-hw-1",
    storageBucket: "fir-hw-1.appspot.com",
    messagingSenderId: "218378892162"
  };

firebase.initializeApp(config);
var audio = new Audio("assets/images/trains003.mp3");
audio.volume = 0.2;
var database = firebase.database();

$("#add-train").on("click", function() {
	 //event.preventDefault();
	 

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
});

	audio.play();

database.ref().on("child_added", function(childSnapshot) {

	var now = moment();
	var then = moment(childSnapshot.val().ftt, "hh:mm");
	var now2 = Math.round(now/1000/60);
	var then2 = Math.round(then/1000/60);

	if (then < now) {
		min = Math.round(now-then)/1000/60; 
		f = childSnapshot.val().freq;
		m = f-(Math.round(min%f));
	}

	else if (then === now) {
		m = childSnapshot.val().freq
	}

	else {
		min = Math.round(then - now)/1000/60; 
		f = childSnapshot.val().freq;
		m = Math.round(min%f);
		//min2 = then2-now2;
		//m2 = (min2%f);
		//console.log(m2, m);
	}

	var endDate = moment();
	var startDate = moment(endDate).subtract(1, 'days');

	var ss = moment().subtract(1,'days').add(m, "m").format('h:mm A');
	var ss2 = moment().subtract(1,'days').add(m, "m").add(1, 'days').format('MM D YYYY h:mm A');
	
	var ss3 = moment().subtract(1,'days').add(m, "m").add(1, 'days').format('D');
	var ss4 = moment().format('D');

	$(".table").append("<tr><td> " + childSnapshot.val().name +
        " </td><td> " + childSnapshot.val().des +
        " </td><td> " + childSnapshot.val().freq +
        " </td><td> " + ss +
      	" </td><td> " + m +
      	" </td></tr>");

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



