import express from "express"
import mongoose from "mongoose"

const app = express()
app.use(express.json())

mongoose.connect("mongodb://localhost/exercises")