import express from 'express';
import UserDao from '../dao/user.dao';
import _prisma from '../db/db.connection';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import BookmarkDao from '../dao/bookmark.dao';
import BookmarkService from '../services/bookmark.service';
import BookmarkController from '../controllers/bookmark.controller';
import AuthMiddleware from '../middleware/auth.middleware';
import JwtHelper from '../helpers/jwtHelper';
import SummaryController from '../controllers/summary.controller';
import SummaryDao from '../dao/summary.dao';
import SummaryService from '../services/summary.service';

const v1Router = express.Router()

const _jwtHelper = new JwtHelper()

const _userDao = new UserDao(_prisma);
const _bookmarkDao = new BookmarkDao(_prisma);
const _summaryDao = new SummaryDao(_prisma);

const _userService = new UserService(_userDao);
const _bookmarkService = new BookmarkService(_bookmarkDao);
const _summaryService = new SummaryService(_summaryDao, _bookmarkDao);

const _userController = new UserController(_userService);
const _bookmarkController = new BookmarkController(_bookmarkService);
const _summaryController = new SummaryController(_summaryService)

const authMiddleware = new AuthMiddleware(_jwtHelper, _userService);

const userRouter = express.Router();
userRouter.post('/signup', _userController.signUpUser);
userRouter.post('/signin', _userController.signInUser);
v1Router.use('/user', userRouter);

const bookmarkRouter = express.Router();
bookmarkRouter.post('/', authMiddleware.authenticate, _bookmarkController.createBookmark);
bookmarkRouter.get('/', authMiddleware.authenticate, _bookmarkController.getBookmarksByUserId);
bookmarkRouter.delete('/:id', authMiddleware.authenticate, _bookmarkController.deleteBookmark);
v1Router.use('/bookmark', bookmarkRouter);

const summaryRouter = express.Router();
summaryRouter.get('/:id', authMiddleware.authenticate, _summaryController.createSummary);
v1Router.use('/summary', summaryRouter);

export default v1Router;