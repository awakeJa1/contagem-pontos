// cadastro.js
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
  
  if (document.querySelector('#team-form')) {
    document.querySelector('#team-form').addEventListener('submit', addTeam);
  }
  