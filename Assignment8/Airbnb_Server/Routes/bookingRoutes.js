const express = require('express')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const pool = require('../Mysql/mysql')
const config = require('../config')
const cryptojs = require('crypto-js')

const router = express.Router()

router.post('/', (req, res)=> {

    const{propertyId, total, fromDate, toDate} = req.body
    const sql = `insert into bookings(propertyId, userId, total, fromDate, toDate) values(?, ?, ?, ?, ?)`

    pool.query(sql, [propertyId, req.headers.id, total, fromDate, toDate], (error, data)=>{

        res.send(utils.createResult(error, data))
    })
})
router.get('/', (req, res)=> {

    const sql = `select * from bookings`
    pool.query(sql, (error, data)=> {

        res.send(utils.createResult(error, data))
    })
})
module.exports = router