const User = require('../models/user');
const emailValidator = require('deep-email-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');


function isStrongPassword(password) {
  if (password.length < 8 || password.length > 20) {
    return false;
  }

  if (!/[a-z]/.test(password)) {
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    return false;
  }

  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
    return false;
  }

  return true;
}

// GET a single user by ID
async function getUser(req, res) {
  try {

    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie,"secret")

    if(!claims){
      return res.status(401).json({ error: 'Não autenticado.' });
    }

    const user = await User.findOne({id: claims.id})

    const {password, ...data} = await user.toJSON()

    res.send(data)

  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

// POST create a new user
async function createUser(req, res) {
  const { name, email, password } = req.body;
  if(!name || !email || !password || 
    typeof(name) !== 'string' || typeof(email) !== 'string' ||
    typeof(password) !== 'string'){
   return res.status(400).json({ error: 'Campo inválido.' });
 }

  const {valid} = await emailValidator.validate(email);

  if (!valid) {
  return res.status(400).send({
    error: "Favor informar um e-mail válido."
  })
  }

  if(isStrongPassword(password) == false){
    return res.status(400).send({
      error: "Favor informar uma senha válida."
    })
  }

  const duplicatedEmail = await User.findOne({
    where: {
      email: {
        [Op.eq]: email // Use the Sequelize operator for equality
      }
    }
  });

  if(duplicatedEmail){
    return res.status(400).send({
      error: "Já existe um usuário com este e-mail."
    })
  }

  const salt = await bcrypt.genSalt(12)
  const encryptedPassword = await bcrypt.hash(password, salt)

  try {
    const newUser = await User.create({ name, email, password:encryptedPassword });
    
    const { id } = await newUser.toJSON();

    const token = jwt.sign({id: id}, "secret")

    await newUser.save()

    res.status(201).json({msg: 'Usuário criado com sucesso!'})

  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

async function loginUser(req, res) {

  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: {
        [Op.eq]: email // Use the Sequelize operator for equality
      }
    }
  });

  if (!user || user.status == 'deleted') {
    res.status(404).json({ error: 'Usuário não encontrado!'});
  } 

  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword){
      return res.status(404).json({ error : 'Senha inválida!'})
  }


  try{

    const secret = process.env.SECRET;

    user.password = undefined;

    const token = jwt.sign(
        {
        id: user._id
        },
        secret
        )
        
        res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token, user:user })

} catch(error){
    console.log(error)
    res.status(500).json({ error :'Erro interno no servidor'})
}

}

module.exports = {
  getUser,
  createUser,
  loginUser
};
