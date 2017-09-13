angular.module('app').controller("mainCtrl", function(mainFactory, $scope){
    console.log('mainCtrl init');
    $scope.propName;
    this.data = mainFactory.getData();
    let valArrCtrl=valArr;
    console.log(data);
    this.selectChanged = function(selValue) {
        selValue = JSON.parse(selValue);
        console.log(selValue);
        _.each(valArrCtrl,function(val,key){
            console.log(val, selValue);
            val.setValue(selValue.values[key]);
            
        });
        brd.update();
    }
    this.addProp = (name) => {
        console.log(name,$scope.propName);
        var prop = {};
        prop.name = $scope.propName;
        prop.values  =[];
        _.each(valArrCtrl,function(val,key){
            console.log(val);
            prop.values[key] = val.Value();
        });
        console.log(prop);
        mainFactory.addProp(prop);


    }

})