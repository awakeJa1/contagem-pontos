// cadastro.js
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
  
  if (document.querySelector('#team-form')) {
    document.querySelector('#team-form').addEventListener('submit', addTeam);
  }
  