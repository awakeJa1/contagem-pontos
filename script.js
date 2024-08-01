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
    // Ordena as equipes pela quantidade de pontos em ordem decrescente
    teams.sort((a, b) => b.points - a.points);
    const tbody = document.querySelector("#ranking-table tbody");
    tbody.innerHTML = "";
    teams.forEach((team, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${team.name}</td>
            <td><div style="background-color: ${team.color}; width: 20px; height: 20px;"></div></td>
            <td>${team.points}</td>
            <td><button onclick="updateTeamPoints(${index})">Alterar Pontos</button></td>
        `;
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

async function getTeams() {
    return JSON.parse(localStorage.getItem("teams") || "[]");
}

async function saveTeams(teams) {
    localStorage.setItem("teams", JSON.stringify(teams));
}
