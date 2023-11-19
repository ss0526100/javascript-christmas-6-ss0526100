import BenefitInfo from '../BenefitInfo.js';

const ModelsUtils = Object.freeze({
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

  shakeArray(array, compareFunction) {
    const tmpArray1 = [...array].sort(compareFunction);
    const tmpArray2 = tmpArray1.splice(Math.ceil(tmpArray1.length / 2));
    const resultArray = [];
    while (tmpArray2.length !== 0) {
      resultArray.push(tmpArray1.pop());
      resultArray.push(tmpArray2.pop());
    }
    if (tmpArray1.length !== 0) resultArray.push(tmpArray1.pop());
    return resultArray;
  },

  filterBenefit(benefitName, modelInfo, benefitInfo = BenefitInfo) {
    const benefit = benefitInfo[benefitName];
    const isValid = benefit.checkCondition(modelInfo);
    const price = benefit.getBenefit(modelInfo);
    if (isValid && price !== 0)
      return {
        name: benefit.name,
        price,
        type: benefit.type,
      };
    else return;
  },
});

export default ModelsUtils;
