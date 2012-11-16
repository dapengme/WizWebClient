define(function (require, exports, module) {
	'use strict'
	var _messageCenter = null,
		_node = {
			groupClass: 'group-per',
			listClass: 'group-list',
			bgClass: 'header_group_bg',						//背景div，为了遮挡页面内的其他内容
			containerClass: 'header_group_ct',
			groupEntryId: 'group_ctrl'
		},
		_setting = {
			height: '126px',
			animate_delay_ms: 200,

		};

	function getJqClassSelector(className) {
		return $('.' + className);
	}

	function getJqIdSelector(id) {
		return $('#' + id);
	}

	function initialize() {
		var entrySelector = getJqIdSelector(_node.groupEntryId),
			bgSelector = null,
			containerSelector = getJqClassSelector(_node.containerClass);

		entrySelector.css('display', 'inline-block');
		entrySelector.bind('click',	function (evt){
			containerSelector.show();
			containerSelector.animate({height: _setting.height}, _setting.animate_delay_ms);

			// 增加浮动层，防止点击页面内其他内容
			$('body').append('<div class="'+ _node.bgClass + '"></div>');
			// 动态注入的元素，需要加载后再获取选择器对象
			bgSelector = getJqClassSelector(_node.bgClass),
			bgSelector.bind('click', function (evt){
				containerSelector.animate({height: '0'}, _setting.animate_delay_ms);

				setTimeout(function(){
					containerSelector.hide();
					bgSelector.remove();
				}, 200);
			});
		});
	}


	function renderList(kbList) {
		var content = '<div><ul class="'
			+ _node.listClass + '">';
		$.each(kbList, function (index, kb) {
			content = content + '<li><a class ="'
				+ _node.groupClass
				+ '"><span></span><span>'
				+ kb.kb_name
				+ '</span></a></li>';
		});
		content += '</ul></div>';
		$('.header_group_ct').append(content);
	}

	function init(list, messageCenter) {
		try {
			_messageCenter = messageCenter;
			renderList(list);
			initialize();
		} catch (err) {
			console.log('groupEntryCtrl.init Error: ' + err);
		}
	}

	return {
		init: init
	}
});