const result_true = `<p><strong>
Baseado em suas respostas, é provável que esta situação se enquadre como caso suspeito ou provável de doença pelo coronavirus 2019 (COVID-19). No entanto, isto não se trata de um diagnóstico. A orientação é que você procure atendimento em uma unidade de saúde mais próxima para avaliação clínica.
    </strong>
    Ao se deslocar para uma unidade de saúde, siga as seguintes medidas de proteção individual e etiqueta respiratória:

    - Utilize mascara facial, para evitar a transmissão de outras pessoas, durante o trajeto para a unidade de saúde,

    - Lave as mãos frequentemente com água e sabão, ou higienize com álcool gel 70%,

    - Cubra a boca e nariz com um lenço de papel ao tossir e espirrar e jogue no lixo após o uso, ou proteja com o
    antebraço (nunca com as mãos),

    - Evite locais com aglomeração de pessoas,

    - Não compartilhe objetos de uso pessoal.

    Durante o atendimento, você será avaliado por um médico que poderá solicitar exames complementares para estabelecer diagnóstico, bem como iniciar o tratamento adequado. Dependendo do caso, ele poderá recomendar isolamento hospitalar ou domiciliar. Caso seja recomendado o isolamento em seu próprio domicílio, você deve seguir as recomendações para isolamento domiciliar listadas nas dicas. De qualquer forma, evite o contato social com outras pessoas, seja no trabalho, na escola ou no lazer, enquanto persistirem os sintomas.</p>
  `;
const result_false = `<p><strong>
Baseado em suas respostas, é provável que essa situação NÃO se enquadre como caso suspeito de doença pelo coronavirus 2019 (COVID-19). Mantenha as condutas de precaucão e prevenção, praticando a etiqueta respiratória:
    </strong>
    - Lave as mãos com frequência com água e sabão ou higienize com álcool gel 70%,

    - Cubra a boca e nariz com um lenço de papel ao tossir e espirrar e jogue no lixo após o uso, ou proteja com o
    antebraço (nunca com as mãos),

    - Evite tocar nos olhos, nariz e boca com as mãos não lavadas.

    - Evite locais com aglomeração de pessoas,

    - Não compartilhe objetos de uso pessoal

    - Evite contato próximo com pessoas resfriadas ou que estejam com sintomas de gripe.

    Em caso de dúvidas, ligue para o Disque Saúde 136 do Ministério da Saúde, ou procure uma unidade de saúde.</p>`;

export default function() {
  return true
    ? { result: true, render: result_true }
    : { result: false, render: result_false };
}
