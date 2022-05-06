> **学习物联网，来HaaSEDU就对了**

> **学习物联网，来HaaSEDU就对了** 

# 创建helloworld工程
本节主要介绍如何通过HaaS-Studio IDE创建helloworld工程并完成程序下载。

## 硬件连线图
本实验只需要一台HaaS600即可，无需外接其它设备。

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保：
* HaaS-Studio开发环境安装完成。详情请参考[HaaS Studio开发环境安装](./HaaS_Studio_开发环境.md)。

<br>

## 创建helloworld解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的Python案例，硬件类型选择HaaS600 EC600S，设定好工程名称及工作区路径之后，点击立即创建，创建一个JavaScript轻应用的解决方案。详细过程请参考[HaaS Studio JavaScript工程开发指南](./HaaS_Studio_JavaScript工程开发指南.md)中“创建工程”的说明。

&emsp;&emsp;
helloworld工程中脚本（app.js）内容如下，功能为周期性的打印“Hello World, time: xxx”，其中xxx为系统时间，单位为ms。

```js
console.log('hello amp!');

setInterval(function () {

  console.log('Hello World, time: ' + new Date());

}, 1000);
```

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS Studio JavaScript工程开发指南](./HaaS_Studio_JavaScript工程开发指南.md)中“推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS600之后，设备会自动重启设备。系统启动后，打开设备端的串口工具，可以看到设备会周期性的打印如下日志。

```log
...
Hello World, time: 26800
Hello World, time: 27800
Hello World, time: 28800
Hello World, time: 29800
Hello World, time: 30800
...
```

