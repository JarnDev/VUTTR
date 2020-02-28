
const JWT = require('jsonwebtoken')
const User = require('../models/user-model')

function tokenGenerator(user){
  console.log(`${user.id} >> TOKEN`);
  return JWT.sign({
    iss: 'VUTTR',
    sub: user.id,
  }, 'VUTTR.WEBTOKEN');
}

class UserControlador {

  static rotas() {
      return {
          cadastrar: '/cadastrar',
          logar: '/logar',
          userId: '/:id',
      };
  }

  logar(){
      return (req,res) => {
        const  { user }  = req;
        const token = tokenGenerator(user);
        return res.status(202).json({ token });
      }
  }

  getOne(){
    return async (req, res) => {
      const { id } = req.params;
      const user = await User.findById(id)
      return res.json(user)
    }
  }

  cadastrar(){
    return async (req, res) =>{
      const doc = req.body;
      const exist = await User.findOne({ login: doc.login });
      if (exist) {
        return res.status(403).send(`Usuário ${doc.login} já existe.`);
      }
      await User.create(doc)
        .then((resp) => res.status(201).json(`User ${resp.firstName} criado!`))
        .catch((err) => {
          console.log(err.message);
          return res.status(400).send(err.message);
        });
    }
    
  }

  remover(){
      return async (req, res) =>{
          const { id } = req.params;
          await User.findByIdAndDelete(id)
            .catch((err) => {
              console.log(err.message);
              return res.status(400).send(err.message);
            });
          console.log(`Documento ${id} removido!`);
          return res.status(200).json(`Documento ${id} removido!`);
      }
  }
}

module.exports = UserControlador
