# jQuery sticky plugin

A sticky plugin for jQuery.

## Compatibility

- IE 8-10, Firefox, Opera, Chrome, Safari
- ltr / rtl
- Windows / Mac

## Depends

- jQuery 1.4+
- CSS-UI

## TODO

## Demo

http://view.gitlab.pro/chenguangyin/sticky/raw/master/demo/index.html

## Usage

```javascript
var test1 = $(".test1").sticky();
var test2 = $(".test2").sticky(0, function() {
    var that = this;
    that.css("background-color", "red");
    setTimeout(function() {
        that.css("background-color", "#dad");
    }, 1000);
});
var test3 = $(".test3").sticky(20, function() {
    this.css("background-color", "blue");
}, function() {
    this.css("background-color", "gray");
});
```


## Parameter
|name  |  default | type |description |
| ------------- |:-----:| -----:| -----:|
| top | 0 | NUmber(String) | sticky状态时距离页面顶部的距离 |
| begin | null | Function | 当元素从默认状态切换到sticky状态时执行的方法 |
| end | null | Function | 当元素从sticky状态切换到默认状态时执行的方法|



## Release History

* 2013/12/09 - v1.0.0 - First release


## Authors

* [chenguangyin](http://gitlab.pro/u/chenguangyin)