const express = require('express')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const pool = require('../Mysql/mysql')
const config = require('../config')
const cryptojs = require('crypto-js')

const router = express.Router()

router.post('/', (req, res)=> {

    const{categoryId, title, details, address, contactNo, ownerName, isLakeView, isTV, isAC, isWifi, isMiniBar, isBreakfast, isParking, guests, bedrooms, beds, bathrooms, rent} = req.body

    const sql = `insert into property(categoryId, title, details, address, contactNo, ownerName, isLakeView, isTV, isAC, isWifi, isMiniBar, isBreakfast, isParking, guests, bedrooms, beds, bathrooms, rent) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    pool.query(sql, [categoryId, title, details, address, contactNo, ownerName, isLakeView, isTV, isAC, isWifi, isMiniBar, isBreakfast, isParking, guests, bedrooms, beds, bathrooms, rent], (error, data)=> {
    
        res.send(utils.createResult(error, data))
    }) 
}) 

router.get('/', (req, res)=> {

    const sql = `select id, title, details, rent, profileImage from property`
    pool.query(sql, (error, data)=> {

        res.send(utils.createResult(error, data))
    })
})
module.exports = router