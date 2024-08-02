const fetch = require('node-fetch');
const { Octokit } = require("@octokit/rest");

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const data = JSON.parse(event.body);
    const repoOwner = 'awakeJa1';  // Substitua pelo seu usuário do GitHub
    const repoName = 'contagem-pontos';  // Substitua pelo seu repositório
    const filePath = 'teams.json';
    const branch = 'main'; // Substitua pelo seu branch

    const octokit = new Octokit({
        auth: `your_github_token` // Substitua pelo seu token de acesso do GitHub
    });

    try {
        // Obter o SHA do último commit
        const { data: refData } = await octokit.git.getRef({
            owner: repoOwner,
            repo: repoName,
            ref: `heads/${branch}`
        });

        const { data: fileData } = await octokit.repos.getContent({
            owner: repoOwner,
            repo: repoName,
            path: filePath,
            ref: branch
        });

        const sha = fileData.sha;

        // Atualizar o arquivo JSON
        await octokit.repos.createOrUpdateFileContents({
            owner: repoOwner,
            repo: repoName,
            path: filePath,
            message: 'Atualizar teams.json',
            content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
            sha: sha,
            branch: branch
        });

        return {
            statusCode: 200,
            body: 'Success',
        };
    } catch (error) {
        console.error('Error writing file', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
};
