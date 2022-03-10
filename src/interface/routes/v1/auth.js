const { Request, Response, Router } = require('express');
const { makeInvoker } = require('awilix-express');

const authController = require('../../controller/auth');

const router = Router();

const api = makeInvoker(authController);

/**
 * @api {post} /auth/signup Creates account for user
 * @apiGroup Auth
 * @apiName Signup
 * @apiDescription Sign up with email and password
 * @apiVersion 0.0.0
 * @apiBody {String} email=test@test.com  User's email.
 * @apiBody {String} password=djhf2309763  User's password.
 * @apiBody {String} firstName=George  User's first name
 * @apiBody {String} lastName=Bush  User's last name
 * @apiBody {String} [phone=08076548976]  Optional Phone number.
 * @apiSampleRequest /auth/signup
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Sign up successful!",
 *     "data": {
 *         "firstName": "George",
 *         "lastName": "Bush",
 *         "email": "hey@gmail.com",
 *         "emailVerified": false,
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *     },
 *    "links": []
 * }
 */
router.route('/signup').post(api('register'));

/**
 * @api {post} /auth/login Authenticate user
 * @apiGroup Auth
 * @apiName Login
 * @apiDescription Authenticate a user using email and password
 * @apiVersion 0.0.0
 * @apiParam {String} email - User's email
 * @apiParam {String} password - User's password (min 8 characters)
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Sign up successful!",
 *     "data": {
 *     },
 *    "links": []
 * }
 */
router.route('/login').post(api('login'));

module.exports = router;
