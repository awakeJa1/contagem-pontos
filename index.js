import { app } from './firebase-config.js';
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore(app);

async function loadTeams() {
  try {
    const snapshot = await getDocs(collection(db, 'teams'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Dados carregados:', data);
    return data;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return [];
  }
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

  try {
    await addDoc(collection(db, 'teams'), {
      name: name,
      color: color,
      points: points
    });
    console.log('Equipe cadastrada com sucesso');

    document.querySelector('#team-form').reset();
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Erro ao cadastrar equipe:', error);
  }
}

async function editPoints(id) {
  const newPoints = prompt('Digite os novos pontos para a equipe:');
  if (newPoints !== null) {
    try {
      await updateDoc(doc(db, 'teams', id), { points: parseInt(newPoints, 10) });
      displayTeams();
    } catch (error) {
      console.error('Erro ao atualizar pontos:', error);
    }
  }
}

async function deleteTeam(id) {
  if (confirm('Tem certeza de que deseja excluir esta equipe?')) {
    try {
      await deleteDoc(doc(db, 'teams', id));
      displayTeams();
    } catch (error) {
      console.error('Erro ao excluir equipe:', error);
    }
  }
}

if (document.querySelector('#team-form')) {
  document.querySelector('#team-form').addEventListener('submit', addTeam);
}
if (document.querySelector('#ranking-table')) {
  displayTeams();
}
