angular.module('mtiba.doctors')
  //"http://bgs-johnlindquist.rhcloud.com"
  .constant("BASE_URL", "http://localhost:8000")
  .factory('Doctor', ['$resource', function ($resource) {
    return $resource('app/data/doctor.json', { id: '@_id'}, {
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
  .factory('PatientsOfDoctor', ['$resource', function ($resource) {
    return $resource('app/data/patients.json', { id: '@_id'}, {
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
          isArray:true
        }
    });
  }])
  .factory('DoctorLogs', ['$resource', function ($resource) {
    return $resource('app/data/doctor_logs.json', { doctor_id: '@_id'}, {
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
  .factory('doctorFormStepsFactory', function(){
    var factory = {};
    factory.getSteps = function(){ 
      return [
        {
            //template: '<input type="text" class="form-control -bordered-focus" name="surname" input-name="surname_input" ng-model="formCtrl.doctor.surname" ng-minlength="3" required>',
            templateUrl: 'app/components/doctors/form/partials/step1.html',
            title: 'Basic info'
        },
        {
            templateUrl: 'app/components/doctors/form/partials/step2.html',
            title: 'Background'
        },
        {
            templateUrl: 'app/components/doctors/form/partials/step3.html',
            title: 'Commitment'
        },
        {
            templateUrl: 'app/components/doctors/form/partials/submit.html',
            title: 'Submit'
        }
      ]
    };
    return factory;
  })
  .factory('doctorMetadataFactory', function(doctorRemoteDataRequestFactory){
    var factory = {};
    factory.getData = function(){    
      var metadata = {};  
      doctorRemoteDataRequestFactory.getMetadata().success(function(response){
        metadata.languages = response.languages;
        metadata.countries = response.countries;
        metadata.patient_countries = response.patient_countries;
        metadata.occupation = response.occupation;
        metadata.specialties = response.specialties;
        metadata.patient_count_groups = response.patient_count_groups;
        metadata.patient_age_groups = response.patient_age_groups;
        metadata.commitment_times = response.commitment_times;
        metadata.genders = response.genders;
      });
      return metadata;
    }
    factory.getDataAndMapNames = function(doctorData, $scope){
      doctorRemoteDataRequestFactory.getMetadata().success(function(metadata){
        factory.mapNames(metadata, doctorData, $scope);
      });
    }
    /* Map ids to names in metadata */
    /* Response is metadata */
    factory.mapNames = function(response, doctorData, $scope){
      
      $scope.doctor.languages_names = [];
      for(var i in response.languages)
      {
        for(var j in doctorData.languages){
          if(response.languages[i].id === doctorData.languages[j]){
            $scope.doctor.languages_names.push(response.languages[i].name);
          }  
        }   
      }  

      for(var i in response.countries)
      {

        if(response.countries[i].code === doctorData.country){
          $scope.doctor.country_name = response.countries[i].name;
          break;
        }     
      }

      for(var i in response.countries)
      {
        if(response.countries[i].code === doctorData.background.place_of_medical_degree.country){
          $scope.doctor.background.place_of_medical_degree.country_name = response.countries[i].name;
          break;
        }     
      }
      for(var i in response.countries)
      {
        if(response.countries[i].code === doctorData.background.place_of_residency.country){
          $scope.doctor.background.place_of_residency.country_name = response.countries[i].name;
          break;
        }     
      }
            for(var i in response.countries)
      {
        if(response.countries[i].code === doctorData.background.place_of_fellowship.country){
          $scope.doctor.background.place_of_fellowship.country_name = response.countries[i].name;
          break;
        }     
      }

      for(var i in response.occupation)
      {
        if(response.occupation[i].id === doctorData.occupation){
          $scope.doctor.occupation_name = response.occupation[i].name;
          break;
        }     
      }

      for(var i in response.specialties)
      {
        if(response.specialties[i].id === doctorData.specialty){
          $scope.doctor.specialty_name = response.specialties[i].name;
          break;
        }     
      }

      for(var i in response.genders)
      {
        if(response.genders[i].code === doctorData.gender){
          $scope.doctor.gender_name = response.genders[i].name;
          break;
        }     
      }

      for(var i in response.genders)
      {
        if(response.genders[i].code === doctorData.commitment.patient_gender){
          $scope.doctor.commitment.patient_gender_name = response.genders[i].name;
          break;
        }     
      }

      $scope.doctor.commitment.patient_age_groups_names = [];
      for(var i in response.patient_age_groups)
      {
        for(var j in doctorData.commitment.patient_age_groups){
          if(response.patient_age_groups[i].id === doctorData.commitment.patient_age_groups[j]){
            $scope.doctor.commitment.patient_age_groups_names.push(response.patient_age_groups[i].value);
          }  
        }   
      }

      $scope.doctor.commitment.patient_countries_names = [];
      for(var i in response.patient_countries)
      {
        for(var j in doctorData.commitment.patient_countries){
          if(response.patient_countries[i].id === doctorData.commitment.patient_countries[j]){
            $scope.doctor.commitment.patient_countries_names.push(response.patient_countries[i].name);
          }  
        }   
      }

    }
    return factory;
  })
  .factory('doctorRemoteDataRequestFactory',function($http) {
    var factory = {};
    factory.getMetadata = function(){ 
      return $http.get('app/data/doctor_metadata.json');
    };
    return factory;
  });
