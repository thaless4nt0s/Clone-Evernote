const express = require("express")
const router = express.Router()
const Note = require("../models/note")


router.get("/", async (req, res) =>{
    const {title, body} = req.body
    let note = new Note({title: title, body: body, author: req.user._id})
    try{
        await note.save()
        res.status(200).json(note)
    }catch(error){
        res.status(500).json({error: 'Problem to create a new note !!'})
    }
})

module.exports = router