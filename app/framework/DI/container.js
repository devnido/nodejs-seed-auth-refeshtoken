const { createContainer, asFunction, asValue, asClass } = require('awilix')

const User = require('../../components/users/user.model')
const userRepository = require('../../components/users/user.repository')
const userService = require('../../components/users/user.service')

const authController = require('../../components/auth/auth.controller')
const authRouteHandler = require('../../components/auth/auth.route-handler')
const authRoute = require('../../components/auth/auth.route')
const authValidator = require('../../components/auth/auth.validator')

const emailTemplate = require('../services/email/email.template')
const emailService = require('../services/email/email.service')
const passwordService = require('../services/password.service')
const recaptchaService = require('../services/recaptcha.service')
const tokenService = require('../services/token.service')

const config = require('../config/env')
const errorHandler = require('../middlewares/error-handler.middleware')
const routes = require('../routes/main.route')

// node_modules
const jsonwebtoken = require('jsonwebtoken')
const randToken = require('rand-token')
const request = require('request-promise-native')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')


const container = createContainer()


container
    .register({
        config: asValue(config),
        errorHandler: asValue(errorHandler),
        routes: asFunction(routes).singleton()
    })
    .register({
        emailTemplate: asValue(emailTemplate),
        emailService: asFunction(emailService).singleton(),
        passwordService: asFunction(passwordService).singleton(),
        recaptchaService: asFunction(recaptchaService).singleton(),
        tokenService: asFunction(tokenService).singleton()
    })
    .register({
        authController: asFunction(authController).singleton(),
        authRouteHandler: asFunction(authRouteHandler).singleton(),
        authRoute: asFunction(authRoute).singleton(),
        authValidator: asFunction(authValidator).singleton()
    })
    .register({
        userRepository: asFunction(userRepository).singleton(),
        userService: asFunction(userService).singleton()
    })
    .register({
        User: asValue(User)
    })
    // node_modules
    .register({
        jsonwebtoken: asValue(jsonwebtoken),
        randToken: asValue(randToken),
        request: asValue(request),
        bcrypt: asValue(bcrypt),
        nodemailer: asValue(nodemailer),
    })

module.exports = container