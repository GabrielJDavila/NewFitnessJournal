const express = require("express")

const app = express()

app.listen(3000, () => {
    console.log(" server running on port 3000 http://localhost:3000 ")
})

app.get("/", (req, res) => {
    res.send("Hello world!")
})

// import express from 'express';
// import mongoose from 'mongoose';

// const app = express();
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/exercise')
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

// import express from "express"
// import mongoose from "mongoose"

// const express = require("express")
// const app = express()
// // const PORT = 8080
// const mongoose = require("mongoose")

// app.use(express.json())

// app.get("/exercises", (req, res) => {
//     res.status(200).send({
//         exercise: "dumbbell 3 point row on bench",
//         category: "back"
//     })
// })

// app.post("/exercises/:id", (req, res) => {
//     const { id } = req.params
//     const { exercise } = req.body

//     if(!exercise) {
//         res.status(418).send({ message: "We need a logo!" })
//     }
//     res.send({
//         exercise: `here is your ${exercise} and ID of ${id}`
//     })
// })

// mongoose.connect("mongodb://localhost/exercises")
// const db = mongoose.connection
// db.on("error", (error) => console.error(error))
// db.once("open", () => console.log("connected to DB"))

// app.listen(3000, () => console.log(`server started`)
// )

// const app = express()
// app.use(express.json())


//     .then(() => console.log("Connected to MongoDB..."))
//     .catch(err => console.error("Could not connect...", err))

// const port = process.env.PORT || 3000
// app.listen(port, () => console.log(`Listening on port ${port}...`))