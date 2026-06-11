import { attachClinicalVisualsToCases } from '../utils/clinicalVisuals.js';
import { clinicalVisualManifest } from './clinicalVisualManifest.js';
import { sanitizeClinicalCaseExam } from '../utils/clinicalExamSanitizer.js';

import { casesPart01 } from './caseBank/cases-part-01.js';
import { casesPart02 } from './caseBank/cases-part-02.js';
import { casesPart03 } from './caseBank/cases-part-03.js';
import { casesPart04 } from './caseBank/cases-part-04.js';
import { casesPart05 } from './caseBank/cases-part-05.js';
import { casesPart06 } from './caseBank/cases-part-06.js';
import { casesPart07 } from './caseBank/cases-part-07.js';
import { casesPart08 } from './caseBank/cases-part-08.js';
import { casesPart09 } from './caseBank/cases-part-09.js';
import { casesPart10 } from './caseBank/cases-part-10.js';
import { casesPart11 } from './caseBank/cases-part-11.js';
import { casesPart12 } from './caseBank/cases-part-12.js';
import { casesPart13 } from './caseBank/cases-part-13.js';
import { casesPart14 } from './caseBank/cases-part-14.js';
import { casesPart15 } from './caseBank/cases-part-15.js';
import { casesPart16 } from './caseBank/cases-part-16.js';
import { casesPart17 } from './caseBank/cases-part-17.js';
import { casesPart18 } from './caseBank/cases-part-18.js';
import { casesPart19 } from './caseBank/cases-part-19.js';
import { casesPart20 } from './caseBank/cases-part-20.js';
import { casesPart21 } from './caseBank/cases-part-21.js';
import { casesPart22 } from './caseBank/cases-part-22.js';
import { casesPart23 } from './caseBank/cases-part-23.js';
import { casesPart24 } from './caseBank/cases-part-24.js';
import { casesPart25 } from './caseBank/cases-part-25.js';
import { casesPart26 } from './caseBank/cases-part-26.js';
import { casesPart27 } from './caseBank/cases-part-27.js';
import { casesPart28 } from './caseBank/cases-part-28.js';
import { casesPart29 } from './caseBank/cases-part-29.js';
import { casesPart30 } from './caseBank/cases-part-30.js';

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
  ...casesPart20,
  ...casesPart21,
  ...casesPart22,
  ...casesPart23,
  ...casesPart24,
  ...casesPart25,
  ...casesPart26,
  ...casesPart27,
  ...casesPart28,
  ...casesPart29,
  ...casesPart30
];
;

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
