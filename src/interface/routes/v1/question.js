const { Router } = require('express');
const { makeInvoker } = require('awilix-express');

const questionController = require('../../controller/question');
const validateToken = require('../../middleware/validateToken');

const router = Router();

const api = makeInvoker(questionController);

/**
 * @api {post} /question Creates question
 * @apiGroup Question
 * @apiName CreateQuestion
 * @apiDescription This endpoint creates a new question
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique Bearer token.
 * @apiBody {Object[]} questions The object includes question, level and the level simply accept easy, medium or hard
 * @apiBody {String} quiz Quiz unique id
 * @apiSampleRequest /question
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Created successfully!",
 *     "data": {
 *         "question": "You name",
 *         "level": "hard"
 *         "quiz": "6175ce167438dd9854ca2850",
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *     },
 *    "links": []
 * }
 */
router.use(validateToken).route('/').post(api('create'));

/**
 * @api {get} /question/:id Get question by ID for a specific user
 * @apiGroup Question
 * @apiName GetQuestion
 * @apiDescription This endpoint gets by id question for a specific user
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique Bearer token.
 * @apiParam {String} id Category unique ID.
 * @apiSampleRequest /question/:id
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "",
 *     "data": {
 *     "question": "Tech",
 *     "quiz": "6175ce167438dd9854ca2850",
 *     "level": "easy",
 *     "_id": "6175ce167438dd9854ca2850",
 *     "created_at": "2021-10-24T21:20:22.502Z",
 *     "updated_at": "2021-10-24T21:20:22.502Z"
 *   },
 *    "links": []
 * }
 */
router.use(validateToken).route('/:id').get(api('getById'));

module.exports = router;
