const { Router } = require('express');
const { makeInvoker } = require('awilix-express');

const categoryController = require('../../controller/category');
const validateToken = require('../../middleware/validateToken')

const router = Router();

const api = makeInvoker(categoryController);

/**
 * @api {post} /category Creates category
 * @apiGroup Category
 * @apiName Create Category
 * @apiDescription This endpoint creates a new category
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique token.
 * @apiBody {String} name Category name
 * @apiSampleRequest /category
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Created successfully!",
 *     "data": {
 *         "name": "Tech",
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *     },
 *    "links": []
 * }
 */
router.use(validateToken).route('/').post(api('create'));


/**
 * @api {get} /category Get all category for a specific user
 * @apiGroup Category
 * @apiName Get Category By ID
 * @apiDescription This endpoint gets all category for a specific user
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique token.
 * @apiSampleRequest /category
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "",
 *     "data": [{
 *         "name": "Tech",
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *     }],
 *    "links": []
 * }
 */
router.use(validateToken).route('/').get(api('getAll'));

/**
 * @api {get} /category/:id Get category by ID for a specific user
 * @apiGroup Category
 * @apiName Get Category
 * @apiDescription This endpoint gets by id category for a specific user
 * @apiVersion 0.0.0
 * @apiHeader {String} authorization Users unique token.
 * @apiParam {String} id Category unique ID.
 * @apiSampleRequest /category/:id
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "",
 *     "data": {
 *         "name": "Tech",
 *         "_id": "6175ce167438dd9854ca2850",
 *         "created_at": "2021-10-24T21:20:22.502Z",
 *         "updated_at": "2021-10-24T21:20:22.502Z"
 *     },
 *    "links": []
 * }
 */
router.use(validateToken).route('/:id').get(api('getById'));



























module.exports = router;
