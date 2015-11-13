/**
 * Created by iFewalter on 10/24/15.
 */
mtibaModule.controller('DoctorViewController', function($scope, $stateParams, Doctor, metadataFactory, $http, $state) {

        var viewCtrl = $scope;

        viewCtrl.doctor = Doctor.get({id: $stateParams.id}, function(p, getResponseHeaders){
            //Call factory to get metadata and manipulate it there, accessing scope from there
            viewCtrl.metadata = metadataFactory.getDataAndMapNames(p, $scope);
        });

        viewCtrl.openPictureUpload = function(){
            $state.go('selectDoctorAvatar');
        };

    });