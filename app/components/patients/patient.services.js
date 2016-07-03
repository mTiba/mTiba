angular.module('mtiba.patients')
  //"http://bgs-johnlindquist.rhcloud.com"
  .constant("BASE_URL", "http://localhost:8000")
  .factory('Patient', ['$resource', function ($resource) {
    return $resource('app/data/patient.json', { id: '@_id'}, {
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
          url: 'app/data/patients.json',
          isArray: true
        }
    });
  }])
  .factory('addPatientFormStepsFactory', function(){
    var factory = {};
    factory.getSteps = function(){ 
      return [
         {
            templateUrl: 'app/components/patients/form/partials/step0.html',
            title: 'Login info'
        },
        {
            templateUrl: 'app/components/patients/form/partials/step1.html',
            title: 'Basic info'
        },
        {
            templateUrl: 'app/components/patients/form/partials/step2.html',
            title: 'Lifestyle'
        },
        {
            templateUrl: 'app/components/patients/form/partials/step3.html',
            title: 'Health'
        },
        {
            templateUrl: 'app/components/patients/form/partials/step4.html',
            title: 'Family'
        },
        {
            templateUrl: 'app/components/patients/form/partials/submit.html',
            title: 'Submit'
        }
      ]
    };
    return factory;
  })  
  .factory('editPatientFormStepsFactory', function(){
    var factory = {};
    factory.getSteps = function(){ 
      return [
        {
            templateUrl: 'app/components/patients/form/partials/step1.html',
            title: 'Basic info'
        },
        {
            templateUrl: 'app/components/patients/form/partials/step2.html',
            title: 'Lifestyle'
        },
        {
            templateUrl: 'app/components/patients/form/partials/step3.html',
            title: 'Health'
        },
        {
            templateUrl: 'app/components/patients/form/partials/step4.html',
            title: 'Family'
        },
        {
            templateUrl: 'app/components/patients/form/partials/submit.html',
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
      patientRemoteDataRequestFactory.getMetadata().success(function(metadata){
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
      patientData.health = typeof(patientData.lifestyle) === "undefined" ? {} : patientData.health;
      patientData.family = typeof(patientData.family) === "undefined" ? {} : patientData.family;
      patientData.family.parents = typeof(patientData.family.parents) === "undefined" ? {} : patientData.family.parents;
      patientData.family.parents.father = typeof(patientData.family.parents.father) === "undefined" ? {} : patientData.family.parents.father;
      patientData.family.parents.mother = typeof(patientData.family.parents.father) === "undefined" ? {} : patientData.family.parents.father;

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

	.factory('patientRemoteDataRequestFactory',function($http) {
    var factory = {};
    factory.getMetadata = function(){ 
      return $http.get('app/data/patient_metadata.json');
    };
    return factory;
  })


  .factory('patientsDoctorFactory', ['$resource', function ($resource) {
    return $resource('app/data/patients_doctor.json', { patient_id: '@_id'}, {
        update: { 
          method: 'PUT', 
          url: 'http://movieapp-sitepointdemos.rhcloud.com/api/movies/:id'
        }
    });
  }])

  .factory('patientMilestonesFactory', ['$resource', function ($resource) {
    return $resource('app/data/patients_milestones.json', { patient_id: '@_id'}, {
        save: { 
          method: 'POST', 
          url: 'http://movieapp-sitepointdemos.rhcloud.com/api/movies/:id' //, { id: '@_id' } 
        },
        update: { 
          method: 'PUT', 
          url: 'http://movieapp-sitepointdemos.rhcloud.com/api/movies/:id'
        }
    });
  }])

  .service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
  });
