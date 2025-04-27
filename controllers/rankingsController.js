const rankingsService = require('../services/rankingsService');

function getAllRankings(req, res) {
  const data = rankingsService.getRankings();
  res.json(data);
}

function addRanking(req, res) {
  console.log(req.body);
  const { nome, instituicao, pontos } = req.body.data;

  if (!nome || !instituicao || !pontos) {
    return res.status(400).json({ error: 'Nome, instituição e pontos são obrigatórios' });
  }

  const pontosNum = typeof pontos === 'string' ? parseInt(pontos) : pontos;

  if (isNaN(pontosNum)) {
    return res.status(400).json({ error: 'Pontos deve ser um número válido' });
  }

  const data = rankingsService.getRankings();

  data.rankings.push({
    nome,
    instituicao,
    pontos: pontosNum,
    data: new Date().toISOString()
  });

  data.rankings.sort((a, b) => b.pontos - a.pontos);
  data.rankings = data.rankings.slice(0, 10);

  rankingsService.saveRankings(data);

  res.status(201).json({ message: 'Pontuação adicionada com sucesso', rankings: data.rankings });
}

function deleteAllRankings(req, res) {
  rankingsService.saveRankings({ rankings: [] });
  res.json({ message: 'Todos os rankings foram removidos' });
}

module.exports = {
  getAllRankings,
  addRanking,
  deleteAllRankings
};
