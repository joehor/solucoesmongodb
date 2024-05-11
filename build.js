const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Verifica se o nome do executável foi fornecido como argumento
const execName = process.argv[2];
if (!execName) {
    console.error('Por favor, forneça o nome do executável como argumento.');
    process.exit(1);
}

// Diretório onde o executável será gerado
const outDir = execName.endsWith('.exe') ? execName.slice(0, -4) : execName;

// Função para listar recursivamente todos os diretórios
function getAllDirectories(srcPath) {
    return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}

// Lista de todos os diretórios a serem incluídos
const allDirsToInclude = getAllDirectories('.');

// Verifica se o diretório de saída existe, se não, cria
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

// Comando pkg para empacotar o projeto
const pkgCommand = `pkg --out-path ${outDir} index.js ${allDirsToInclude.map(dir => `"${dir}"`).join(' ')}`;

// Executa o comando pkg
try {
    execSync(pkgCommand, { stdio: 'inherit' });
    console.log('Projeto empacotado com sucesso!');
} catch (error) {
    console.error('Erro ao empacotar o projeto:', error);
}
