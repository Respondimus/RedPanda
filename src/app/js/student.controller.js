angular.module('responymous')
  .controller('StudentCtrl', function( CONFIG) {
    var ref = new Firebase(CONFIG.Firebase.baseUrl);
    var self = this;

    this.addVote=function(selection){

      //Get current date
      var currDate = (new Date()).toISOString().slice(0,10).replace(/-/g,"");

      // *** Need to get these values dynamically ***
      var userID = "8822941";
      var classID = "Q42014FEEORL";

      //Record vote in Firebase
      ref.child("votes").push({
        class_id: classID,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        date: currDate,
        score: selection,
        student_id: userID
      });

      var user_LastVote = ref.child("users/"+userID+"/last_vote");
      var class_VoteTotals = ref.child("classes/"+classID+"/vote_totals");

      user_LastVote.once("value", function(snap_user){
        class_VoteTotals.once("value", function(snap_class){

          var class_LastVote = class_VoteTotals.child(snap_user.val());

          class_LastVote.transaction(function(snap_lastVote){

            //Decrements class tally for user last vote
            return snap_lastVote - 1;
          });

          var class_CurrVote = class_VoteTotals.child(selection);
          class_CurrVote.transaction(function(snap_currVote){

            //Increments class tally for user selection
            return snap_currVote + 1;
          });

          //Updates user last vote
          user_LastVote.set(selection);
        })
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      
  })
