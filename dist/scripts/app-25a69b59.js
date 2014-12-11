"use strict";angular.module("responymous",["ngAnimate","ngCookies","ngTouch","ui.router","firebase"]).config(["$stateProvider","$urlRouterProvider",function(t,n){t.state("home",{url:"/",templateUrl:"app/partials/main.html",controller:"MainCtrl as app"}).state("student",{url:"/student",templateUrl:"app/partials/student.html",controller:"StudentCtrl as student"}).state("instructor",{url:"/instructor",templateUrl:"app/partials/instructor.html",controller:"InstructorCtrl as instructor"}),n.otherwise("/")}]).constant("CONFIG",{Firebase:{baseUrl:"https://responymousdevdb.firebaseio.com"}}),angular.module("responymous").factory("Firebase",["CONFIG",function(t){return new Firebase(t.Firebase.baseUrl)}]).factory("Auth",["Firebase","$firebaseAuth","$firebase",function(t,n,e){function a(n){if(null===n)return null;var a=e(t.child("users").child(n.github.id)).$asObject();return angular.extend(a,{access_token:n.github.accessToken,email:n.github.email,name:n.github.displayName,current_class:"Q42014FEEORL",student:!0}),t.child("userClasses").child(n.github.id).set("Q42014FEEORL"),a.$save(),a}var s=n(t);return{onAuth:function(t){s.$onAuth(function(n){t(a(n))})},login:function(){return s.$authWithOAuthRedirect("github")},logout:function(){s.$unauth()}}}]).controller("MainCtrl",["Auth","$location","$state",function(t,n,e){var a=this;this.login=t.login,this.logout=t.logout,t.onAuth(function(t){a.user=t,null==t?e.go("home"):"Q42014FEEORL"==t.current_class&&e.go(t.student?"student":"instructor")})}]),angular.module("responymous").controller("InstructorCtrl",["Auth","Firebase","$timeout","$firebase",function(t,n,e,a){var s,r,o,i,l,u=this;t.onAuth(function(t){s=t.$id,r=t.current_class,n.child("classUsers").child(r).on("value",function(t){var n=a(t.ref()).$asObject();n.$loaded().then(function(){o=0,i=0,l=0,angular.forEach(n,function(t){t.current_vote<=2&&(o+=1),t.current_vote>3&&(l+=1),3==t.current_vote&&(i+=1)}),u.cntRed=o,u.cntYellow=i,u.cntGreen=l,u.wthRed=(o/(o+i+l)*100).toFixed(2),u.wthYellow=(i/(o+i+l)*100).toFixed(2),u.wthGreen=(l/(o+i+l)*100).toFixed(2)})})})}]),angular.module("responymous").controller("StudentCtrl",["Auth","Firebase","$timeout","$firebase","$state",function(t,n,e,a){var s=this;t.onAuth(function(t){s.isDisabled=!1,s.addVote=function(r){var o=t.$id,i=t.current_class;this.isDisabled=!0;var l=(new Date).toISOString().slice(0,10).replace(/-/g,""),u=a(n.child("votes")).$asArray();u.$add({class_id:i,date:l,score:r,student_id:o});var c=a(n.child("classUsers").child(i).child(o)).$asObject();c.$loaded().then(function(){c.current_vote=r,c.$save()}),e(function(){s.isDisabled=!1},3e3)}})}]),function(t){try{t=angular.module("responymous")}catch(n){t=angular.module("responymous",[])}t.run(["$templateCache",function(t){t.put("app/partials/instructor.html",'<div class="container" id="instructor"><div class="progress"><div class="progress-bar progress-bar-danger" style="width: {{ instructor.wthRed }}%"><div title="danger" class="bar" id="prgwidth">{{ instructor.cntRed }}</div></div><div class="progress-bar progress-bar-warning" style="width: {{ instructor.wthYellow }}%"><div title="warning" class="bar" id="prgwidth">{{ instructor.cntYellow }}</div></div><div class="progress-bar progress-bar-success" style="width: {{ instructor.wthGreen }}%"><div title="success" class="bar" id="prgwidth">{{ instructor.cntGreen }}</div></div></div></div>')}])}(),function(t){try{t=angular.module("responymous")}catch(n){t=angular.module("responymous",[])}t.run(["$templateCache",function(t){t.put("app/partials/main.html",'<div class="container" id="login"><div class="col-xs-12" ng-hide="app.user"><h1>Please login to continue:</h1><button class="btn btn-lg btn-primary btn-block" ng-click="app.login()"><img src="app/images/GitHub-Mark-Light-64px.png">Login with GitHub</button></div></div>')}])}(),function(t){try{t=angular.module("responymous")}catch(n){t=angular.module("responymous",[])}t.run(["$templateCache",function(t){t.put("app/partials/student.html",'<div class="container"><nav class="navbar navbar-default" role="navigation"><h3>Hello, {{app.user.name}}!</h3><button type="button" class="btn btn-danger navbar-btn" ng-click="app.logout()">Logout</button></nav><div id="student" class="row"><div class="col-xs-12"><h2>How are you tracking?</h2><div class="btn-group-vertical" role="group"><button type="button" class="green btn btn-default btn-lg" ng-click="student.addVote(5)" ng-disabled="student.isDisabled"><strong>5</strong> - I am pwning these concepts</button> <button type="button" class="green btn btn-default btn-lg" ng-click="student.addVote(4)" ng-disabled="student.isDisabled"><strong>4</strong> - Doing aight...LOL</button> <button type="button" class="yellow btn btn-default btn-lg" ng-click="student.addVote(3)" ng-disabled="student.isDisabled"><strong>3</strong> - I haz question, whatever</button> <button type="button" class="red btn btn-default btn-lg" ng-click="student.addVote(2)" ng-disabled="student.isDisabled"><strong>2</strong> - So many ?s. Much struggle.</button> <button type="button" class="red btn btn-default btn-lg" ng-click="student.addVote(1)" ng-disabled="student.isDisabled"><strong>1</strong> - Totally lost. Halp.</button><h1 class="col-xs-12" ng-show="student.isDisabled">Thanks for your input!</h1></div></div></div></div>')}])}(),function(t){try{t=angular.module("responymous")}catch(n){t=angular.module("responymous",[])}t.run(["$templateCache",function(t){t.put("components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" ng-controller="NavbarCtrl"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right"><li>Current date: {{ date | date:\'yyyy-MM-dd\' }}</li></ul></div></nav>')}])}();