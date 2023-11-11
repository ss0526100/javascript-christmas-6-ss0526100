function freezeMap(myMap) {
  if (myMap instanceof Map) {
    myMap.set = function (key) {
      throw "Can't add property " + key + ', map is not extensible';
    };

    myMap.delete = function (key) {
      throw "Can't delete property " + key + ', map is frozen';
    };

    myMap.clear = function () {
      throw "Can't clear map, map is frozen";
    };
  }

  Object.freeze(myMap);
}

export default freezeMap;
