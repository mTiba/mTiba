
angular.module('PatientServices', [])
  //"http://bgs-johnlindquist.rhcloud.com"
  .constant("BASE_URL", "http://localhost:8000")
  /*.service("mtibaPatientService", function ($http, BASE_URL) {
    this.getPatients = function () {
      return $http.get(BASE_URL + "/patient")
    }
  })*/

  .factory('Patient', ['$resource', function ($resource) {
    return $resource('data/patient.json', { id: '@_id'}, {
        save: { 
          method: 'POST', 
          url: 'http://localhost:8123/public_html/index.php/patientregister' //, { id: '@_id' }
        },
        update: { 
          method: 'PUT', 
          url: 'http://movieapp-sitepointdemos.rhcloud.com/api/movies/:id'
        },
        query:  {
          method:'GET',
          url: 'http://localhost:8123/public_html/index.php/metadata',
          isArray:true
        }
    });
  }])
  .factory('patientFormStepsFactory', function(){
    var factory = {};
    factory.getSteps = function(){ 
      return [
        {
          templateUrl: './partials/patients/form/step1.html',
          title: 'Login info'
        },
        {
            templateUrl: './partials/patients/form/step2.html',
            title: 'Basic info'
        },
        {
            templateUrl: './partials/patients/form/step3.html',
            title: 'Lifestyle'
        },
        {
            templateUrl: './partials/patients/form/step4.html',
            title: 'Health'
        },
        {
            templateUrl: './partials/patients/form/step5.html',
            title: 'Family'
        },
        {
            templateUrl: './partials/patients/form/submit.html',
            title: 'Submit'
        }
      ]
    };
    return factory;
  })
  .factory('patientMetadataFactory', function(patientRemoteDataRequestFactory){
    var factory = {};
    factory.getData = function(){    
      var metadata = {};
      patientRemoteDataRequestFactory.getMetadata().success(function(response){

        console.log(response.languages);
        metadata.family_diseases = response.family_diseases;
        metadata.diseases = response.diseases;
        metadata.languages = response.languages;
        metadata.countries = response.countries;
        metadata.motivation = response.motivation;
        metadata.occupation = response.occupation_types;
        metadata.exercise_frequencies = response.exercise_frequencies;
        metadata.frequencies = response.frequencies;
        metadata.states = response.states;


      });


      return metadata;
    }
    factory.getDataAndMapNames = function(patientData, $scope){
      patientRemoteDataRequestFactory.getMetadata().success(function(metadata){
        factory.mapNames(metadata, patientData, $scope);
      });
    }
    /* Map ids to names in metadata */
    /* Response is metadata */
    factory.mapNames = function(response, patientData, $scope){

      $scope.patient.languages_names = [];
      for(var i in response.languages)
      {
        for(var j in patientData.languages){
          if(response.languages[i].id === patientData.languages[j]){
            $scope.patient.languages_names.push(response.languages[i].name);
          }  
        }   
      }  

      for(var i in response.countries)
      {

        if(response.countries[i].id === patientData.country){
          $scope.patient.country_name = response.countries[i].name;
          break;
        }     
      }

      for(var i in response.motivation)
      {
        if(response.motivation[i].id === patientData.motivation){
          $scope.patient.motivation = response.motivation[i].name;
          break;
        }     
      }

      for(var i in response.occupation_types)
      {
        if(response.occupation_types[i].id === patientData.occupation){
          $scope.patient.occupation = response.occupation_types[i].name;
          break;
        }     
      }

      for(var i in response.exercise_frequencies)
      {
        if(response.exercise_frequencies[i].id === patientData.lifestyle.exercise_frequency){
          $scope.patient.lifestyle.exercise_frequency = response.exercise_frequencies[i].name;
          break;
        }     
      }

      for(var i in response.frequencies)
      {
        if(response.frequencies[i].id === patientData.health.little_interest){
          $scope.patient.health.little_interest = response.frequencies[i].name;
        //  break;
        }  
        if(response.frequencies[i].id === patientData.health.moral_situation){
          $scope.patient.health.moral_situation = response.frequencies[i].name;
        //  break;
        }            
      }

      $scope.patient.health.diseases_names = [];
      for(var i in response.diseases)
      {
        for(var j in patientData.health.diseases){
          if(response.diseases[i].id === patientData.health.diseases[j]){
            $scope.patient.health.diseases_names.push(response.diseases[i].name);
          }  
        }   
      }

      $scope.patient.family.diseases_names = [];
      for(var i in response.family_diseases)
      {
        for(var j in patientData.family.diseases){
          if(response.family_diseases[i].id === patientData.family.diseases[j]){
            $scope.patient.family.diseases_names.push(response.family_diseases[i].name);
          }  
        }   
      }

      for(var i in response.states)
      {
        if(response.states[i].id === patientData.family.parents.father.general_health_state){
          $scope.patient.family.parents.father.general_health_state = response.states[i].name;
        //  break;
        }
        if(response.states[i].id === patientData.family.parents.mother.general_health_state){
          $scope.patient.family.parents.mother.general_health_state = response.states[i].name;
        //  break;
        }       
      }
    }
    return factory;
  })
	.factory('patientRemoteDataRequestFactory',function($http) {
    var factory = {};
    factory.getMetadata = function(){ 
      return $http.get('http://localhost:8123/public_html/index.php/metadata');
    };
    return factory;
  })
  .service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});