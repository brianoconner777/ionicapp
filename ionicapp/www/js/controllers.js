angular.module('starter')

.controller('LoginCtrl', function($scope, AuthService, $ionicPopup,$http,$state) {
      $http.get('data.json').success(function(data, status, headers, config) {
    $scope.items = data.data;
  }).error(function(data, status, headers, config) {
    console.log("No data found..");
  });


 
})

.controller('RegisterCtrl', function($scope,$http,ionicDatePicker,$localStorage,$ionicPopup, $state) {
  $scope.isDisabled=false;
  $scope.datetext="";
   var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.datetext += new Date(val);
        console.log($scope.datetext);
      }};
      

      $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };
  $scope.user = {
    fullname: "",
    mobilenumber:"",
    anum:""   
  };
  $scope.dated = function(){
   $scope.user['dob'] = $scope.datetext;
   console.log($scope.user);
  }
  $scope.savedata = function(){
    $localStorage.mob = $scope.user.mobilenumber;
  }
 $scope.signup = function(){

      $http.post("/api/signup",$scope.user).success(function(data,status){
        if(data.success == "false"){
          console.log("failed");
        }
        $state.go('inside');

      })
      .error(function(data){
        console.log(data);
      })

    
 } 
  
})

.controller('InsideCtrl', function($scope, $localStorage, userData, $http, $state) {
 
  $scope.mobile = $localStorage.mob;
  $scope.newvalue = function(value){
    console.log(value);
    userData.storedata(value);
  }
  
  $scope.MOB = {
    mobilenumber : $scope.mobile,
    
  }
  
  $scope.updatedb = function(){
      $scope.value = userData.returndata();
      $scope.MOB.preference = $scope.value;
      console.log($scope.MOB);
      $http.post("/api/updatepreference",$scope.MOB).success(function (data,status){
        
        console.log(data);
        console.log(status);
        $state.go('login');
      });
    
  }
})

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside.login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
})
.filter('searchFor', function(){
  return function(arr, searchString){
    if(!searchString){
      return arr;
    }
    var result = [];
    searchString = searchString.toLowerCase();
    angular.forEach(arr, function(item){
      if(item.title.toLowerCase().indexOf(searchString) !== -1){
      result.push(item);
    }
    });
    return result;
  };
})
.service('userData',function(){
  var value;
  this.storedata = function(msg){
    this.value = msg; 
  }
  this.returndata = function(){
    return this.value;
  }
});

