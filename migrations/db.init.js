const pgPromise = require('pg-promise')()

const database = pgPromise({database:'lecture'})

const insertPet = (pet) => {
  database.none(`INSERT INTO "pets"
              ("name", "furcolor", "breed","adoptedDate")
              VALUES($(name), $(furcolor), $(breed), $(adoptedDate))
              `, pet)
            .then(() => {
              console.log("insert a pet", pet.name)
            })
            .catch((error) => {
              console.log("insert failed", error)
            })
}

// drop if it exists
database.none('DROP TABLE IF EXISTS pets ')
  .then(() =>{
    console.log("successfully dropped table 'pets'")
    // create a table
    database.none(`CREATE TABLE "pets" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(100) NOT NULL,
                "furcolor" VARCHAR(100) NULL,
                "adoptedDate" TIMESTAMP,
                "breed" VARCHAR(100) NOT NULL);
    `).then(() => {
      console.log("successfully created table 'pets'")
      insertPet({
        name:"Fluffy",
        furcolor:"white",
        breed:"poodle",
        adoptedDate:new Date()
      })
      insertPet({
        name:"Spot",
        furcolor:"white & black",
        breed:"mutt",
        adoptedDate:new Date()
      })
      insertPet({
        name:"Kittttttiy",
        furcolor:"orange",
        breed:"cat",
        adoptedDate:new Date()
      })
    }).catch((error) => {
      console.log(error, 'table creation failed')
    })
    // populate the database
  })
  .catch((error) => {
    console.log(error, "nope")
  })











//
