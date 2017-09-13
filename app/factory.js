angular.module("app").factory('mainFactory',function(){
    console.log('mainFactory init');
    data = [
    ];
    service={};
    service.getData = () => {
        return data;
    };
    service.addProp = (prop) => {
        data.push(prop);
    }
    return service;
})