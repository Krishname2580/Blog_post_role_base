const express = require('express')
const userAuthController = require('../controller/userAuthController')
const UserAuthCheck = require('../middleware/userAuthCheck')
const adminAuthController = require('../controller/adminAuthController')
const AdminAuthCheck = require('../middleware/adminAuthCheck')
const authorAuthController = require('../controller/authorAuthController')
const AuthorAuthCheck = require('../middleware/authorAuthCheck')

const router = express.Router()



/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Krishna
 *               email:
 *                 type: string
 *                 example: krishna@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request
 */
router.post('/register', userAuthController.Register)

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User Login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: krishna@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login Successful
 *       401:
 *         description: Invalid Credentials
 */
router.post('/login', userAuthController.login)

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: User Dashboard
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User Dashboard
 *       401:
 *         description: Unauthorized
 */
router.get('/dashboard', UserAuthCheck, userAuthController.dashboard)

/**
 * @swagger
 * /api/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     tags: [User]
 *     responses:
 *       200:
 *         description: New Access Token Generated
 *       401:
 *         description: Invalid Refresh Token
 */
router.post('/refresh-token', userAuthController.refreshToken)

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin Login
 *     tags: User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Admin Login Successful
 *       401:
 *         description: Invalid Credentials
 */
router.post('/admin/login', adminAuthController.adminlogin)

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Admin Dashboard
 *     tags: User
 *     responses:
 *       200:
 *         description: Admin Dashboard
 *       401:
 *         description: Unauthorized
 */
router.get('/admin/dashboard', AdminAuthCheck, adminAuthController.admindashboard)

/**
 * @swagger
 * /api/author/login:
 *   post:
 *     summary: Author Login
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: author@gmail.com
 *               password:
 *                 type: string
 *                 example: author123
 *     responses:
 *       200:
 *         description: Author Login Successful
 *       401:
 *         description: Invalid Credentials
 */
router.post('/author/login', authorAuthController.authorlogin)

/**
 * @swagger
 * /api/author/dashboard:
 *   get:
 *     summary: Author Dashboard
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Author Dashboard
 *       401:
 *         description: Unauthorized
 */
router.get('/author/dashboard', AuthorAuthCheck, authorAuthController.authordashboard)

module.exports = router