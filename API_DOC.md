FORMAT: 1A

# VUTTR API

HOST: localhost:3001


# Group Users

## Login [/user/logar]

### Login [POST]

+ Request (application/json)

    + Attributes
    
        + login:jarn40(string,required) - Ultimo Nome do usuario
        + password:123(string,required) - Ultimo Nome do usuario
        
+ Response 202 (application/json)
    
        {"token": "token"}

## Cadastro [/user/cadastrar]

### Cadastrar [POST]

+ Request (application/json)

    + Attributes

        + firstName:Alfredo(string,required) - Primeiro Nome do usuario
        + lastName:Neto(string,required) - Ultimo Nome do usuario
        + login:jarn40(string,required) - Login do usuario
        + password:123(string,required) - Senha do usuario
        + avatar:https://avatars1.githubusercontent.com/u/20113585?s=460&v=4(string,optional) - Link opcional de imagem hospedada em nuvem
        


+ Response 201 (application/json)

        {
            "firstName": "Alfredo",
            "lastName": "Neto",
            "login": "jarn40",
            "password": "123",
            "avatar": "https://avatars1.githubusercontent.com/u/20113585?s=460&v=4"
        }

+ Response 400 (text/html)

        Error Message

+ Response 403 (text/html)

        Usuário jarn40 já existe.

## Manipulaçao de Usuario específico [/user/{id}]

+ Parameters
    + id:5e56a7c91575415d407ee4b6(string,required) - Id da ferramenta

### Cadastrar [GET]

+ Request

    + Headers
        
            Authorization : "Token"

+ Response 200 (application/json)

        {
            "_id": "5e56a7c91575415d407ee4b6",
            "firstName": "Alfredo",
            "lastName": "Neto",
            "avatar": "",
            "login": "root",
            "password": "$2b$07$c5o5PkJ9ODndyDxw6Px03O/KzeQ15WpKCxQGFaIP96QmW7O37QYZe",
            "createdAt": "2020-02-26T17:15:53.689Z",
            "updatedAt": "2020-02-26T17:15:53.689Z",
            "__v": 0
        }

+ Response 401 (text/html)

        Unauthorized

### Deletar [DELETE]

+ Request

    + Headers
        
            Authorization : "Token"

+ Response 200 (application/json)

        {
            "Documento 5e56a7c91575415d407ee4b6 removido!"
        }

+ Response 400 (text/html)

        Error Message

+ Response 401 (text/html)

        Unauthorized

# Group Tools

## Ferramentas [/tools{?global,tag}]
+ Parameters

  + global(string, optional) - string para filtrar busca no banco pelos campos ( title, description, tags ), caso um dos campos contenha a string
    
  + tag(string, optional) - string para filtra busca no banco pelo campo de tags, precisa ser match exato.

### Listar [GET]

+ Request

  + Headers
  
            Authorization: "Token"

+ Response 200 (application/json)

        [
            {
            "tags": [
                "css",
                "tricks",
                "efficiency"
            ],
            "_id": "5e582b4cb49c105e8c105a0b",
            "title": "CssTricks",
            "link": "https://css-tricks.com/",
            "description": "tricks to use Css ",
            "__v": 0
            },
            {
            "tags": [
                "tv",
                "globo",
                "bbb",
                "series"
            ],
            "_id": "5e589ab5022ab42830825ac8",
            "title": "GloboPlay",
            "link": "https://globoplay.globo.com/",
            "description": "TV 24Hrs",
            "__v": 0
            }
            ...
        ]

+ Response 401 (text/html)

        Unauthorized
      
### Adicionar [POST]
:::warning
#### <i class="fa fa-warning"></i> Cuidado
Com o método POST os parametros opicionais não devem ser enviados!!
:::


+ Request (application/json)

  + Attributes
        + title:Hotel(string,required) - Titulo da Ferramenta
        + link:https://github.com/typicode/hotel(string,required) - HTTP link da Ferramenta
        + description:Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.(string,required) - Breve Descrição da ferramenta
        + tags:node,organizing,webapps,domain,developer(array[string], required) - Lista de tags relacionadas a ferramenta
        + avatar:https://avatars1.githubusercontent.com/u/20113585?s=460&v=4(string,optional) - Link da imagem hospedada em cloud
  + Headers
  
            Authorization: "Token"
        
+ Response 200 (application/json)
  
        {
          "tags": [
            "node",
            "organizing",
            "webapps",
            "domain",
            "developer",
            "https",
            "proxy"
          ],
          "_id": "5e597c5e1a0af90a94e68582",
          "title": "Figura",
          "link": "https://github.com/typicode/hotel",
          "avatar":"https://avatars1.githubusercontent.com/u/20113585?s=460&v=4",
          "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
          "__v": 0
        }
        
+ Response 201 (application/json)
  
        {
          "tags": [
            "node",
            "organizing",
            "webapps",
            "domain",
            "developer",
            "https",
            "proxy"
          ],
          "_id": "5e597c5e1a0af90a94e68582",
          "title": "Figura",
          "link": "https://github.com/typicode/hotel",
          "avatar":"https://avatars1.githubusercontent.com/u/20113585?s=460&v=4",
          "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
          "__v": 0
        }

+ Response 401

        Unauthorized
     
      
## Ferramentas [/tools/{id}]

+ Parameters
    + id:5e597c5e1a0af90a94e68582(string,required) - Id da ferramenta a ser removida

### Remover [DELETE]
      
  + Request JSON

    + Headers

            Authorization: "Token"
        
  + Response 204
  
  + Response 401
  
        Unauthorized  
