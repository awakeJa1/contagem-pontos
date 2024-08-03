// index.js
async function loadTeams() {
    const db = firebase.firestore(); // Adicione a referência ao Firestore
    try {
        const snapshot = await db.collection('teams').get();
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
    console.log('Formulário de cadastro enviado');

    const name = document.querySelector('#team-name').value;
    const color = document.querySelector('#team-color').value;
    const points = parseInt(document.querySelector('#team-points').value, 10);

    console.log('Nome da Equipe:', name);
    console.log('Cor da Equipe:', color);
    console.log('Pontos:', points);

    try {
        const db = firebase.firestore(); // Adicione a referência ao Firestore
        await db.collection('teams').add({
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
            const db = firebase.firestore(); // Adicione a referência ao Firestore
            await db.collection('teams').doc(id).update({ points: parseInt(newPoints, 10) });
            console.log('Pontos atualizados com sucesso');
            displayTeams();
        } catch (error) {
            console.error('Erro ao atualizar pontos:', error);
        }
    }
}

async function deleteTeam(id) {
    if (confirm('Tem certeza de que deseja excluir esta equipe?')) {
        try {
            const db = firebase.firestore(); // Adicione a referência ao Firestore
            await db.collection('teams').doc(id).delete();
            console.log('Equipe excluída com sucesso');
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
