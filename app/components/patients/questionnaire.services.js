angular.module('mtiba.questionnaire')

  //"http://bgs-johnlindquist.rhcloud.com"
  .constant("BASE_URL", "http://localhost:8000")
  .factory('Questionnaire', ['$resource', function ($resource) {
    return $resource('https://yapili.com/patient/:d', { id: '@_id'}, {
        save: { 
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          crossDomain: true,
          url: 'https://yapili.com/patient/create' //, { id: '@_id' } 
        }
    });
  }])
