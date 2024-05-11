-testar a aplicação:
node index.js

-gerar o exe do projeto:
pkg index.js -o meuapp.exe

-gerar o exe de todos os arquivos e pastas do projeto
node build.js

-o pkg não funcionou para gerar o exe então usei o próprio node
node -e "require('fs').copyFileSync(process.execPath, 'solucoesmongodb.exe')"
- gerou o exe mas não funciona

-para adicionar este exec como um servico do windows
nssm stop "NODE - Solucoes MongoDB"
nssm remove "NODE - Solucoes MongoDB" confirm
nssm install "NODE - Solucoes MongoDB" "E:\Developer\SolucoesMongoDB\SolucoesMongoDB.exe"
nssm set "NODE - Solucoes MongoDB" Description "Este serviço roda uma aplicação para disponibilizar o acesso ao banco dbSolucoes feito em MongoDB"
nssm start "NODE - Solucoes MongoDB"

- o solucoesmongodb.exe não funcionou, então vou usar direto do diretório de trabalho
nssm install "NODE - Solucoes MongoDB" "C:Program Files\nodejs\node.exe" "E:\Developer\SolucoesMongoDB\SolucoesMongoDB.exe"