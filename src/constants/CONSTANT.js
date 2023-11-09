import NUMBER from './NUMBER.js';
import STRING from './STRING.js';
import REGEXP from './REGEXP.js';

const CONSTANT = Object.freeze({ ...NUMBER, ...STRING, ...REGEXP });

export default CONSTANT;
