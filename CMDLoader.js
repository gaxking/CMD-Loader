window.CMDLoader = (function(w) {
	var module = {}, callbackDic = {}, asyncDic = {}, baseUrl = '', depsDic = {}, map = {};
	w.define = function (id, deps, factory) {
		var exports;

		if(Object.prototype.toString.call(deps) === '[object Array]' && deps.length === 0) {
			deps = factory;
		}

		if(typeof deps == 'function') {
			module[id] = deps;
			if(asyncDic[id]) {
				exports = require(id);
				if(callbackDic[id]) {
					if(depsDic[id]) {
						callbackDic[id](id);
					}else{
						callbackDic[id](exports);
					}
				}
			}
		}else{
			for(var i = 0;i < deps.length; i++) {
				var _id = deps[i];
				if(!module[_id]) {
					depsDic[_id] = true;
					require.async(_id, function(_id) {
						var index = deps.indexOf(_id);
						if(index!==-1)deps.splice(index, 1);

						if(deps.length==0) {
							module[id] = factory;
							exports = require(id);
							if(callbackDic[id]) {
								callbackDic[id](exports);
							}
						}
					});
				}else{
					var index = deps.indexOf(_id);
					if(index!==-1) {
						deps.splice(index, 1);
						i--;
					}

					if(deps.length === 0) {
						module[id] = factory;
						if(asyncDic[id]) {
							exports = require(id);
							if(callbackDic[id]) {
								callbackDic[id](exports);
							}
						}
					}
				}
			}
		}
	};

	function require(id) {
		return module[id](require);
	}

	require.async = function(id, callback) {
		if(callback)callbackDic[id] = callback;
		asyncDic[id] = true;

		if(module[id]) {
			var exports = require(id);
			if(callback) {
				callback(exports);
			}
		}else{
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = map[id] || baseUrl + id + '.js';
			document.body.appendChild(script);
			script.onload = function() {
				script.parentNode.removeChild(script);
			};
		}
	};

	function config(data) {
		baseUrl = data.baseUrl;
	}

	function mapFun(data) {
		map = data;
	}

	return {
		use : require.async,
		config : config,
		map: mapFun
	};
})(window);

