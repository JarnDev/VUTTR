FORMAT: 1A

# TOOL API

HOST: localhost:3001

API para cadastro, visualização e remoção de Ferramentas.

# Group Tools

## Tools Collection [/tools{?global}{?tag}]

### List Tools [GET]

+ Parameters

  + global(string, opcional) - string para filtrar busca no banco pelos campos ( title, description, tags ), caso um dos campos contenha a string
    
    + Default: ''
    
  + tag(string, opcional) - string para filtra busca no banco pelo campo de tags, precisa ser match exato.
    
    + Default: ''

+ Request JSON

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

+ Response 401

      Unauthorized
      
### Add New Tool [POST]

+ Request JSON

  + Headers
  
        content-Type: application/json
        Authorization: "Token"

  + Body
  
        {
            "title": "Hotel",
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags": [
                "node",
                "organizing",
                "webapps",
                "domain",
                "developer",
                "https",
                "proxy"
            ]
        }
        
+ Response 200, 201
  
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
          "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
          "__v": 0
        }
        
+ Response 401

      Unauthorized
      
## Tool [/tools/{id}]

    + Parameters
      
      + tool_id: "5e597c5e1a0af90a94e68582" (required, string) - ID da ferramenta cadastrada no banco.

### Remove Tool [DELETE]
      
  + Request JSON

    + Headers

          Authorization: "Token"
        
  + Response 204
  
  + Response 401
  
        Unauthorized  
