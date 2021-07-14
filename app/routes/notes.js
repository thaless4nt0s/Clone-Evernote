const express = require("express")
const router = express.Router()
const Note = require("../models/note")
const WithAuth = require("../middlewares/auth")

router.post("/", WithAuth, async (req, res) => {
    const { title, body } = req.body
    try {
        let note = new Note({ title: title, body: body, author: req.user._id })
        await note.save()
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ error: 'Problem to create a new note !!' })
    }
})

router.get("/:id", WithAuth, async (req, res) => {
    try{    
        const {id} = req.params
        let note = await Note.findById(id)
        if(isOwner(req.user, note)){
            res.status(200).json(note)
        }else{
            res.status(500).json({ error: 'Permission denied to access ' })
        }
    }catch(error){
        res.status(500).json({ error: "Problem to get a note !! "})
    }
})

router.get('/', WithAuth, async (req, res) =>{
    try{
        let notes = await Note.find({author: req.user._id})
        res.json(notes)
    }catch(error){
        res.status(500).json({ error: "Problem to  get all notes !! "})
    }
})

router.put("/:id", WithAuth, async (req, res) =>{
    try{
        const {title, body} = req.body
        let {id} = req.params
        let note = await Note.findById(id)
        if(isOwner(req.user, note)){
            let note = await Note.findOneAndUpdate(id,
                {$set: {title: title, body: body}},
                {upsert: true, 'new': true}    
            )
            res.json(note)
        }else{
            res.status(500).json({error: "Permission denied to update a note !!"})
        }
    }catch(error){
        res.status(500).json({error: "Problem to update a note !!"})
    }
})

//Caso ele seja dono da nota retornará verdadeiro
const isOwner = (user, note) =>{
    if(JSON.stringify(user._id) == JSON.stringify(note.author._id)){
        return true
    }else{
        return false
    }
}

module.exports = router