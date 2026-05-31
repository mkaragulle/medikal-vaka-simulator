import { TUS_PEARL_INTERNAL_MEDICINE_FIRST50_TEXT_OVERRIDES } from './src/data/tusPearlInternalMedicineFirst50Overrides.js';
import { TUS_PEARL_INTERNAL_MEDICINE_SECOND50_TEXT_OVERRIDES } from './src/data/tusPearlInternalMedicineSecond50Overrides.js';
import { TUS_PEARL_INTERNAL_MEDICINE_THIRD59_TEXT_OVERRIDES } from './src/data/tusPearlInternalMedicineThird59Overrides.js';
const all={...TUS_PEARL_INTERNAL_MEDICINE_FIRST50_TEXT_OVERRIDES,...TUS_PEARL_INTERNAL_MEDICINE_SECOND50_TEXT_OVERRIDES,...TUS_PEARL_INTERNAL_MEDICINE_THIRD59_TEXT_OVERRIDES};
let i=0; for (const [id,o] of Object.entries(all)){ console.log(++i, id, '|', o.front); }
