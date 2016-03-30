var CMDLoader = (function(w) {
	var module = {};
	w.define = function (id, factory) {
		module[id] = factory;
	};

	function require(id) {
		return module[id](require);
	}

	require.async = function(id, callback) {
		if(module[id]) {
			callback(require(id));
		}else{
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = id;
			document.body.appendChild(script);
			script.onload = function() {
				var exports = require(id);
				callback(exports);
				script.parentNode.removeChild(script);
			};
		}
	};

	return {
		use : require
	};
})(window);

define('dialog', function(require) {
	var count = 0;
	var diy = require('diy');

	function dialog() {
		alert("dialog count:" + (count++) + " diy.a:" + diy.a);
	}
	return dialog;
});

define('diy', function(require) {
	return {
		a : "a",
		b : "b"
	};
});

define('main', function(require) {
	var btn1 = document.getElementById('btn1');

	var dialog = require('dialog');
	btn1.addEventListener('click', function() {
		dialog();
	});
	
	
	var btn2 = document.getElementById('btn2');
	btn2.addEventListener('click', function() {
		require.async('async', function(async) {
			async();
		});
	});
});
