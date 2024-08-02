document.addEventListener("DOMContentLoaded", () => {
    loadRanking();
    
    const form = document.getElementById("team-form");
    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const teamName = document.getElementById("team-name").value;
            const teamColor = document.getElementById("team-color").value;
            const teamPoints = parseInt(document.getElementById("team-points").value, 10);
            const teams = await getTeams();
            teams.push({ name: teamName, color: teamColor, points: teamPoints });
            await saveTeams(teams);
            window.location.href = "index.html";
        });
    }
});

async function loadRanking() {
    const teams = await getTeams();
    teams.sort((a, b) => b.points - a.points);  // Ordena as equipes por pontos (decrescente)
    const tbody = document.querySelector("#ranking-table tbody");
    tbody.innerHTML = "";
    teams.forEach((team, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = 
            `<td>${team.name}</td>
            <td><div style="background-color: ${team.color}; width: 20px; height: 20px;"></div></td>
            <td>${team.points}</td>
            <td>
                <button onclick="updateTeamPoints(${index})">Alterar Pontos</button>
                <button onclick="deleteTeam(${index})">Excluir</button>
            </td>`;
        tbody.appendChild(tr);
    });
}

async function updateTeamPoints(index) {
    const teams = await getTeams();
    const newPoints = prompt("Insira os novos pontos para a equipe:", teams[index].points);
    if (newPoints !== null) {
        teams[index].points = parseInt(newPoints, 10);
        await saveTeams(teams);
        loadRanking();
    }
}

async function deleteTeam(index) {
    const teams = await getTeams();
    if (confirm("Tem certeza de que deseja excluir esta equipe?")) {
        teams.splice(index, 1); // Remove a equipe do array com base no índice
        await saveTeams(teams); // Atualiza o armazenamento local
        loadRanking(); // Recarrega a tabela de ranking
    }
}

async function getTeams() {
    const response = await fetch('teams.json');
    if (!response.ok) {
        return [];
    }
    return await response.json();
}

async function saveTeams(teams) {
    const response = await fetch('save_teams.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teams)
    });
    if (!response.ok) {
        console.error('Erro ao salvar os dados em JSON');
    }
}
