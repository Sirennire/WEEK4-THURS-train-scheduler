var config = {
    apiKey: "AIzaSyA21CmBdx79_wQJcwE3trbPkUqdhcrhbBg",
    authDomain: "fir-hw-1.firebaseapp.com",
    databaseURL: "https://fir-hw-1.firebaseio.com",
    projectId: "fir-hw-1",
    storageBucket: "fir-hw-1.appspot.com",
    messagingSenderId: "218378892162"
  };

firebase.initializeApp(config);
//var audio = new Audio("assets/images/trains003.mp3");
//audio.volume = 0.2;
var database = firebase.database();

$("#add-train").on("click", function() {
	 //event.preventDefault();
	
	 database.ref().push({
        name: $("#name-input").val(),
        des: $("#des-input").val(),
        ftt: $("#ftt-input").val(),
        freq: $("#freq-input").val(),
      });

	 $("#name-input").val("");
	 $("#des-input").val("");
	 $("#ftt-input").val("");
	 $("#freq-input").val("");
});

//audio.play();

database.ref().on("child_added", function(childSnapshot) {

  var tFrequency = childSnapshot.val().freq;
  //console.log(tFrequency);

  var firstTime = moment(childSnapshot.val().ftt, "hh:mm");
  //console.log(firstTime);

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  //console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  //console.log("CURRENT TIME: " + moment(currentTime).format("h:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  //console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  //console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("h:mm A");
 // console.log(nextTrain);

	$(".table").append("<tr><td> " + childSnapshot.val().name +
        " </td><td> " + childSnapshot.val().des +
        " </td><td> " + childSnapshot.val().ftt +
        " </td><td> " + childSnapshot.val().freq +
        " </td><td> " + nextTrain +
      	" </td><td> " + tMinutesTillTrain +
      	" </td></tr>");

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


// const serverTime = firebase.database.ServerValue.TIMESTAMP;
// setInterval(() => {
//   database.ref().on('value',(snapshot) => {
//     snapshot.val();
//     updatedDate = snapshot.val().storageTime;
//     snapshot.val().storageTime - serverTime;
//     database.ref().update({ storageTime: updatedDate })
//   });
// }, 60000);



