import { attachClinicalVisualsToCases } from '../utils/clinicalVisuals.js';
import { clinicalVisualManifest } from './clinicalVisualManifest.js';
import { sanitizeClinicalCaseExam } from '../utils/clinicalExamSanitizer.js';
import { rawCasesPart01 } from './caseBank/cases-part-01.js';
import { rawCasesPart02 } from './caseBank/cases-part-02.js';
import { rawCasesPart03 } from './caseBank/cases-part-03.js';
import { rawCasesPart04 } from './caseBank/cases-part-04.js';
import { rawCasesPart05 } from './caseBank/cases-part-05.js';
import { rawCasesPart06 } from './caseBank/cases-part-06.js';
import { rawCasesPart07 } from './caseBank/cases-part-07.js';
import { rawCasesPart08 } from './caseBank/cases-part-08.js';
import { rawCasesPart09 } from './caseBank/cases-part-09.js';
import { rawCasesPart10 } from './caseBank/cases-part-10.js';
import { rawCasesPart11 } from './caseBank/cases-part-11.js';
import { rawCasesPart12 } from './caseBank/cases-part-12.js';
import { rawCasesPart13 } from './caseBank/cases-part-13.js';
import { rawCasesPart14 } from './caseBank/cases-part-14.js';
import { rawCasesPart15 } from './caseBank/cases-part-15.js';
import { rawCasesPart16 } from './caseBank/cases-part-16.js';
import { rawCasesPart17 } from './caseBank/cases-part-17.js';
import { rawCasesPart18 } from './caseBank/cases-part-18.js';
import { rawCasesPart19 } from './caseBank/cases-part-19.js';
import { rawCasesPart20 } from './caseBank/cases-part-20.js';
import { rawCasesPart21 } from './caseBank/cases-part-21.js';
import { rawCasesPart22 } from './caseBank/cases-part-22.js';
import { rawCasesPart23 } from './caseBank/cases-part-23.js';
import { rawCasesPart24 } from './caseBank/cases-part-24.js';
import { rawCasesPart25 } from './caseBank/cases-part-25.js';
import { rawCasesPart26 } from './caseBank/cases-part-26.js';
import { rawCasesPart27 } from './caseBank/cases-part-27.js';
import { rawCasesPart28 } from './caseBank/cases-part-28.js';
import { rawCasesPart29 } from './caseBank/cases-part-29.js';
import { rawCasesPart30 } from './caseBank/cases-part-30.js';

export const rawCases = [
  ...rawCasesPart01,
  ...rawCasesPart02,
  ...rawCasesPart03,
  ...rawCasesPart04,
  ...rawCasesPart05,
  ...rawCasesPart06,
  ...rawCasesPart07,
  ...rawCasesPart08,
  ...rawCasesPart09,
  ...rawCasesPart10,
  ...rawCasesPart11,
  ...rawCasesPart12,
  ...rawCasesPart13,
  ...rawCasesPart14,
  ...rawCasesPart15,
  ...rawCasesPart16,
  ...rawCasesPart17,
  ...rawCasesPart18,
  ...rawCasesPart19,
  ...rawCasesPart20,
  ...rawCasesPart21,
  ...rawCasesPart22,
  ...rawCasesPart23,
  ...rawCasesPart24,
  ...rawCasesPart25,
  ...rawCasesPart26,
  ...rawCasesPart27,
  ...rawCasesPart28,
  ...rawCasesPart29,
  ...rawCasesPart30,
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
