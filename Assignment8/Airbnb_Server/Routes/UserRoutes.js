const express = require('express')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const pool = require('../Mysql/mysql')
const config = require('../config')
const cryptojs = require('crypto-js')

const router = express.Router()

router.post('/registration', (req, res)=>{

    const{firstName, lastName, email, password, phone} = req.body
    const encryptedPassword = cryptojs.SHA256(password).toString()
    const sql = `insert into user(firstName, lastName, email, password, phoneNumber) values(?, ?, ?, ?, ?)`

    pool.query(sql, [firstName, lastName, email, encryptedPassword, phone], (error, data)=> {

        res.send(utils.createResult(error, data))
    })
})

router.post('/login', (req, res)=> {

    const{email, password} = req.body
    const encryptedPassword = cryptojs.SHA256(password).toString()
    const sql = `select * from user where email = ? and password = ?`

    pool.query(sql, [email, encryptedPassword], (error, data)=> {

        if(data) {

            if(data.length!=0) {

                if(data.isDeleted) {

                    res.send(utils.createErrorResult('Account is removed'))
                } else {
                    const payload = {

                        id: data[0].id
                    }
                    const token = jwt.sign(payload, config.secret)
                    const Userdata = {

                        token: token,
                        name: `${data[0].firstName} ${data[0].lastName}`
                    }
                    res.send(utils.createSuccessResult(Userdata))
                }
            } else {

                res.send(utils.createErrorResult('Invalid Email or Password'))
            }
        } else {

            res.send(utils.createErrorResult(error))
        }
    })
})

router.get('/profile', (req, res)=> {

    const sql = `select * from user where id = ?`
    pool.query(sql, [req.headers.id], (error, data)=> {

        if(data) {

            const userData = {

                firstName: data[0].firstName,
                lastName: data[0].lastName,
                phoneNumber: data[0].phoneNumber,
                email: data[0].email
            }
            res.send(utils.createSuccessResult(userData))

        } else {

            res.send(utils.createErrorResult(error))
        }
    })
})

router.put('/profile', (req, res)=> {

    const{firstName, lastName, phone} = req.body
    const sql = `update user set firstName = ?, lastName = ?, phoneNumber = ? where id = ?`
    pool.query(sql, [firstName, lastName, phone, req.headers.id], (error, data)=> {

        res.send(utils.createResult(error, data))
    })
})
module.exports = router