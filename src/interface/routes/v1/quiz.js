const { Router } = require('express');
const { makeInvoker } = require('awilix-express');

const quizController = require('../../controller/quiz');
const validateToken = require('../../middleware/validateToken');

const router = Router();

const api = makeInvoker(quizController);

/**
 * @api {post} /quiz Creates quiz
 * @apiGroup Quiz
 * @apiName CreateQuiz
 * @apiDescription This endpoint creates a new quiz
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique Bearer token.
 * @apiBody {String} title Quiz title
 * @apiBody {String} description Quiz description
 * @apiBody {String} category Quiz category unique id
 * @apiSampleRequest /quiz
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Created successfully!",
 *     "data": {
 *         "title": "Tech",
 *         "description": "Tech",
 *         "category": "6175ce167438dd9854ca2850",
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *     },
 *    "links": []
 * }
 */
router.use(validateToken).route('/').post(api('create'));

/**
 * @api {get} /quiz Get all quiz for a specific user
 * @apiGroup Quiz
 * @apiName QuizById
 * @apiDescription This endpoint gets all quiz for a specific user
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique Bearer token.
 * @apiSampleRequest /quiz
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "",
 *     "data": [{
 *         "title": "Tech",
 *         "description": "Tech89",
 *         "category": "Tech89",
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *     }],
 *    "links": []
 * }
 */
router.use(validateToken).route('/').get(api('getAll'));

/**
 * @api {get} /quiz/:id Get quiz by ID
 * @apiGroup Quiz
 * @apiName GetQuiz
 * @apiDescription This endpoint gets by id quiz
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique Bearer token.
 * @apiParam {String} id Quiz unique ID.
 * @apiSampleRequest /quiz/:id
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "",
 *     "data": {
 *          "title": "Tech",
 *          "description": "Tech89",
 *          "category": {
 *               "name": "Tech",
 *               "_id": "6175ce167438dd9854ca2850",
 *               "created_at": "2021-10-24T21:20:22.502Z",
 *               "updated_at": "2021-10-24T21:20:22.502Z"
 *           },
 *           questions: [
 *               {
 *               "question": "Tech",
 *                "quiz": "6175ce167438dd9854ca2850",
 *                "level": "easy",
 *                "_id": "6175ce167438dd9854ca2850",
 *                "created_at": "2021-10-24T21:20:22.502Z",
 *                "updated_at": "2021-10-24T21:20:22.502Z"
 *                 options: [
 *                      {
 *                             "question": "6175ce167438dd9854ca2850",
 *                              "correct": false,
 *                              "answer": "hard"
 *                              "_id": "6175ce167438dd9854ca2850",
 *                              "created_at": "2021-10-24T21:20:22.502Z",
 *                              "updated_at": "2021-10-24T21:20:22.502Z"
 *                      }
 *                  ]
 *               }
 *           ]
 *          "_id": "6175ce167438dd9854ca2850",
 *          "created_at": "2021-10-24T21:20:22.502Z",
 *          "updated_at": "2021-10-24T21:20:22.502Z"
 *     },
 *    "links": []
 * }
 */
router.use(validateToken).route('/:id').get(api('getById'));

module.exports = router;
