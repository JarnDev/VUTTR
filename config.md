[< VOLTAR](README.md)

Para que os projetos (backend e frontend) funcionem corretamente siga esse passo a passo:

1. Clone o repositório
  
        git clone https://github.com/Jarn40/VUTTR.git
      
2.  Criar arquivos privados de configuração

    backend/src/config/private.json

        {
            "atlas_uri": "URI para conecção do MONGODB"
        }     
      
3.  Instalar dependencias

    nas pastas Backend e Frontend

        npm install
        
4. Rodas os projetos

    backend
    
        nodemon server.js
      
    frontend
      
        react-scripts start
