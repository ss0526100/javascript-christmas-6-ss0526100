const Utils = Object.freeze({
  freezeMap(object) {
    if (object instanceof Map) {
      object.forEach(this.freezeMap);
      object.set = function (key) {
        throw "Can't add property " + key + ', map is not extensible';
      };

      object.delete = function (key) {
        throw "Can't delete property " + key + ', map is frozen';
      };

      object.clear = function () {
        throw "Can't clear map, map is frozen";
      };
    }
    Object.freeze(object);
  },
});

export default Utils;
