// index.js
async function loadTeams() {
    const snapshot = await db.collection('teams').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  }
  
  async function displayTeams() {
    const teams = await loadTeams();
    const tbody = document.querySelector('#ranking-table tbody');
    tbody.innerHTML = ''; // Limpa a tabela
  
    teams.sort((a, b) => b.points - a.points); // Ordena por pontos
  
    teams.forEach(team => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${team.name}</td>
        <td><div style="background-color: ${team.color}; width: 20px; height: 20px; border-radius: 50%;"></div></td>
        <td>${team.points}</td>
        <td>
          <button onclick="editPoints('${team.id}')" class="button">Alterar Pontos</button>
          <button onclick="deleteTeam('${team.id}')" class="button" style="background-color: #ff6f61;">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  async function addTeam(event) {
    event.preventDefault();
    const name = document.querySelector('#team-name').value;
    const color = document.querySelector('#team-color').value;
    const points = parseInt(document.querySelector('#team-points').value, 10);
  
    await db.collection('teams').add({
      name: name,
      color: color,
      points: points
    });
  
    document.querySelector('#team-form').reset();
    window.location.href = 'index.html';
  }
  
  async function editPoints(id) {
    const newPoints = prompt('Digite os novos pontos para a equipe:');
    if (newPoints !== null) {
      await db.collection('teams').doc(id).update({ points: parseInt(newPoints, 10) });
      displayTeams();
    }
  }
  
  async function deleteTeam(id) {
    if (confirm('Tem certeza de que deseja excluir esta equipe?')) {
      await db.collection('teams').doc(id).delete();
      displayTeams();
    }
  }
  
  if (document.querySelector('#team-form')) {
    document.querySelector('#team-form').addEventListener('submit', addTeam);
  }
  if (document.querySelector('#ranking-table')) {
    displayTeams();
  }
  