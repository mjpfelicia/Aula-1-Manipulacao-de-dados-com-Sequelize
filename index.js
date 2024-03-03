// Importando as biliotecas
const { create } = require("domain");
const { Sequelize, Model, DataTypes } = require("sequelize");

//Abrindo conexão com o Banco de dados ou criando um novo caso não exista
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "empresa.sqlite"
});

class Setor extends Model {

  static init(sequelize) {
    super.init({
      idsetor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      ramal: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
    }, { sequelize, modelname: 'setor', tableName: 'setores' })
  }
}

class Funcionario extends Model {

  static init(sequelize) {
    super.init({
      matricula: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      idsetor: {
        type: DataTypes.INTEGER,
        references: {
          model: Setor,
          key: 'idsetor'
        }
      },
      nome: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      nascimeto: {
        type: DataTypes.DATE
      },
      telefone: {
        type: DataTypes.STRING(15)
      }



    }, { sequelize, modelName: 'funcionario', tableName: 'funcionarios' })
  }
}

Setor.init(sequelize);
Funcionario.init(sequelize);

(async () => {
  const { modelManager } = await sequelize.sync({ force: true });


  // usando o create 
  const setor_f = await Setor.create({
    nome: "Financeiro", ramal: "2134", email: "financeiro@empresa.com"
  });
  const setor_create_S = await Setor.create({
    nome: "Secretaria", ramal: "2135", email: "secretaria@empresa.com"
  });
  const setor_create_P = await Setor.create({
    nome: "Portaria", ramal: "2136", email: "portaria@empresa.com"
  });


  //Read - listar objetos
  const setores_listar = await Setor.findAll();
  console.log("Lista de setores:\n", JSON.stringify(setores_listar, null, 2), "\n\n")


  //Alterando objetos – UPDATE
  const setor_chave = await Setor.findByPk(3);
  setor_chave.nome = "Estoque";
  const resultado = await setor_chave.save();
  console.log(resultado);

  setores_update = await Setor.findAll();
  console.log("Lista de setores atualizada: \n", JSON.stringify(setores_update, null, 2), "\n\n");



  //Deletar objetos – DELETE
  const setor_delete = await Setor.findByPk(1);
  setor_delete.destroy();

  //listando objetos após a exclusão do setor 1 - Financeiro
  const setores_exclusao = await Setor.findAll();
  console.log("Lista de setores após a exclusão: \n", JSON.stringify(setores_exclusao, null, 2), "\n\n");



  //create funcionarios

  const funcionario_create = await Funcionario.create({
    idsetor: 2, nome: 'Ana', nascimeto: "1978-04-02", telefone: "01212219"
  });

  const funcionario_create1 = await Funcionario.create({
    idsetor: 3, nome: 'Ivo', nascimeto: "200-12-01", telefone: "121511"
  });
  const funcionario_create2 = await Funcionario.create({
    idsetor: 2, nome: 'OTO', nascimeto: "1987-03-09", telefone: "999999"
  });
  const funcionario_create3 = await Funcionario.create({
    idsetor: 2, nome: 'Catarina', nascimeto: "1998-09-09", telefone: "01212219"
  });
  




  console.table({ tabelas: modelManager.all })
})();

// sequelize.sync({ force: true })
//   .then(({ modelManager }) => {
//     console.table({ tabelas: modelManager.all })
//   }).catch(error => {
//     console.error({ error })
//   })