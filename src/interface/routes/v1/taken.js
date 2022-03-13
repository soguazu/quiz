const { Router } = require('express');
const { makeInvoker } = require('awilix-express');

const takenController = require('../../controller/taken');
const validateToken = require('../../middleware/validateToken');

const router = Router();

const api = makeInvoker(takenController);

/**
 * @api {post} /taken Records the information of the taken quiz
 * @apiGroup Taken
 * @apiName CreateTaken
 * @apiDescription This endpoint records information of the taken quiz
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique Bearer token.
 * @apiBody {Object[]} taken This contains information of the taken quiz
 * @apiBody {String} taken.question question unique id
 * @apiBody {String} taken.answer answer unique id
 * @apiBody {String} quiz quiz unique id
 * @apiSampleRequest /taken
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Created successfully!",
 *     "data": {
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *     },
 *    "links": []
 * }
 */
router.use(validateToken).route('/').post(api('create'));

/**
 * @api {get} /taken/:id/taken-answer Get taken by ID for a specific user
 * @apiGroup Taken
 * @apiName GetTakenAnswers
 * @apiDescription This endpoint returns the information all the passed answers to a specific quiz
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique Bearer token.
 * @apiParam {String} id Option unique ID.
 * @apiSampleRequest /taken/:id/taken-answer
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "",
 *     "data": [{
 *         "question": "6175ce167438dd9854ca2850",
 *         "answer": "6175ce167438dd9854ca2850",
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *   }],
 *    "links": []
 * }
 */
router.use(validateToken).route('/:id').get(api('getById'));

module.exports = router;
