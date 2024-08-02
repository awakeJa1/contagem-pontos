const gistUrl = 'https://gist.github.com/awakeJa1/0e53c66a9f95646ce2288f16288fa457'; // Substitua pela URL do seu Gist

// Função para carregar equipes do Gist
async function loadTeams() {
    const response = await fetch(gistUrl);
    if (response.ok) {
        const data = await response.json();
        return data.teams || [];
    } else {
        console.error('Failed to load teams from Gist');
        return [];
    }
}

// Função para exibir equipes na tabela do index.html
async function displayTeams() {
    const teams = await loadTeams();
    const tbody = document.querySelector('#ranking-table tbody');
    tbody.innerHTML = ''; // Limpa a tabela

    teams.sort((a, b) => b.points - a.points); // Ordena as equipes por pontos em ordem decrescente

    teams.forEach((team, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.name}</td>
            <td><div style="background-color: ${team.color}; width: 20px; height: 20px; border-radius: 50%;"></div></td>
            <td>${team.points}</td>
            <td>
                <button onclick="editPoints(${index})" class="button">Alterar Pontos</button>
                <button onclick="deleteTeam(${index})" class="button" style="background-color: #ff6f61;">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para adicionar uma nova equipe (não salva no Gist)
async function addTeam(event) {
    event.preventDefault();

    const name = document.querySelector('#team-name').value;
    const color = document.querySelector('#team-color').value;
    const points = parseInt(document.querySelector('#team-points').value, 10);

    const teams = await loadTeams();
    teams.push({ name, color, points });

    // Atualizar o JSON manualmente no Gist não é possível diretamente

    document.querySelector('#team-form').reset(); // Limpa o formulário
    window.location.href = 'index.html'; // Redireciona para a página inicial
}

// Função para editar pontos de uma equipe (não salva no Gist)
async function editPoints(index) {
    const newPoints = prompt('Digite os novos pontos para a equipe:');
    if (newPoints !== null) {
        const teams = await loadTeams();
        teams[index].points = parseInt(newPoints, 10);

        // Atualizar o JSON manualmente no Gist não é possível diretamente

        displayTeams(); // Atualiza a tabela
    }
}

// Função para excluir uma equipe (não salva no Gist)
async function deleteTeam(index) {
    if (confirm('Tem certeza de que deseja excluir esta equipe?')) {
        const teams = await loadTeams();
        teams.splice(index, 1);

        // Atualizar o JSON manualmente no Gist não é possível diretamente

        displayTeams(); // Atualiza a tabela
    }
}

// Verifica se estamos na página de cadastro
if (document.querySelector('#team-form')) {
    document.querySelector('#team-form').addEventListener('submit', addTeam);
}

// Exibe as equipes se estivermos na página de índice
if (document.querySelector('#ranking-table')) {
    displayTeams();
}
