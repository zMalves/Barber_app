# Instruções para Instalação do Sistema de Agendamento de Barbearia

Este arquivo contém instruções para instalar e configurar o sistema de agendamento de barbearia com banco de dados PostgreSQL.

## Conteúdo do Pacote

- `backup_barbearia.zip`: Contém o código-fonte da aplicação
- `barbearia_database.dump`: Backup do banco de dados PostgreSQL com dados de exemplo

## Requisitos do Sistema

- Node.js 18+ (recomendado Node.js 20)
- PostgreSQL 14+
- npm ou yarn

## Passos para Instalação

### 1. Extrair os arquivos
```bash
unzip barbearia_completa.zip
unzip backup_barbearia.zip
```

### 2. Restaurar o Banco de Dados
```bash
# Criar um banco de dados para a aplicação
createdb barbearia

# Restaurar o dump no banco de dados
pg_restore -d barbearia barbearia_database.dump
```

### 3. Configurar a Aplicação
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (ajuste conforme seu ambiente):
```
DATABASE_URL=postgres://seu_usuario:sua_senha@localhost:5432/barbearia
```

### 4. Instalar Dependências e Iniciar o Projeto
```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em: http://localhost:5000

## Informações Importantes

- A aplicação utiliza o PostgreSQL para armazenar dados dos barbeiros, serviços, horários e agendamentos
- As informações dos clientes são salvas localmente usando localStorage para facilitar agendamentos futuros
- O sistema foi projetado para ser simples e intuitivo, com um fluxo de agendamento em uma única página

## Solução de Problemas

Se encontrar problemas com a conexão do banco de dados:
1. Verifique se o PostgreSQL está em execução
2. Confirme se as credenciais no arquivo `.env` estão corretas
3. Certifique-se de que o banco de dados foi restaurado corretamente

Para problemas com a aplicação:
1. Limpe o cache do navegador
2. Verifique os logs do servidor em execução