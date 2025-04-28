const express = require('express')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const pool = require('../Mysql/mysql')
const multer = require('multer')

const upload = multer({dest:'images'})

const router = express.Router()

router.post('/', upload.single('icon'), (req, res)=> {

    const {title, details} = req.body
    const fileName = req.file.filename

    const sql = `insert into category(title, details, image) values(?, ?, ?)`

    pool.query(sql, [title, details, fileName], (error, data)=> {

        res.send(utils.createResult(error, data))
    })
})

router.get('/', (req, res)=> {

    const sql = `select id, title, details, image from category`
    pool.query(sql, (error, data)=> {
    
        res.send(utils.createResult(error, data))
    })
})
module.exports = router