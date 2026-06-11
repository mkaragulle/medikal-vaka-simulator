function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

export default async function handler(_request, response) {
  return sendJson(response, 410, {
    ok: false,
    disabled: true,
    module: 'non-tus-ai-disabled',
    message: 'Bu AI endpointi devre dışı bırakıldı. Şu anda yalnızca TUS AI Spot Soru Üretimi aktiftir.',
  });
}
