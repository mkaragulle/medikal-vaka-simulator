import { attachClinicalVisualsToCases } from '../utils/clinicalVisuals.js';
import { clinicalVisualManifest } from './clinicalVisualManifest.js';
import { sanitizeClinicalCaseExam } from '../utils/clinicalExamSanitizer.js';
import casesPart01 from './cases.part01.js';
import casesPart02 from './cases.part02.js';
import casesPart03 from './cases.part03.js';
import casesPart04 from './cases.part04.js';
import casesPart05 from './cases.part05.js';
import casesPart06 from './cases.part06.js';
import casesPart07 from './cases.part07.js';
import casesPart08 from './cases.part08.js';
import casesPart09 from './cases.part09.js';
import casesPart10 from './cases.part10.js';
import casesPart11 from './cases.part11.js';
import casesPart12 from './cases.part12.js';
import casesPart13 from './cases.part13.js';
import casesPart14 from './cases.part14.js';
import casesPart15 from './cases.part15.js';
import casesPart16 from './cases.part16.js';
import casesPart17 from './cases.part17.js';
import casesPart18 from './cases.part18.js';
import casesPart19 from './cases.part19.js';
import casesPart20 from './cases.part20.js';

export const rawCases = [
  ...casesPart01,
  ...casesPart02,
  ...casesPart03,
  ...casesPart04,
  ...casesPart05,
  ...casesPart06,
  ...casesPart07,
  ...casesPart08,
  ...casesPart09,
  ...casesPart10,
  ...casesPart11,
  ...casesPart12,
  ...casesPart13,
  ...casesPart14,
  ...casesPart15,
  ...casesPart16,
  ...casesPart17,
  ...casesPart18,
  ...casesPart19,
  ...casesPart20
];
export const cases = attachClinicalVisualsToCases(rawCases.map(sanitizeClinicalCaseExam), clinicalVisualManifest);

const caseById = new Map(cases.map((clinicalCase) => [clinicalCase.id, clinicalCase]));

const casesByBranch = cases.reduce((accumulator, clinicalCase) => {
  const list = accumulator.get(clinicalCase.branchId) || [];
  list.push(clinicalCase);
  accumulator.set(clinicalCase.branchId, list);
  return accumulator;
}, new Map());

export function getCasesByBranch(branchId) {
  return casesByBranch.get(branchId) || [];
}

export function getCaseById(caseId) {
  return caseById.get(caseId) || null;
}
