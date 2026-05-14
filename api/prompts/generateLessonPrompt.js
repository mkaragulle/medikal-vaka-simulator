import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_LESSON_SYSTEM_PROMPT = `${KOMITE_GLOBAL_EDUCATIONAL_PROMPT}

You are specifically generating the KOMİTE main lesson JSON. Return only valid JSON in the exact schema requested by the user prompt. The current sourceManifest and current materialPacket are the only valid source boundary. Do not summarize only the last file, do not summarize file by file, and do not use old workspace outputs. If the current packet is about laboratory or experimental methods, stay on those methods and measurements; do not drift into unrelated pathway lessons because of isolated terms.`;

export function buildGenerateLessonPrompt({ studyContext = {}, materialAnalysisJson = {}, sourceTextChunks = '', materialPacket = {}, filesUploadedCount = 0, sourceManifest = {} } = {}) {
  const packet = materialPacket && Array.isArray(materialPacket.files) ? materialPacket : null;
  return `Create one coherent, detailed, memorable Turkish KOMITE lesson from the complete uploaded workspace.

Context:
${JSON.stringify(studyContext || {}, null, 2)}

Current active sourceManifest:
${JSON.stringify(sourceManifest || {}, null, 2)}

Combined material packet:
${JSON.stringify(packet || {}, null, 2)}

Expected uploaded file count: ${filesUploadedCount || packet?.files?.length || 0}
Source fingerprint: ${studyContext?.sourceFingerprint || materialPacket?.sourceFingerprint || ''}

Material analysis compact JSON:
${JSON.stringify(materialAnalysisJson || {}, null, 2)}

Structured cleaned source excerpts from ALL files:
${sourceTextChunks || 'No readable source text was provided.'}

Return only this JSON shape:
{
  "title": "",
  "shortIntro": "",
  "sourceCoverage": { "filesAnalyzedCount": 0, "usedFiles": [], "coverageNote": "" },
  "learningObjectives": [],
  "bigPicture": "",
  "mainConcepts": [],
  "sections": [
    { "heading": "", "teachingText": "", "mechanismFlow": [], "examAngle": "", "commonTrap": "", "whyItMatters": "", "sourceReferences": [] }
  ],
  "visualNotes": [],
  "figureExplanations": [
    { "sourcePageOrSlide": "", "analysisStatus": "analyzed|partial|unavailable", "type": "figure|table|diagram|graph|image|unknown", "visibleTextAroundFigure": "", "whatCanBeSaidSafely": "", "limitations": "", "examRelevance": "" }
  ],
  "clinicalExamRelevance": "",
  "commonConfusions": [{ "confusion": "", "correctDistinction": "", "whyConfused": "", "memoryClarification": "" }],
  "highYieldPoints": [],
  "mustKnow": [],
  "limitations": [],
  "sourceReferences": [],
  "qualityCheck": { "usesAllFiles": true, "notSlideBySlide": true, "noRawOCR": true, "noMeaninglessTags": true, "sectionDepthAdequate": true }
}

Mandatory quality rules:
- First verify that sourceManifest.sourceFingerprint matches the requested source fingerprint and current material packet. If it does not, do not use any previous lesson or cached material.
- sourceCoverage.filesAnalyzedCount must reflect how many uploaded files were actually included from the material packet.
- If multiple files are present, synthesize their shared conceptual map instead of writing separate file summaries.
- learningObjectives must be real student capabilities using verbs such as açıklayabilir, karşılaştırabilir, yorumlayabilir, sınıflandırabilir, ilişkilendirebilir, ayırt edebilir, uygulayabilir.
- shortIntro must be a polished scientific orientation paragraph, not a generic sentence. It should state the conceptual scope of the lesson and why the topics belong together. Avoid phrases such as 'yüklenen materyaller', 'bu çalışma alanı', 'tek tek ezberlenecek başlıklar', 'dosyalar analiz edildi'. Do not repeat the exact title in shortIntro.
- Write teachingText with readable sentence rhythm. Avoid overloaded sentences with multiple semicolons. When a concept has several effects, break it into separate sentences rather than one long sentence.
- mechanismFlow should be an array of short step labels. Each item should be readable by itself. Do not include arrows inside any item.

- bigPicture must be detailed, conceptual and useful. Avoid keywords, metadata, filenames, and implementation language.
- bigPicture should be written as connected explanatory paragraphs, not a list of disconnected facts. It must explicitly connect why the topics belong together and what cause-effect logic the learner should use.
- clinicalExamRelevance and commonConfusions must be concise, non-repetitive and source-specific. Do not duplicate the same idea already written in bigPicture or every section.
- Do not return raw OCR captions, repeated figure-text fragments, page numbers, or isolated slide residues in any field. If such text appears in the source, silently ignore it unless it can be rewritten into a complete scientific sentence.
- Create as many conceptual sections as the material genuinely requires. There is no fixed upper or lower section limit. Do not compress distinct concepts just to keep the lesson short, and do not split artificially just to increase section count. For large multi-file material, cover every major domain, subdomain, mechanism, classification, clinically important distinction, and exam-relevant integration point with its own section when that improves learning. Each teachingText must be a substantial explanatory paragraph or multi-paragraph explanation, not one sentence. Include definition, mechanism/logic, relation to the broader topic, and why it matters inside teachingText itself; do not put all useful content only in examAngle or whyItMatters. It is acceptable and preferred for the full lesson to be long when the uploaded material is long.
- Each section should define the concept, explain how it works, connect it to the broader topic and include why it matters. Put the main explanation in teachingText. Add examAngle/commonTrap only when genuinely specific; otherwise return an empty string. Do not duplicate examAngle/commonTrap sentences inside teachingText. Do not repeat identical sentence openings across sections. Do not return sectionDepthAdequate=true unless at least 80% of sections have detailed teachingText.
- mainConcepts must be real medical/biochemical/physiological concepts, not file words such as slayt, sayfa, dosya, pptx, giriş.
- highYieldPoints and mustKnow must be specific, memorable and scientifically meaningful. Their count should be determined by the material. Do not cap them artificially; include enough items to cover the core exam-useful distinctions without padding.
- Never fill examAngle, commonTrap, whyItMatters, or clinicalExamRelevance with boilerplate. Empty is better than a generic repeated sentence.
- Before returning, compare the title, shortIntro, bigPicture, sections, highYieldPoints and mustKnow against the current source packet. If a topic is not present in the current packet, remove it completely.
- Do not let prior requests, previous examples, fallback content or old workspace output influence the current JSON.
- Never include raw filename as title. Never include professor names, dates, page numbers, file extensions, OCR fragments, “materyaldeki ilişkili kavram”, “slayt →”, or “sayfa →”.
- If the source packet contains clearly different but related domains, do not drop any major domain. Give each major domain enough dedicated sections and then connect them with integrative sections.
- Prefer detailed medical-school teaching over compact summary. The learner should be able to study from this output without reopening the slides for the core narrative.`;
}
