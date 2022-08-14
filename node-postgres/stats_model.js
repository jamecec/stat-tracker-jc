require('dotenv').config()
const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

const getStats = (body) => {
  return new Promise(function(resolve, reject){
    const gamerId = body;
    pool.query('SELECT * FROM stats WHERE id = ($1)',[gamerId], (error, results)=>{
      if(error){
        reject(error)
      }
      const data = JSON.stringify(results.rows)
      resolve(data)
    })
  })
};

const createGamer = (body) => {
  return new Promise(function(resolve,reject){
    const name = body;
    pool.query('INSERT INTO gamers (name) VALUES ($1) RETURNING id',[name],(error,results)=>{
      if(error){
        reject(error)
      }
      const data = JSON.stringify(results.rows[0].id);
      resolve(`Save your id somewhere for later use! ID =  ${data}`)
    })
  })
};

const createStat = (body) => {
  return new Promise(function(resolve,reject){
    const {id, game, character, loadout, damage, kills, assists, statdate} = body;
    pool.query('INSERT INTO stats (id, game, character, loadout, damage, kills, assists, statdate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',[id, game, character, loadout, damage, kills, assists, statdate],(error,results)=>{
      if(error){
        reject(error)
      }
      const data = JSON.stringify(results.rows[0]);
      resolve(`Stat Recorded!: ${data}`)
    })
  })
};

module.exports = {
  getStats,
  createGamer,
  createStat
}
