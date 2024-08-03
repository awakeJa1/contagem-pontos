// Importa a configuração do Firebase e Firestore
import { app } from './firebase-config.js';
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Inicializa Firestore
const db = getFirestore(app);

// Função para adicionar uma equipe ao Firestore
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
    await addDoc(collection(db, 'teams'), {
      name: name,
      color: color,
      points: points
    });
    console.log('Equipe cadastrada com sucesso');

    document.querySelector('#team-form').reset();
    window.location.href = 'index.html'; // Redireciona para a página de índice
  } catch (error) {
    console.error('Erro ao cadastrar equipe:', error);
  }
}

// Adiciona o ouvinte de evento ao formulário
if (document.querySelector('#team-form')) {
  document.querySelector('#team-form').addEventListener('submit', addTeam);
}
