[< VOLTAR](README.md)

Para que os projetos (backend e frontend) funcionem corretamente siga esse passo a passo:

1. Clone o repositório
  
        git clone https://github.com/Jarn40/VUTTR.git
      
2.  Criar arquivos privados de configuração

    backend/src/config/private.json

        {
            "atlas_uri": "URI para conecção do MONGODB"
        }     
    
    backend/src/config/s3_config.json
        
        {
          "aws_config":{
            "accessKeyId": AWS_ACCESS_KEY,
            "secretAccessKey": AWS_SECRET_KEY,
            "region": AWS_REGION
          },
         "bucket": S3_BUCKET_NAME
        }
    
    frontend/src/config/private.js
    
        export const environment = {

            API_URL: 'http://localhost:3000' << URL do Backend

        }
    
3.  Instalar dependencias

    nas pastas Backend e Frontend

        npm install
        
    para utilizar o sistema de caching, instalar o redis e habilitar a porta 6379;
    
    caso o redis não esteja instalado tudo funcionará normalemente porem sem caching.
    
4. Rodas os projetos

    backend
    
        nodemon server.js
      
    frontend
      
        react-scripts start
