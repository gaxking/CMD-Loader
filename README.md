# CMD-Loader
重写一下类似Seajs的加载器

由于requireJS和SeaJS稍微都一点大，很大功能我都用不上，于是自己按照CMD规范写了一个js加载器。

but 目前发现WebPack也不错，它用CommonJs规范，能够运行在服务端，同时也支持按需加载，也能运行在浏览器端。还需要继续填坑

经过几天躺坑，发现WabPack还是有些不足，比如说require.ensure(xxx);
如果xxx是个变量，就会无法编译通过
我目前研究的项目正需要这个功能...只能放弃了

增加了三个日常使用的API
CMDLoader.use('id');  

CMDLoader.map({id:xxx});  

CMDLoader.use('id');  


增加了异步加载模式
