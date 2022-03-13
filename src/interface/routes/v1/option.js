const { Router } = require('express');
const { makeInvoker } = require('awilix-express');

const optionController = require('../../controller/option');
const validateToken = require('../../middleware/validateToken');

const router = Router();

const api = makeInvoker(optionController);

/**
 * @api {post} /option Creates options for a specific question
 * @apiGroup Option
 * @apiName CreateOption
 * @apiDescription This endpoint creates a new option
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique Bearer token.
 * @apiBody {Object[]} options The object includes correct type boolean, answer type string
 * @apiBody {String} question Question unique id
 * @apiSampleRequest /option
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Created successfully!",
 *     "data": [{
 *         "question": "6175ce167438dd9854ca2850",
 *         "correct": false,
 *         "answer": "hard"
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *     }],
 *    "links": []
 * }
 */
router.use(validateToken).route('/').post(api('create'));

/**
 * @api {get} /option/:id Get option by ID for a specific user
 * @apiGroup Option
 * @apiName GetOption
 * @apiDescription This endpoint gets by id option for a specific user
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique Bearer token.
 * @apiParam {String} id Option unique ID.
 * @apiSampleRequest /option/:id
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "",
 *     "data": {
 *         "question": "6175ce167438dd9854ca2850",
 *         "correct": false,
 *         "answer": "hard"
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *   },
 *    "links": []
 * }
 */
router.use(validateToken).route('/:id').get(api('getById'));

module.exports = router;
