angular.module("app").factory('mainFactory',function(){
    console.log('mainFactory init');
    data = [
        {
            name:"dafault",
            values:[1999.9999999999998, 0.04900000000000001, 0.0495, 400, 0.010000000000000002, 0.24999999999999994, 0.24999999999999994]
        }
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