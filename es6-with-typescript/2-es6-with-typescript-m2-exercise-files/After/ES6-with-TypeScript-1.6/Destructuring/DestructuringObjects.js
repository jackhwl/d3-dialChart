var DestructuringObjects;
(function (DestructuringObjects) {
    const addressData1 = {
        streetAddress1: '1001 Main Street',
        city: 'Anytown',
        state: 'NY',
        zip: '10001-1234',
        country: 'USA'
    };
    const { streetAddress1: street1, streetAddress2: street2 = "", city, state, zip, country } = addressData1;
    const employee = {
        position: {
            department: {
                name: "Development"
            }
        }
    };
    function categorizeEmployee({ workAddress: { city } = { city: "" }, position: { department: { name: departmentName } } }) {
        return {
            city,
            departmentName
        };
    }
    const category = categorizeEmployee(employee);
})(DestructuringObjects || (DestructuringObjects = {}));
