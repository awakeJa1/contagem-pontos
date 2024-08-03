import { db } from './firebase-config.js';
import { collection, addDoc } from 'firebase/firestore';

async function addTeam(event) {
    event.preventDefault();  // Evita o comportamento padrão de envio do formulário

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

if (document.querySelector('#team-form')) {
    document.querySelector('#team-form').addEventListener('submit', addTeam);
}
