import { all } from 'redux-saga/effects';

import { listCategoryWatcher, singleCategoryWatcher } from '@/redux/sagas/categorySaga';
import { createCommentWatcher, deleteCommentWatcher, listCommentWatcher } from '@/redux/sagas/commentSaga';
import {
	listPostCategoryWatcher,
	listPostTagWatcher,
	listPostUserWatcher,
	listPostWatcher,
	singlePostWatcher
} from '@/redux/sagas/postSaga';
import { listTagWatcher, singleTagWatcher } from '@/redux/sagas/tagSaga';
import {
	currentUserWatcher,
	loginUserWatcher,
	logoutUserWatcher,
	registerUserWatcher,
	singleUserWatcher,
	updateUserWatcher
} from '@/redux/sagas/userSaga';

function* rootSaga() {
	yield all([
		listPostWatcher(),
		listPostTagWatcher(),
		listPostCategoryWatcher(),
		listPostUserWatcher(),
		singlePostWatcher(),
		listTagWatcher(),
		singleTagWatcher(),
		listCategoryWatcher(),
		singleCategoryWatcher(),
		loginUserWatcher(),
		registerUserWatcher(),
		currentUserWatcher(),
		logoutUserWatcher(),
		singleUserWatcher(),
		updateUserWatcher(),
		listCommentWatcher(),
		createCommentWatcher(),
		deleteCommentWatcher()
	]);
}

export default rootSaga;
