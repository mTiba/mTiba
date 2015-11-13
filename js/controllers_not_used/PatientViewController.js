/**
 * Created by iFewalter on 10/24/15.
 */
mtibaModule.controller('PatientViewController', function($scope, $stateParams, Patient, metadataFactory, $http, $state) {

        var viewCtrl = $scope;

        viewCtrl.patient = Patient.get({id: $stateParams.id}, function(p, getResponseHeaders){
            //Call factory to get metadata and manipulate it there, accessing scope from there
            viewCtrl.metadata = metadataFactory.getDataAndMapNames(p, $scope);
        });

        viewCtrl.openPictureUpload = function(){
            $state.go('selectPatientAvatar');
        };

    });