# Vue-music

<h1 align="center">Welcome to Vue-Music-Player👋</h1>
<p align="center">
  <img src="https://img.shields.io/badge/node-v10.15.3-green" />
  <img src="https://img.shields.io/badge/npm-6.14.8-yellowgreen" />
  <img src="https://img.shields.io/badge/vue-^2.6.11-greenyellow" />
  <img src="https://img.shields.io/badge/vueCli-4.5.0-yellow" />
</p>

**项目相关技术栈：`Vue.js` + `Vue Router` + `Vuex` + `axios` + `jsonp` + `better-scroll`**

## 🚀 如何运行

```
# 克隆
git clone https://github.com/yxiuzhu/vuemusic
```

```
# 打开项目目录
cd vuemusic
```

```
# 安装依赖
npm install
```

```
# 开启本地服务运行项目
npm run dev
```

## 项目演示
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410212531578.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70) ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410212055435.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)




- [项目演示地址](http://47.115.112.11:8900/)（请用chrome手机模式预览）

![音乐播放器二维码](https://img-blog.csdnimg.cn/20210410210317578.png)


## 项目页面及功能

- recommend推荐页面
- singer歌手页面
- singer-detail歌手详情页面
- player音乐播放器组件
- disc歌曲推荐歌单页面
- rank排行榜及其详情页面
- search搜索页面
- playlist歌曲播放列表组件
- usercenter用户中心页面

## 👍recommend推荐页面
- `jsonp`解决跨域问题，获取接口数据
- `axios`后端代理请求接口数据
- `slider`轮播图组件实现
- 封装第三方JS库`better-scroll`，处理移动端页面滚动
- `vue-lazyload`懒加载
- `loading`加载状态组件
- `disc`二级路由实现热门歌单推荐

## 👩‍🎤singer歌手页面

- 封装获取的歌手数据
- `listview`歌手列表组件实现右侧字母的快速导航

## 🎶singer-detail歌手详情页面

- `Vuex`对歌手数据进行状态管理
- `musiclist`组件开发

## 🎧player音乐播放器组件

- HTML5的新特性`audio`元素实现player音乐播放
- 实现对歌曲的【播放、暂停、切歌、歌单顺序播放、单曲循环、随机播放，添加喜欢】
- Vue钩子函数实现播放器动画
- 歌曲播放进度条
- mini音乐播放器

## 🎼rank排行榜及其详情页面

- 歌曲排行榜：二级路由
- 组件的扩展复用

## 🔍︎search搜索页面

- `search-box`搜索框组件（有无query搜索词）
- `search-list`推荐历史组件（无query）
- `suggest`搜索内容组件（有query）
- 缓存策略`localStorage`存储搜索历史
- `confirm`确认组件

## 📖playlist歌曲播放列表组件

- `add-song`添加歌曲到列表
- `transition-group`列表动画
- `Vue.js`组件复用

## 👨usercenter用户中心页面

- 我喜欢的歌曲列表
- 最近听的歌曲列表
- 随机播放

## 实用的组件

> 通用组件包括如下
> 
> - `confirm`确认组件
> - `listview`列表快速导航组件
> - `loading`加载状态组件
> - `noResult`组件
> - `progress-bar`进度条组件
> - `progress-circle`圆形进度条组件
> - `Scroll`移动端滚动组件
> - `search-box`搜索框组件
> - `search-list`搜索列表组件
> - `slider`轮播图组件
> - `switch`标签切换组件
> - `top-tip`顶部消息提示组件
> - `song-list`歌曲列表组件
>
> 还有一些是为本项目量身订做的组件，与上面的通用组件都在 `src/components` 目录下

## CSS布局样式

> - 公共`base.css`–基础样式，变量设置、防止高度塌陷
> - 初始化`normalize.css`-初始化浏览器样式

## 项目优化

>- `vue-lazyload`实现商品图片懒加载
>- `FastClick`解决移动端点击的300ms的延迟
>- `debounce`防抖函数实现页面刷新
>- `keep-alive`避免页面反复重渲染导致的性能问题

## 作者

👤 **y_xiuzhu(杨秀竹)**👤 老师：**ustbhuangyi(黄轶)**

[项目github地址，期待你的星星🌟](https://github.com/yxiuzhu/vuemusic)


## 项目目录结构
>supermall 
├─build --打包配置               
├─src -- 项目文件
│  ├─App.vue
│  ├─main.js
│  ├─api -- axios、jsonp服务端通讯
│  ├─base -- 基础组件
│  ├─common -- 处理缓存、操作dom、配置通讯、mixin等工具类      
│  ├─components -- 业务组件
│  ├─router -- Vue Router路由配置
│  └─store -- Vuex

## 项目总结

**`jsonp`解决跨域问题，获取接口数据**

* 使用jsonp解决跨域问题
* 将引用的第三方库jsonp进行封装

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210409204804415.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**`axios`后端代理请求接口数据**

* 使用`express`框架进行`axios`的反向代理获取接口数据

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210409210505377.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**`slider`轮播图组件实现**

* 利用第三方库`better-scroll`封装成轮播图组件，便于组件复用

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210409231458415.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**封装第三方JS库`better-scroll`，处理移动端页面滚动**

* 使用插槽封装`Scroll`组件，便于组件复用

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210409232206573.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**`disc`二级路由实现热门歌单推荐**

* 二级子路由

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410091257875.png)

**封装获取的歌手数据**

* 使用`map`将获取的歌手列表数据封装成热门及按字母顺序排列的键值对形式

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410092125617.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410092145302.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)


**`listview`歌手列表组件实现右侧字母的快速导航**

* 点击或滑动右侧导航栏，实现快速导航

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410092913778.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**`Vuex`对歌手数据进行状态管理**

* 使用`Vuex`对项目进行状态管理
* 安装`Vuex`内置 `Logger` 日志插件用于开发环境的调试

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410093653465.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

 **`musiclist`组件开发**
 
* 实现上拉图片高斯模糊，下拉图片放大的效果
* `dom.js`的`prefixStyle`实现`js`代码中针对不同浏览器的`CSS`的样式自动前缀

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410095048154.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410094925230.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**HTML5的新特性`audio`元素实现player音乐播放**
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021041009592592.png)

**实现对歌曲的【播放、暂停、切歌、歌单顺序播放、单曲循环、随机播放，添加喜欢】**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410102032938.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410102343792.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410102606597.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

* 随机播放：使用shuffle打乱当前歌曲的播放列表
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410102902746.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410102735299.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**Vue钩子函数实现播放器动画**

* 播放器展开收起动画：在`name="normal"`的CSS中实现
* 钩子函数：实现cd飞入飞出
* 使用开源的第三方库`create-keyframe-animation`来使用`js`创建cd的缩放动画
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410103715847.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410110041582.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**歌曲播放进度条**

* 直线进度条
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410140633427.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

* 圆形进度条：使用svg图像创建圆形进度条

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410153757353.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**`search-box`搜索框组件（有无query搜索词）**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410154250949.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**缓存策略`localStorage`存储搜索历史**

* 使用第三方库`good-storage`操作`localStorage`缓存

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410155203635.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

- `transition-group`列表动画：定义在父元素上

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210410155937748.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)
