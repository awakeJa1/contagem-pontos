import { db } from './firebase-config.js';
import { collection, getDocs } from 'firebase/firestore';

async function loadTeams() {
    const snapshot = await getDocs(collection(db, 'teams'));
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

if (document.querySelector('#ranking-table')) {
    displayTeams();
}
