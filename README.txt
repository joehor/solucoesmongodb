-testar a aplicação:
node index.js
npm run serve

-gerar o exe do projeto:
pkg . --out-path dist"
vai gerar o arquivo solucoesmongodb.exe na pasta dist

-para adicionar este exec como um servico do windows
nssm stop "NODE - Solucoes MongoDB"
nssm remove "NODE - Solucoes MongoDB" confirm
nssm install "NODE - Solucoes MongoDB" "E:\Developer\SolucoesMongoDB\dist\solucoesmongodb.exe"
nssm set "NODE - Solucoes MongoDB" Description "Este serviço roda uma aplicação para disponibilizar o acesso ao banco dbSolucoes feito em MongoDB"
nssm start "NODE - Solucoes MongoDB"
