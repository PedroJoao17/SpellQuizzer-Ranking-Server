const fs = require('fs');
const path = require('path');

const rankingsFile = path.join(__dirname, '..', 'rankings.json');

// Inicializa o arquivo se não existir
if (!fs.existsSync(rankingsFile)) {
  fs.writeFileSync(rankingsFile, JSON.stringify({ rankings: [] }));
}

function getRankings() {
  const data = fs.readFileSync(rankingsFile);
  return JSON.parse(data);
}

function saveRankings(rankings) {
  fs.writeFileSync(rankingsFile, JSON.stringify(rankings, null, 2));
}

module.exports = {
  getRankings,
  saveRankings,
};
