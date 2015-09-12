"use strict";delete Array.prototype.initialize,angular.module("eMergencyApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","geolocation","LocalStorageModule","angularMoment","infinite-scroll","scrollable-table","uiGmapgoogle-maps"]).config(["$routeProvider","localStorageServiceProvider","uiGmapGoogleMapApiProvider",function(a,b,c){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main",resolve:{$db:["$db",function(a){return a.ready()}]}}).when("/about/",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/register/",{templateUrl:"views/registration.html",controller:"RegisterCtrl"}).when("/login/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/event/:id",{templateUrl:"views/event.html",controller:"EventCtrl",resolve:{$db:["$db",function(a){return a.ready()}]}}).otherwise({redirectTo:"/"}),b.setPrefix("eMergencyApp").setStorageType("localStorage").setNotify(!0,!0),c.configure({libraries:"weather"})}]).run(["amMoment",function(a){a.changeLocale("de")}]),angular.module("eMergencyApp").controller("MainCtrl",["$scope","$rootScope","$db","$location","userService","eventService","geolocationService",function(a,b,c,d,e,f,g){var h,i,j;a.userService=e,a.events=[],a.map={markers:[],myMarker:[]},a.go=function(a){d.path(a)},a.addEvent=function(){f.add({})},a.paginateEvents=function(){var b=new Date(a.events[a.events.length-1].date).getTime();f.load(b,5).then(function(b){angular.forEach(b,function(b){a.events.push(b)})})},a.$watch("selected",function(b){a.$broadcast("rowSelected",b)}),f.load((new Date).getTime(),5).then(function(b){a.events=b,angular.forEach(b,function(b){b.location&&b.location.latitude&&b.location.longitude&&a.map.markers.push(h(b))}),f.subscribe(function(b,c){a.events.unshift(c),c.location&&c.location.latitude&&c.location.longitude&&a.map.markers.push(h(c))})},function(a){console.log(a)}),i=function(b){b&&(a.map.center={latitude:b.lat,longitude:b["long"]},a.map.zoom=12,a.map.options={scrollwheel:!1},j(g.location))},j=function(b){b&&(a.map.myMarker={id:"myMarker",latitude:b.lat,longitude:b["long"],options:{zIndex:1e3}})},h=function(a){var b={id:a.id,latitude:a.location.latitude,longitude:a.location.longitude,icon:"images/map/"+a.type.bezeichnung+".png",content:a.type.bezeichnung+"<br />"+a.additional,showWindow:!1};return b},b.$on("new-location",function(){i(g.location)}),i(g.location)}]),angular.module("eMergencyApp").controller("AboutCtrl",function(){console.log("about"),this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("eMergencyApp").service("eventService",["$rootScope","$q","$db","userService","geolocationService",function(a,b,c,d,e){var f=this;this.eventTypes={},this.load=function(a,d){var e=b.defer();return c.Event.find().lessThan("date",new Date(a)).descending("date").limit(d).resultList().then(function(a){var c=[];angular.forEach(a,function(a,b){null!==a.type&&c.push(a.type.load().then(function(b){a.type=b}))}),b.all(c).then(function(){e.resolve(a)})},function(a){e.reject(a)}),e.promise},this.getById=function(a){var d=b.defer();return c.Event.load(a,{depth:!0}).then(function(a){d.resolve(a)},function(a){d.reject(a)}),d.promise},this.add=function(a){return a.date=new Date,a.user=d.user,a.location=e.location.lat+";"+e.location["long"],b(function(b,d){c.Event(a).insert(function(a){b(a)},function(a){d(a)})})},this.update=function(a){return b(function(b,c){a.save({force:!0}).then(function(a){b(a)},function(a){c(a)})})},this.subscribe=function(b){a.$on("notifying-service-event",b);c.ready().then(function(){var b=c.Event.find().stream(!1);b.on("all",function(b){var c=b.data;null!==c.type&&c.type.load().then(function(b){c.type=b,a.$emit("notifying-service-event",c),a.$apply()})})})},this.getEventtypes=function(){c.Eventtype.find().resultList().then(function(a){angular.forEach(a,function(a){f.eventTypes[a.bezeichnung]=a})})},c.ready().then(function(){f.getEventtypes()})}]),angular.module("eMergencyApp").service("geolocationService",["$rootScope","geolocation","localStorageService","$http","$q",function(a,b,c,d,e){var f=this,g={};this.get=function(){this.getStorage(),this.getBrowser()},this.update=function(){this.getBrowser()},this.getBrowser=function(){var d=new Date;b.getLocation().then(function(b){g={lat:b.coords.latitude,"long":b.coords.longitude,time:d,error:0},c.set("geoLoc",g),f.location=g,a.$emit("new-location")},function(b){alert(b),g=f.getIp().then(function(b){f.location=b,a.$emit("new-location")})})},this.getStorage=function(){c.get("geoLoc")&&(g=c.get("geoLoc"),f.location=g,a.$emit("new-location"))},this.getIp=function(){d.get("http://ipinfo.io/json").then(function(b){var c=b.data.loc.split(","),d={lat:c[0],"long":c[1],time:new Date,error:3};f.location=d,a.$emit("new-location")})},this.get()}]),angular.module("eMergencyApp").service("userService",["$q","$db","$rootScope",function(a,b,c){var d=this;this.guest=null,this.user={},this.getCurrentUser=function(){b.User.me?this.user=b.User.me:this.guest=!0},this.register=function(d,e){var f=a.defer();return b.User.register(d,e).then(function(a){f.resolve(a),c.$digest()},function(a){f.reject(a),c.$digest()}),f.promise},this.login=function(d,e){var f=a.defer();return b.User.login(d,e).then(function(a){f.resolve(a),c.$digest()},function(a){f.reject(a),c.$digest()}),f.promise},this.logout=function(){var d=a.defer();return b.User.logout().then(function(a){d.resolve(a),c.$digest()},function(a){d.reject(a),c.$digest()}),d.promise},b.ready(function(){d.getCurrentUser(),c.$apply()})}]);var dbconnected=!1;angular.module("eMergencyApp").service("$db",function(){return dbconnected||(DB.connect("https://julian.baqend.com"),dbconnected=!0),DB}),angular.module("eMergencyApp").controller("HeaderCtrl",["$scope","$db","$location","userService",function(a,b,c,d){a.userService=d,a.isActive=function(a){return a===c.path()},a.logout=function(){d.logout().then(function(a){window.location.href="/"},function(a){console.log(a)})}}]),angular.module("eMergencyApp").controller("RegisterCtrl",["$scope","userService",function(a,b){a.user={},a.password="",a.register=function(a,c){b.register(a,c).then(function(a){window.location.href="/"},function(a){console.log(a)})}}]),angular.module("eMergencyApp").controller("LoginCtrl",["$scope","userService",function(a,b){a.user="",a.password="",a.login=function(a,c){b.login(a,c).then(function(a){window.location.href="/"},function(a){console.log(a)})}}]),angular.module("eMergencyApp").controller("EventCtrl",["$scope","$routeParams","$db","geolocationService","eventService",function(a,b,c,d,e){var f,g;a.map={markers:[]},a.event={},a.update=function(a){e.update(a)},e.getById(b.id).then(function(b){g(d.location),a.map.markers.push(f(b)),a.event=b}),g=function(b){a.map.center={latitude:b.lat,longitude:b["long"]},a.map.zoom=10,a.map.options={scrollwheel:!1}},f=function(a){var b={id:a.id,latitude:a.location.latitude,longitude:a.location.longitude,icon:"images/eventtype/"+a.type.bezeichnung+".png"};return b}}]),angular.module("eMergencyApp").controller("EventFormCtrl",["$scope","$rootScope","eventService","geolocationService","userService",function(a,b,c,d,e){a.userName=e.user.username,a.position=d.location.lat+", "+d.location["long"],a.newEvent={},a.setMyMarker=function(){d.update(),b.$on("new-location",function(){a.position=d.location.lat+", "+d.location["long"]})},a.addEvent=function(){var b={type:c.eventTypes[a.newEvent.type],additional:a.newEvent.additional};c.add(b),a.newEvent={}},a.cancel=function(){a.newEvent={}},a.quickEvent=function(b){"handwerk"==b?(a.newEvent.type="handwerk",$("#additional").focus()):(a.newEvent={type:b,additional:"Quick Event! EMERGENCY!!!"},a.addEvent())}}]),angular.module("eMergencyApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/event.html",'<div class="row"> <div class="col-md-8"> <div id="map_canvas"> <ui-gmap-google-map center="map.center" zoom="map.zoom" options="map.options"> <ui-gmap-markers idkey="id" models="map.markers" docluster="false" coords="\'self\'" icon="\'icon\'"> </ui-gmap-markers> </ui-gmap-google-map> </div> </div> <div class="col-md-4"> {{ event }} <input type="checkbox" ng-model="event.done" ng-change="update(event)"> </div> </div>'),a.put("views/eventcreation.html",'<div class="container-fluid" ng-controller="EventFormCtrl"> <div class="row quickevents"> <div class="col-sm-3 col-xs-3 col-md-3 text-center emergencybtn"><button type="button" ng-click="quickEvent(\'personenschaden\')" class="btn btn-danger"><img class="emergencybtn" src="images/buttons/herz.png"></button></div> <div class="col-sm-3 col-xs-3 col-md-3 text-center emergencybtn"><button type="button" ng-click="quickEvent(\'feuer\')" class="btn btn-warning"><img class="emergencybtn" src="images/buttons/feuer.png"></button></div> <div class="col-sm-3 col-xs-3 col-md-3 text-center emergencybtn"><button type="button" ng-click="quickEvent(\'unfall\')" class="btn btn-success"><img class="emergencybtn" src="images/buttons/unfall.png"></button></div> <div class="col-sm-3 col-xs-3 col-md-3 text-center emergencybtn"><button type="button" ng-click="quickEvent(\'handwerk\')" class="btn btn-primary"><img class="emergencybtn" src="images/buttons/hammer.png"></button></div> </div> <div class="page-header"> <h1 class="page-header">Neues Ereignis melden</h1> </div> <form ng-submit="addEvent()"> <!-- Eventtype --> <div class="row"> <div class="col-xs-11"> <div class="form-group"> <label>Ereignis</label> <select ng-model="newEvent.type" class="form-control" required> <option value="">Bitte wählen...</option> <option value="personenschaden">Personenschaden</option> <option value="feuer">Feuer</option> <option value="unfall">Unfall/Panne</option> <option value="handwerk">Handwerk</option> </select> </div> </div> <div class="col-xs-1"> <label>Pos.</label> <button type="button" ng-click="setMyMarker()" class="btn btn-default glyphicon glyphicon-map-marker"></button> </div> </div> <!-- get location --> <!-- <div class="row">\n      <div class="col-sm-12 col-xs-12 col-md-12">\n        <div class="input-group">\n          <span class="input-group-addon">Ort</span>\n          <input type="text" class="form-control" ng-model="position" readonly>\n          <button type="button" ng-click="setMyMarker()" class="btn btn-default glyphicon glyphicon-map-marker"></button>\n        </div>\n      </div>\n    </div> --> <!-- User --> <!-- <div class="row">\n      <div class="col-sm-12 col-xs-12 col-md-12">\n        <div class="input-group">\n          <span class="input-group-addon" id="basic-addon1">gemeldet von</span>\n          <input type="text" class="form-control" ng-model="userName" readonly></div>\n        </div>\n    </div> --> <!-- event discription --> <!-- <div class="row">\n      <div class="col-sm-12 col-xs-12 col-md-12">\n        <div class="input-group">\n          <span class="input-group-addon">Beschreibung</span>\n          <textarea id="description" class="form-control" rows="4" ng-model="newEvent.additional" required></textarea>\n        </div>\n      </div>\n    </div> --> <div class="form-group"> <label>Beschreibung</label> <textarea id="additional" class="form-control" rows="4" ng-model="newEvent.additional" placeholder="Gib potentiellen Helfern zusätzliche Informationen..." required></textarea> </div> <!-- abort and submit buttons --> <div class="row"> <div class="col-sm-2 col-xs-2 col-md-2"></div> <div class="col-sm-4 col-xs-4 col-md-4 text-center"><button type="button" class="btn btn-default btn-block" ng-click="cancel()">Abbrechen</button></div> <div class="col-sm-4 col-xs-4 col-md-4 text-center"><button type="submit" class="btn btn-danger btn-block">Ereignis melden</button></div> <div class="col-sm-2 col-xs-2 col-md-2"></div> </div> </form> </div> <!-- end gridlayout -->'),a.put("views/eventoverview.html",'<scrollable-table watch="events"> <table class="table table-striped"> <thead><tr> <th width="7%">Typ</th> <th width="20%">Zeit</th> <th width="62%">Hinweise</th> <th width="21%">erledigt</th> </tr></thead> <tbody> <tr ng-switch on="event.type.bezeichnung" ng-repeat="event in events | orderBy:\'-date\'" ng-click="go(\'/event/{{ event.id }}\')"> <td> <img ng-switch-when="personenschaden" ng-src="images/herz.svg"> <img ng-switch-when="feuer" ng-src="images/feuer.svg"> <img ng-switch-when="handwerk" ng-src="images/hammer.svg"> <img ng-switch-when="unfall" ng-src="images/unfall.svg"> </td> <td>{{event.date | amTimeAgo}}</td> <td>{{event.additional}}</td> <td style="text-align:center"><input type="checkbox" ng-model="event.done" disabled></td> </tr> </tbody> <tfoot> <td colspan="4"> <button href="" ng-click="paginateEvents()">ältere Ereignisse anzeigen</button> </td> </tfoot> </table> </scrollable-table>'),a.put("views/login.html",'<div class="container"> <div class="row"> <form ng-submit="login(user,password)" class="col-sm-8 col-xs-10 col-sm-offset-2 col-xs-offset-1"> <h3 class="text-center">Anmelden</h3> <div class="form-group"> <label for="emailadress">Email Adresse:</label> <input type="text" class="form-control" ng-model="user"> </div> <div class="form-group"> <label for="pwd">Passwort:</label> <input type="password" class="form-control" ng-model="password"> </div> <button type="submit" class="btn btn-primary btn-block">Jetzt anmelden</button> <br> <p class="text-center"> Du hast noch keinen Account? <a ng-href="#/register">Jetzt registrieren</a> </p> </form> </div> </div>'),a.put("views/main.html",'<div class="row"> <div class="col-md-8"> <div id="map_canvas"> <ui-gmap-google-map center="map.center" zoom="map.zoom" options="map.options"> <ui-gmap-markers idkey="id" models="map.markers" docluster="false" coords="\'self\'" icon="\'icon\'"> <ui-gmap-windows ng-cloak> <div ng-non-bindable> {{ content }} </div> </ui-gmap-windows> </ui-gmap-markers> <ui-gmap-marker idkey="map.myMarker.id" coords="map.myMarker" options="map.myMarker.options"> </ui-gmap-marker> </ui-gmap-google-map> </div> </div> <div class="col-md-4"> <div class="eventtabelle hidden-xs"> <div ng-include="\'views/eventoverview.html\'"></div> </div> </div> </div> <hr> <div class="Eventformular"> <div ng-include="\'views/eventcreation.html\'"></div> </div>'),a.put("views/registration.html",'<div class="container"> <div class="row"> <form ng-submit="register(user,password)" class="col-sm-8 col-xs-10 col-sm-offset-2 col-xs-offset-1"> <h3 class="text-center">Registrierung</h3> <div class="form-group"> <label>Name:</label> <input type="text" class="form-control" ng-model="user.name"> </div> <div class="form-group"> <label for="emailadress">Email Adresse:</label> <input type="email" class="form-control" ng-model="user.username"> </div> <div class="form-group"> <label for="pwd">Passwort:</label> <input type="password" class="form-control" ng-model="password"> </div> <button type="submit" class="btn btn-primary btn-block">Jetzt anmelden</button> <br> <p class="text-center"> Du hast schon einen Account? <a ng-href="#/login">Anmelden</a> </p> </form> </div> </div>')}]);