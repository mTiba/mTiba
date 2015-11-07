
angular.module('mtibaPatients.services', [])
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
          url: 'http://movieapp-sitepointdemos.rhcloud.com/api/movies/:id' //, { id: '@_id' } 
        },
        update: { 
          method: 'PUT', 
          url: 'http://movieapp-sitepointdemos.rhcloud.com/api/movies/:id'
        },
        query:  {
          method:'GET',
          url: 'data/patients.json',
          isArray:true
        }
    });
  }])
  .factory('formStepsFactory', function(){
    var factory = {};
    factory.getSteps = function(){ 
      return [
        {
            templateUrl: './partials/form/step1.html',
            title: 'Basic info'
        },
        {
            templateUrl: './partials/form/step2.html',
            title: 'Lifestyle'
        },
        {
            templateUrl: './partials/form/step3.html',
            title: 'Health'
        },
        {
            templateUrl: './partials/form/step4.html',
            title: 'Family'
        },
        {
            templateUrl: './partials/form/submit.html',
            title: 'Submit'
        }
      ]
    };
    return factory;
  })
  .factory('metadataFactory', function(remoteDataRequestFactory){
    var factory = {};
    factory.getData = function(){    
      var metadata = {};  
      remoteDataRequestFactory.getMetadata().success(function(response){
        metadata.family_diseases = response.family_diseases;
        metadata.diseases = response.diseases;
        metadata.languages = response.languages;
        metadata.countries = response.patient_countries;
        metadata.motivation = response.motivation;
        metadata.occupation = response.occupation_types;
        metadata.exercise_frequencies = response.exercise_frequencies;
        metadata.frequencies = response.frequencies;
        metadata.states = response.states;
      });
      return metadata;
    }

    factory.getDataAndMapNames = function(patientData, $scope){
      remoteDataRequestFactory.getMetadata().success(function(metadata){
        if(patientData.constructor === Array)
           factory.mapNamesToMultiplePatients(metadata, patientData, $scope);
        else 
          factory.mapNames(metadata, patientData, $scope);        
      });
    }

    factory.mapNames = function(metadata, patientData, $scope){
       //make sure the main data objects are created
      //TODO: find a better way
      patientData.lifestyle = typeof(patientData.lifestyle) === "undefined" ? {} : patientData.lifestyle;
      patientData.health = typeof(patientData.lifestyle) === "undefined" ? {} : patientData.lifestyle;
      patientData.family = typeof(patientData.family) === "undefined" ? {} : patientData.family;
      patientData.family.parents = typeof(patientData.family.parents) === "undefined" ? {} : patientData.family.parents;
      patientData.family.parents.father = typeof(patientData.family.parents.father) === "undefined" ? {} : patientData.family.parents.father;
      patientData.family.parents.mother = typeof(patientData.family.parents.father) === "undefined" ? {} : patientData.family.parents.father;

/*
      patientDataArray[p].languages = typeof(patientDataArray[p].languages) === "undefined" ?  [] : patientDataArray[p].languages;
      patientDataArray[p].country = typeof(patientDataArray[p].country) === "undefined" ? {} : patientDataArray[p].country;
      patientDataArray[p].motivation = typeof(patientDataArray[p].motivation) === "undefined" ? {} : patientDataArray[p].motivation;
      patientDataArray[p].occupation = typeof(patientDataArray[p].occupation) === "undefined" ? {} : patientDataArray[p].occupation;        

lifestyle.exercise_frequency
health.little_interest
health.moral_situation
health.diseases
health.family.diseases
family.parents.father.general_health_state
family.parents.mother.general_health_state
*/
      $scope.patient.languages_names = [];
      for(var i in metadata.languages)
      {
        for(var j in patientData.languages){
          if(metadata.languages[i].id === patientData.languages[j]){
            $scope.patient.languages_names.push(metadata.languages[i].name);
          }  
        }   
      } 

      for(var i in metadata.patient_countries)
      {
        if(metadata.patient_countries[i].id === patientData.country){
          $scope.patient.country_name = metadata.patient_countries[i].name;
          break;
        }     
      }  

      for(var i in metadata.motivation)
      {
        if(metadata.motivation[i].id === patientData.motivation){
          $scope.patient.motivation = metadata.motivation[i].name;
          break;
        }     
      }
      
      for(var i in metadata.occupation_types)
      {
        if(metadata.occupation_types[i].id === patientData.occupation){
          $scope.patient.occupation = metadata.occupation_types[i].name;
          break;
        }     
      }

      for(var i in metadata.exercise_frequencies)
      {
        if(metadata.exercise_frequencies[i].id === patientData.lifestyle.exercise_frequency){
          $scope.patient.lifestyle.exercise_frequency = metadata.exercise_frequencies[i].name;
          break;
        }     
      }
      
      for(var i in metadata.frequencies){
        if(metadata.frequencies[i].id === patientData.health.little_interest){
          $scope.patient.health.little_interest = metadata.frequencies[i].name;
        //  break;
        } 
        if(metadata.frequencies[i].id === patientData.health.moral_situation){
          $scope.patient.health.moral_situation = metadata.frequencies[i].name;
        //  break;
        }     
      }
      
      $scope.patient.health.diseases_names = [];
      for(var i in metadata.diseases)
      {
        for(var j in patientData.health.diseases){
          if(metadata.diseases[i].id === patientData.health.diseases[j]){
            $scope.patient.health.diseases_names.push(metadata.diseases[i].name);
          }  
        }   
      }

      $scope.patient.family.diseases_names = [];
      for(var i in metadata.family_diseases)
      {
        for(var j in patientData.family.diseases){
          if(metadata.family_diseases[i].id === patientData.family.diseases[j]){
            $scope.patient.family.diseases_names.push(metadata.family_diseases[i].name);
          }  
        }   
      }

      for(var i in metadata.states){
        if(metadata.states[i].id === patientData.family.parents.father.general_health_state){
          $scope.patient.family.parents.father.general_health_state = metadata.states[i].name;
        //  break;
        }
        if(metadata.states[i].id === patientData.family.parents.mother.general_health_state){
          $scope.patient.family.parents.mother.general_health_state = metadata.states[i].name;
        //  break;
        }   
      }
    }
    /* Map ids to names in metadata for multiple patient objects*/
    factory.mapNamesToMultiplePatients = function(metadata, patientData, $scope){

      var patientDataArray = patientData;   
      for(var p = 0; p < patientDataArray.length;  p++)
      {
        $scope.patients[p].languages_names = [];
        for(var i in metadata.languages)
        {
          for(var j in patientDataArray[p].languages){
            if(metadata.languages[i].id === patientDataArray[p].languages[j]){
              $scope.patients[p].languages_names.push(metadata.languages[i].name);
            }  
          }   
        } 

        for(var i in metadata.patient_countries)
        {
          if(metadata.patient_countries[i].id === patientDataArray[p].country){
            $scope.patients[p].country_name = metadata.patient_countries[i].name;
            break;
          }     
        }        
      } 
    }
    return factory;
  })

	.factory('remoteDataRequestFactory',function($http) {
    var factory = {};
    factory.getMetadata = function(){ 
      return $http.get('data/metadata.json');
    };
    return factory;
  })
  .service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});