angular.module('responymous')
  .controller('ResponseCtrl', function( CONFIG ) {
    var ref = new Firebase(CONFIG.Firebase.baseUrl);
    var self = this;

    // *** Get these values dynamically ***
    var classID = "Q42014FEEORL";

    var class_VoteTotals = ref.child("classes/"+classID+"/vote_totals");
    
    class_VoteTotals.on('child_changed', function(snap_voteChanged) {
      class_VoteTotals.child("1").once("value", function(snap_1s){
        class_VoteTotals.child("2").once("value", function(snap_2s){
          red = snap_1s.val() + snap_2s.val();
        });
      });

      class_VoteTotals.child("3").once("value", function(snap_3s){
        yellow = snap_3s.val();
      });

      class_VoteTotals.child("4").once("value", function(snap_4s){
        class_VoteTotals.child("5").once("value", function(snap_5s){
          green = snap_4s.val() + snap_5s.val();
        });
      });

      var total = red + yellow + green;
      var progress = [
        { count: red,
          percent: ((red/total)*100).toFixed(2) +'%' },
        { count: yellow,
          percent: ((yellow/total)*100).toFixed(2) +'%' },
        { count: green,
          percent: ((green/total)*100).toFixed(2) +'%' }
      ]

      $('#red').width(progress[0].percent).children('div').text(progress[0].count);
      $('#yellow').width(progress[1].percent).children('div').text(progress[1].count);
      $('#green').width(progress[2].percent).children('div').text(progress[2].count);

    });
})
;
