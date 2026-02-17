'use server';

export async function generateAIResponse(type: string, payload: object): Promise<{ ok: boolean; text: string }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return { ok: false, text: 'OPENAI_API_KEY não configurada. Configure no arquivo .env.local para usar IA.' };
  }

  try {
    const prompt = `Tipo: ${type}\nDados do restaurante: ${JSON.stringify(payload)}\nGere resposta curta prática em PT-BR com números do usuário.`;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Você é consultor financeiro de restaurantes. Responda de forma objetiva e acionável.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 220,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('OpenAI error', response.status, errorBody);
      return { ok: false, text: 'Falha ao gerar resposta da IA. Tente novamente em instantes.' };
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim() || 'Sem resposta da IA.';
    return { ok: true, text };
  } catch (error) {
    console.error('OpenAI request failed', error);
    return { ok: false, text: 'Erro interno ao consultar IA. Verifique conexão e chave.' };
  }
}
