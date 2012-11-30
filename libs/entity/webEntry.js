seajs.config({
	alias: {
		'jquery': '/libs/common/jquery/jquery-1.7.2.js',
		'cookie': '/libs/common/jquery/jquery.cookie.js',
		'ztree': '/libs/common/jquery/jquery.ztree.all-3.3.js',
		'common': '/libs/common',																//通用库
		'component': '/libs/component',													//小组件
		'config': '/conf/config',																//web的配置
		'Wiz': '/libs/Wiz',																			//Wiz相关模块
		'locale': '/locale/main'
	},
	preload: [
		'jquery'
	],
	locale: 'zh-cn'																						//默认语言包
});
seajs.modify('jquery', function (require, exports, module) {
	module.exports = jQuery = $;
});
seajs.modify('cookie', function (require, exports, module) {
	module.exports = $.cookie;
});
seajs.modify('ztree', function (require, exports, module) {
	module.exports = $.fn.zTree;
});

seajs.use(['seajs/plugins/plugin-i18n', './libs/entity/web-main']);//'./libs/entity/web-main');