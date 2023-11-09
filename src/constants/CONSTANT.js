import NUMBER from './NUMBER.js';
import STRING from './STRING.js';

const CONSTANT = Object.freeze({ ...NUMBER, ...STRING });

export default CONSTANT;
