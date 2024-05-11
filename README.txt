-testar a aplicação:
node index.js

-gerar o exe do projeto:
pkg . --out-path dist"
vai gerar o arquivo solucoesmongodb-win.exe

-para adicionar este exec como um servico do windows
nssm stop "NODE - Solucoes MongoDB"
nssm remove "NODE - Solucoes MongoDB" confirm
nssm install "NODE - Solucoes MongoDB" "E:\Developer\SolucoesMongoDB\dist\solucoesmongodb-win.exe"
nssm set "NODE - Solucoes MongoDB" Description "Este serviço roda uma aplicação para disponibilizar o acesso ao banco dbSolucoes feito em MongoDB"
nssm start "NODE - Solucoes MongoDB"
