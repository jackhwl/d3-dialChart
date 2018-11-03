var DestructuringObjects;
(function (DestructuringObjects) {
    var addressData1 = {
        streetAddress1: '1001 Main Street',
        city: 'Anytown',
        state: 'NY',
        zip: '10001-1234',
        country: 'USA'
    };
    var street1 = addressData1.streetAddress1, _a = addressData1.streetAddress2, street2 = _a === void 0 ? "" : _a, city = addressData1.city, state = addressData1.state, zip = addressData1.zip, country = addressData1.country;
    var employee = {
        position: {
            department: {
                name: "Development"
            }
        }
    };
    function categorizeEmployee(_a) {
        var _b = _a.workAddress, city = (_b === void 0 ? { city: "" } : _b).city, departmentName = _a.position.department.name;
        return {
            city: city,
            departmentName: departmentName
        };
    }
    var category = categorizeEmployee(employee);
})(DestructuringObjects || (DestructuringObjects = {}));
