// KlinikIQ V445 — minimal AI helper layer
// Bu dosya maliyet/token kısıtlayıcı profil uygulamaz. Yalnızca model çözümleme,
// basit env okuma ve kullanım loglama yardımcılarını içerir.

export function envFlag(name, defaultValue = false) {
  const raw = process.env[name];
  if (raw === undefined || raw === null || String(raw).trim() === '') return defaultValue;
  return /^(1|true|yes|on)$/i.test(String(raw).trim());
}

export function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export function resolveModelForScope(scope = 'GENERAL') {
  const prefix = String(scope || 'GENERAL').toUpperCase();
  return process.env[`${prefix}_OPENAI_MODEL`]
    || process.env.OPENAI_MODEL
    || process.env.DEFAULT_GENERATOR_MODEL
    || 'gpt-5.4-mini';
}

export function logAIUsage({ task = '', model = '', usage = null, apiStyle = '', cached = false, sourceChecked = false } = {}) {
  if (!envFlag('KLINIKIQ_AI_USAGE_LOGS', false)) return;
  try {
    console.info('[KlinikIQ AI]', JSON.stringify({
      task,
      model,
      apiStyle,
      cached: Boolean(cached),
      sourceChecked: Boolean(sourceChecked),
      usage,
    }));
  } catch {
    // Logging must never break generation.
  }
}
