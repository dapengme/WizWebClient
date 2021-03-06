define(function(require, exports, module) {
	var context = require('./context'),
			constant = require('./constant'),
<<<<<<< HEAD
			loadCtrl = require('../component/loading'),
			bPostDocLock = false;
=======
			loadCtrl = require('../component/loading');
>>>>>>> origin/DEV

	//发送请求函数
	//options主要是处理url后衔接的objValue，如document_title、category_name...
	function sendRequest(apiObj, data, callback, callError, options) {
		// 发请求的时候，显示
		loadCtrl.show();
		if (!apiObj || !apiObj.url || !apiObj.action) {
			console.error('remote.sendRequest apiObj: ' + apiObj.url + '-' + apiObj.action + ' Error');
			loadCtrl.hide();
			return;
		}
		if (!callError) {
			callError = alert;
		}
		// 统一在发送请求这一层处理，不用每个地方都处理
		var _callSuccess = function (data) {
			loadCtrl.hide();
<<<<<<< HEAD
			bPostDocLock = false;
=======
>>>>>>> origin/DEV
			callback(data);
		},
			_callError = function (error) {
				loadCtrl.hide();
<<<<<<< HEAD
				bPostDocLock = false;
=======
>>>>>>> origin/DEV
				callError(error);
			},
			url = options ? (apiObj.url + '/' + options) : apiObj.url;
		$.ajax({
			url: url,
			data: data,
			dateType: 'json',
			async: apiObj.async,
			type: apiObj.action,
			success: _callSuccess,
			error: _callError,
			cache: false
		});
	}

	//获取请求参数
	function getRequestParams() {
		var params = {
			client_type: constant.remote.CLIENT_TYPE,
			api_version: constant.remote.API_VERSION,
			token: context.token,
<<<<<<< HEAD
			debug: context.debug,
			token_guid: context.token
=======
			debug: context.debug
>>>>>>> origin/DEV
		}
		return params;
	}

	/**
	 * 合并参数--不覆盖目标参数
	 * @param  {object} targetParams 目标参数
	 * @param  {object} params       被合并的参数
	 * @return {object}              合并后的参数
	 */
	function mergeParams(targetParams, params) {
		targetParams = targetParams ? targetParams : {};
		for (key in params) {
			if (!targetParams[key]) {
				targetParams[key] = params[key];
			}
		}
		return targetParams;
	}

	var Remote = {

		/* 获取用户信息 */
		getUserInfo: function (callback, callError) {
			sendRequest(constant.api.GET_USER_INFO, getRequestParams(), callback, callError);
		},

		/* 获取群组列表 */
		getGroupKbList: function (callback, callError) {
			sendRequest(constant.api.GET_GROUP_LIST, getRequestParams(), callback, callError);
		},

		/* 获取所有目录列表 */
		getAllCategory: function (kbGuid, callback, callError) {
			var requestParams = getRequestParams();
			requestParams.kbGuid = kbGuid;
			sendRequest(constant.api.CATEGORY_GET_ALL, requestParams, callback, callError);
		},

		/* 获取根节点目录列表 */
		getRootCategory: function (kbGuid, callback, callError) {
			var requestParams = getRequestParams();
			requestParams.kbGuid = kbGuid;
			sendRequest(constant.api.CATEGORY_GET_ROOT, requestParams, callback, callError);
		},

		/* 获取子节点目录列表 */
		getChildCategory: function (kbGuid, parentValue, callback, callError) {
			var requestParams = getRequestParams();
			requestParams.kbGuid = kbGuid;
			requestParams.parentValue = parentValue;
			sendRequest(constant.api.CATEGORY_GET_CHILD, requestParams, callback, callError);
		},
		/* 新建目录 */
		createCategory: function (kbGuid, name, callback, callError) {
			var requestParams = getRequestParams();
			requestParams.kbGuid = kbGuid;
			sendRequest(constant.api.CATEGORY_CREATE, requestParams, callback, callError, name);
		},

		/* 获取所有标签列表 */
		getAllTag: function (kbGuid, callback, callError) {
			var requestParams = getRequestParams();
			requestParams.kbGuid = kbGuid;
			sendRequest(constant.api.TAG_GET_ALL, requestParams, callback, callError);
		},

		/* 获取根节点标签列表 */
		getRootTag: function (kbGuid, callback, callError) {
			var requestParams = getRequestParams();
			requestParams.kbGuid = kbGuid;
			sendRequest(constant.api.TAG_GET_ROOT, requestParams, callback, callError);
		},

		/* 获取子节点标签列表 */
		getChildTag: function (kbGuid, parentValue, callback, callError) {
			var requestParams = getRequestParams();
			requestParams.kbGuid = kbGuid;
			requestParams.parentValue = parentValue;
			sendRequest(constant.api.TAG_GET_CHILD, requestParams, callback, callError);
		},

		/* 获取文档列表 */
		getDocumentList: function (kbGuid, params, callback, callError) {
			var requestParams = getRequestParams();
			requestParams = mergeParams(requestParams, params);
			requestParams.kbGuid = kbGuid;
			sendRequest(constant.api.DOCUMENT_GET_LIST, requestParams, callback, callError);
		},
		getDocumentBody: function (kbGuid, docGuid, version, callback, callError) {
			var requestParams = getRequestParams();
			requestParams.kbGuid = kbGuid;
			requestParams.docGuid = docGuid;
			requestParams.actionCmd = 'body';
			requestParams.version = version;
			sendRequest(constant.api.DOCUMENT_GET_INFO, requestParams, callback, callError);
		},
<<<<<<< HEAD

		postDocument: function (kbGuid, docInfo , callback, callError) {
			var requestParams = getRequestParams();
			requestParams = mergeParams(requestParams, docInfo);
			requestParams.kbGuid = kbGuid;
			if (bPostDocLock === true) {
				return;
			}
			// 防止多次提交
			bPostDocLock = true;
			sendRequest(constant.api.DOCUMENT_POST_DATA, requestParams, callback, callError);
		},
=======
>>>>>>> origin/DEV

		/* 保持登陆状态 */
		refreshToken: function (callback, callError) {
			var requestParams = getRequestParams();
			callback = callback ? callback : function(data) {
			};
			callError = callError ? callError : function (err) {
			};
			sendRequest(constant.api.KEEPALIVE, requestParams, callback, callError);
		}

	};


	module.exports = Remote;
});