> **学习物联网，来HaaSEDU就对了**

# 物联网平台

&emsp;&emsp;
物联网设备具有数量众多、地域分布广泛等特点。一般情况下，物联网解决方案中平台层都会使用公有云平台来实现。

&emsp;&emsp;
国内外常见的几个物联网平台有亚马逊物联网平台（Amazon IoT Core）、微软物联网平台（Azure IoT Suite）和阿里云物联网平台。

&emsp;&emsp;
常见物联网平台主要功能包括：设备接入、设备数据存储、设备信息管理、设备状态监控、设备数据的分析与展示以及对设备的控制、运维和管理，从而满足应用层不同业务场景的需求。

&emsp;&emsp;
本章接下来主要针对阿里云物联网平台的如下功能进行讲解。
* 设备接入
* 消息处理
* 数据流转

<br>

## 设备接入
&emsp;&emsp;
随着传感器和通信技术的不断发展，物联网行业方兴未艾，业务链路涉及数据采集、通信连接、数据存储、数据可视化、洞察行动决策等，但在实施过程中，碎片化的设备端通信连接难题往往就阻碍了项目落地进程。

&emsp;&emsp;
为了方便设备进入，阿里云物联网平台为不同类型设备提供不同的连接上云方案。

<br>

### **设备接入类型**

&emsp;&emsp;
为了方便设备进入，阿里云物联网平台为不同类型设备提供不同的连接上云方案：
* 资源丰富类的设备接入  
随着高性能硬件的发展，很多智能设备带有完整的Linux、Android等操作系统，在操作系统层面解决了不同通信模块的差异，硬件端的应用程序只需要集成云平台的IoT SDK，或者集成开源 MQTT SDK 即可和云端建立长连接通信链路。如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_资源丰富类的设备接入.png width=30%/>
</div>

* 资源受限类的设备接入  
物联网场景中有很大占比设备是资源受限的，运行ROTS系统，甚至无操作系统，采用MCU与通信模组的方式实现远程设备数据采集。如图 5 5所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_资源受限类设备接入.png width=30%/>
</div>

&emsp;&emsp;
市面上蜂窝模组（NB-IoT/2G/3G/4G）供应商较多，比如移远通信、芯讯通、合宙、有方科技、广和通、日海智能、高新兴等，而各家的AT指令也各不相同，为设备端应用程序开发带来了很大难度。 

&emsp;&emsp;
根据模组集成度不同，对接到阿里云IoT平台的解决方案又细分为下表所示的几种场景方案:

<div align="center">
<img src=./../../图片/ext_物理网平台_解决方案场景.png width=60%/>
</div>

<br>

* 本地通信类的设备接入  
物联网场景中还有大量设备仅具有本地局域通信能力，比如蓝牙设备、ZigBee设备、LoRa设备、Modbus设备，而不具有互联网接入协议栈支持，此时需要借助 DTU/网关设备，代理子设备把本地协议转换成MQTT协议，从而实现数据采集上云，如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_本地直连类设备接入.png width=30%/>
</div>

<br>

### **设备接入方式**

&emsp;&emsp;
阿里云物联网平台提供的设备接入方式主要包含以下两种：
* 通过MQTT协议接入物联网平台
* 通过HTTPS协议接入物联网平台

&emsp;&emsp;
其中HTTPS接入的步骤如下：
* 设备身份认证，获取数据传输的token
* 通过HTTPS上报传感器设备采集的数据

<br>

### **设备安全认证**
&emsp;&emsp;
设备接入物联网平台之前，需通过身份认证。目前物联网平台支持使用设备密钥、ID²和X.509证书进行设备身份认证。
* 设备密钥认证  
在创建产品时，认证方式选择为设备密钥，物联网平台会为设备颁发ProductSecret、DeviceSecret等密钥。设备接入物联网平台时，需使用密钥进行身份认证。针对不同的使用环境，物联网平台提供了使用密钥认证的四种认证方案：  
  * 一机一密  
每台设备烧录自己的设备证书（ProductKey、DeviceName和DeviceSecret）。
  * 一型一密预注册  
同一产品下设备烧录相同产品证书（ProductKey和ProductSecret）。开通产品的动态注册功能，设备通过动态注册获取DeviceSecret。
  * 一型一密免预注册  
同一产品下设备烧录相同产品证书（ProductKey和ProductSecret）。开通产品的动态注册功能，通过动态注册，设备不获取DeviceSecret，而是获取ClientID与DeviceToken的组合。
  * 子设备动态注册  
网关连接上云后，子设备通过动态注册获取DeviceSecret。

&emsp;&emsp;
下图是几种加密方式的对比：

<div align="center">
<img src=./../../图片/ext_物联网平台_设备秘钥认证方式对比.png width=60%/>
</div>

* X.509证书认证

&emsp;&emsp;
X.509是由国际电信联盟（ITU-T）制定的数字证书标准，具有通信实体鉴别机制。目前物联网平台华东2（上海）地域支持使用X.509证书进行设备身份认证。使用X.509证书的操作流程如下：
  * 在创建产品时，认证方式选择为X.509证书
  * 在该产品下创建设备，物联网平台会为设备颁发X.509证书和密钥
  * 开发设备端，将X.509数字证书和密钥烧录到设备上
  * 设备端上身份认证配置
  * 设备端系统启动后触发ID²认证过程

&emsp;&emsp;
阿里云物联网平台为IoT设备提供名为ID²（Internet Device ID）的身份认证机制。ID²是一种物联网设备的可信身份标识，具备不可篡改、不可伪造、全球唯一等安全属性。在创建产品时，认证方式选择ID²，设备接入物联网平台时，则会使用ID²身份认证。

&emsp;&emsp;
关于如何生成X.509证书及如何向阿里云上传证书以及如何向设备烧入证书的案例请参考[阿里云物联网平台官方文档](https://help.aliyun.com/document_detail/140588.html)。

<br>

## 消息处理
### **物模型技术**

&emsp;&emsp;
物模型是阿里云物联网平台为产品定义的数据模型，用于描述产品的功能，对于物联网平台来讲是一项非常重要的技术。因为要实现万物互联，必须要有物模型体系沉淀，才能够让各种硬件实现智能化连接。

&emsp;&emsp;
物模型是物理空间中的实体（如传感器、车载装置、楼宇、工厂等）在云端的数字化表示，从属性、服务和事件三个维度，分别描述了该实体是什么、能做什么、可以对外提供哪些信息。定义了物模型的这三个维度，即完成了产品功能的定义。物模型三个维度的详细说明请参考下表。

<div align="center">
<img src=./../../图片/ext_物理网平台_物模型描述.png width=50%/>
</div>

&emsp;&emsp;
物联网平台支持为产品定义多组功能（属性、服务和事件）。一组功能定义的集合，就是一个物模型模块。多个物模型模块，彼此互不影响。

&emsp;&emsp;
物模型模块功能，解决了工业场景中复杂的设备建模，便于在同一产品下，开发不同功能的设备。

<br>

#### **为什么需要物模型技术**
&emsp;&emsp;
在没有物模型的情况下，海量的物联网数据、设备、业务，异构的设备和数据描述方式，难以理解，互通困难。首先，产业链内部自成体系，模组、芯片、平台、方案商角色多样，跨角色协作时，数据标准各异，协作困难；其次，采集数据解析困难，难以结构化，数据利用效率低，数据价值难挖掘；最后，随着行业应用和设备量增长，新增应用需要针对不同的设备协议重复开发，难以规模化。 

<div align="center">
<img src=./../../图片/ext_物理网平台_没有物模型的情况.png width=50%/>
</div>

&emsp;&emsp;
目前物联网行业普遍存在着设备孤岛、软硬开发强耦合的问题，需要构建模型统一描述语言、面向物理实体进行统一建模，物模型作为物的抽象层屏蔽了底层终端差异，标准化了设备的能力表达和交互方式，极大降低了物联网应用开发和快速复制的成本，如下图所示的基于物模型的物联网平台。

<div align="center">
<img src=./../../图片/ext_物理网平台_有物模型的情况.png width=50%/>
</div>

<br>

#### **物模型技术**
&emsp;&emsp;
早期大多数物联网平台比如Azure、AWS都只做连接和基础管理能力，并没有围绕数字化的设备建模和数字孪生能力，不过这两年几乎所有物联网平台都开始重视物模型和数字孪生的建设。 

&emsp;&emsp;
大多数对于设备建模都采用的是面向对象语言的思路，比如WoT、OPC、OMA、 OCF、CWMP、AllJoin等。面向对象语言的抽象能力在计算机编程发展的几十年已经被证明了其适用性，物模型定义也充分借鉴了这个思路，却又因物联网而有所不同。

&emsp;&emsp;
以面向对象语言java里面的class做类比，class用属性和方法描述对象的状态和行为；物模型也可以用属性和方法来描述物的状态和行为。同时结合设备特性，阿里云物联网平台将物模型对象进行了一定的扩展，定义为属性、服务和事件三要素，事件是一类特殊的属性，比如空调的故障告警，这类属性严重性高，实时性强，一般需要监控并及时响应。为了对设备更精确的描述，物模型针对每种数据类型还定义了非常严谨的数据规范，比如在数据类型之外，还需要定义数据范围、精度、步长等规范。 

&emsp;&emsp;
阿里云IoT物模型除了通过属性、事件、服务三要素描述了物理实体能力之外，还支持千级大点位、多语言、多版本、多模块、多级级联、协议适配、云端一体化等能力，达到可以应对生活、城市、工业等不同场景定义诉求。当然为了应对上文提到的一系列技术挑战，还通过构建Alink协议、数字孪生搭建了一整套面向物理实体的数字化能力。 

&emsp;&emsp;
物模型能够以同一套Schema（模式）描述设备的能力，但由于物联网碎片化，大家对于设备能力的定义差异性非常大，同样一款空调，不同厂商定义的能力会不一样。相当于面向对象语言里面接口标准化了，但实现没有标准化。数据标准核心在于降低差异化。 

&emsp;&emsp;
数据标准是一批可用于组装物模型的标准化素材，物模型构建过程可以方便地从数据标准库中选择素材进行积木式搭建。 

&emsp;&emsp;
在传统领域碎片化严重的情况下，定义数据标准非常有挑战，通常只有深耕传统行业才能定义出来，因此更多的是引入这些行业领先者贡献数据标准，而不是自己制定。阿里云物联网云平台数据标准的沉淀主要来自ICA标准联盟，ICA标准库包括基本资源、功能模块、物模板三类素材：
*  资源：标准库中最原子的能力，有属性、事件、服务三种类型。
*  功能模块：一组资源的集合。集合中的资源可以是标准库中已有资源的组装，也可以是在当前功能模块新增的资源。
*  物模板：一组功能模块和一组资源的集合。集合中的模块和资源可以是标准库中已有模块和资源的组装，也可以是在当前物模板新增的资源。

<div align="center">
<img src=./../../图片/ext_物理网平台_物模型与数据标准库之间的关系.png width=50%/>
</div>

&emsp;&emsp;
阿里牵头的ICA标准联盟，已经沉淀了海量标准化的数据模型，核心价值是为了建模过程可以快速组装、积木式搭建、提高建模效率；另一方面标准物模板可以促进软硬件标准化，从而实现软件商、集成商对购买的硬件即插即用。 

<div align="center">
<img src=./../../图片/ext_物理网平台_ICA标准联盟合作流程.png width=50%/>
</div>

<br>

#### **物模型的价值**

&emsp;&emsp;
物模型的价值主要体现在如下几个方面：
*  低门槛接入  
提供设备建模和交互协议基础能力。这是最基础的价值，所有设备上云都需要建模和交互协议。物模型和协议设计是否足够专业，这其实是绝大多数中小企业的门槛，他们刚开始意识不到，随意设计，随着规模和业务变化弊端就会体现出来。
*  标准化  
物模型作为物联网的抽象层，类似操作系统屏蔽硬件、JVM屏蔽OS的差异性一样，通过标准化设备的能力表达和交互方式，解决了物联网严重碎片化情况下协议差异、软硬开发耦合、全链路验证流程长、设备孤岛、数据孤岛等问题。
*  生态化  
软、硬件一旦基于物模型标准化开发和交互，围绕物联网的多角色，包括ISV、SI、IHV等在设备开发、生产、运维、售卖、集成、运行等环节相互之间能够解耦，提升了设备的流通性，促进生态化。

<br>

### **广播通信**

&emsp;&emsp;
物联网平台支持广播通信，即向指定产品下的全量在线设备发送消息。设备无需订阅广播Topic，即可收到服务器发送的广播消息。
假设厂家有多个智能门锁接入物联网平台，现在需要业务服务器向全部在线设备发送一条相同的指令，使某个密码失效，如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_物联网平台广播通信.png width=70%/>
</div>

* 业务广播Topic定义

&emsp;&emsp;
业务广播Topic定义遵循/broadcast/\${ProductKey}/${user-defined topic name}(用户自定义标识)的格式。
服务器通过PubBroadcast API向业务广播Topic发送广播消息，广播消息中的请求参数如下表所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_业务广播请求参数.png width=70%/>
</div>

&emsp;&emsp;
业务服务器调用PubBroadcast接口，指定产品ProductKey和MessageContent消息内容，产品的全量在线设备就会收到广播消息。

&emsp;&emsp;
广播Topic中的MessageId是云端生成的消息ID，成功发送消息后，将作为PubBroadcast接口的返回数据返回业务服务器。

&emsp;&emsp;
各个设备端收到的payload如下：

```
{"broadcast":"this is broadcast data"} 
```

* 消息广播Topic定义

&emsp;&emsp;
设备端应用程序代码请参考下文的说明。
业务主程序：
```
/**
* node broadcast-device.js
*/const mqtt = require('aliyun-iot-mqtt');
//设备身份三元组+区域
const options = require("./iot-device-config.json");
//建立连接
const client = mqtt.getAliyunIotMqttClient(options);
//订阅广播
client.subscribe(`/broadcast/${options.productKey}/shareData`)
client.on('message', function(topic, message) { console.log("topic " + topic)
console.log("message " + message) })
```

&emsp;&emsp;
iot-device-config.json 设备配置参数：
```
{
"productKey": "替换 productKey", 
"deviceName": "替换 deviceName",
"deviceSecret": "替换 deviceSecret", 
"regionId": "cn-shanghai"
}
```

&emsp;&emsp;
业务服务器发送广播：
```
/**
* package.json 添加依赖:"@alicloud/pop-core": "1.5.2" *
/const co = require('co');
const RPCClient = require('@alicloud/pop-core').RPCClient;
const options = {
accessKey: "自己的 accessKey",
accessKeySecret: "自己的 accessKeySecret"
};
//1.创建 client
const client = new RPCClient({
accessKeyId: options.accessKey, 
secretAccessKey: options.accessKeySecret,
endpoint: 'https://iot.cn-shanghai.aliyuncs.com', 
apiVersion: '2018-01-20'
});
co(function*() {
// 2.构造 iot API
// 这里是 POP API 的 Action 
const action ='PubBroadcast';
// 这里是 POP API 的入参 
params const params = {
ProductKey: "a1p35XsaOS7",
TopicFullName: "/broadcast/a1p35XsaOS7/shareData",
MessageContent: new Buffer('{"broadcast":"this is broadcast data"}').toString('ba se64'),
}; 
//3.发送请求
const response = yield client.request(action, params);
console.log(JSON.stringify(response)); 
});
```

<br>

### **MQTT同步通信（RRPC）**

&emsp;&emsp;
MQTT协议是基于发布/订阅的异步通信模式，不适用于服务端同步控制设备端返回结果的场景。物联网平台基于MQTT协议制定了一套请求和响应的同步机制，无需改动MQTT协议即可实现同步通信。物联网平台提供API给服务端，设备端只需要按照固定的格式回复PUB消息，服务端使用API，即可同步获取设备端的响应结果。

&emsp;&emsp;
RPC（Remote Procedure Call）采用客户机/服务器模式，用户不需要了解底层技术协议，即可远程请求服务。RRPC（Revert-RPC）则可以实现由服务端向设备端发送请求，并使设备端响应的功能。 

&emsp;&emsp;
为了适应智能灯开灯、智能锁开锁、充电宝弹出、自动售货机付款后出货、按摩椅启动等业务场景，应用服务器通过 POP API 发起 RRPC 调用，设备端只需要在超时时间内，按照固定的格式回复PUB消息，服务端即可同步获取设备端的响应结果。

&emsp;&emsp;
RRPC原理如下图所示，图中的用户服务器即本节上文提到的服务端。

<div align="center">
<img src=./../../图片/ext_物理网平台_RRPC原理.png width=60%/>
</div>

&emsp;&emsp;
自定义Topic的RRPC调用的Topic格式如下：  
  * RRPC请求消息Topic：/ext/rrpc/${messgaeId}/this/is/my/topic
  * RRPC响应消息Topic：/ext/rrpc/${messgaeId}/this/is/my/topic

&emsp;&emsp;
其中${messgaeId}是IoT物联网平台生成的唯一的RRPC消息id。

&emsp;&emsp;
RRPC的实战案例请参考[阿里云物联网平台官方文档](https://help.aliyun.com/document_detail/90567.html)。

<br>

## 数据流转

### **云端数据流转**

&emsp;&emsp;
当设备接入阿里云物联网平台后，基于Topic 进行通信时，可以使用规则引擎，编写SQL对Topic中的数据进行处理，并配置转发规则将处理后的数据转发到阿里云其他服务：
*  可以转发到RDS、表格存储、HiTSDB中进行存储
*  可以转发到DataHub中，使用Streamcompute 进行流计算，使用Maxcompute进行大规模离线计算
*  可以转发到函数计算进行事件计算
*  可以转发到另一个Topic实现 M2M 通信
*  可以转发到队列MQ实现可靠消费数据
*  可以转发到消息服务MNS实现消费数据

&emsp;&emsp;
使用规则引擎时，需要基于Topic编写SQL语句处理数据。

&emsp;&emsp;
基础版自定义Topic和高级版自定义的Topic，数据格式是自定义的，物联网平台不做处理，直接流转到规则引擎处理，如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_基础版产品数据流转.png width=60%/>
</div>

&emsp;&emsp;
高级版系统中设备payload会在云端转换成物模型payload后， 再流转到规则引擎处理，如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_高级版产品数据流转.png width=60%/>
</div>

&emsp;&emsp;
接下来本节通过一个实例来介绍如何将设备上传的数据转存到数据库，实验目的示意图如下图所示：

<div align="center">
<img src=./../../图片/ext_物理网平台_数据转储.png width=60%/>
</div>

<br>

### **数据转储实战**
#### **云端开发**
* 创建设备
在阿里云物联网平台开通实例功能之后，登录物联网平台网站后，进行如下操作： 

&emsp;&emsp;
创建基础版产品，添加自定义Topic，如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_创建基础产品.png width=60%/>
</div>

&emsp;&emsp;
设备上报数据结构如下所示：
```
topic: /a1yDu7O53kE/temperature_parlor/user/temperatureData
payload: { "tempearture":23, "humidity":63 }
```

&emsp;&emsp;
添加设备获取三元组，添加标签信息，如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_数据转储_添加设备.png width=60%/>
</div>

* 表格存储

&emsp;&emsp;
开通表格存储服务（在阿里云官网搜索“表格存储”）之后，创建用于存储设备数据的表，创建过程中添加deviceId作为主键，如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_创建数据表.png width=70%/>
</div>

* 创建规则引擎

&emsp;&emsp;
创建规则引擎的过程如下图所示：

<div align="center">
<img src=./../../图片/ext_物理网平台_创建规则引擎.png width=70%/>
</div>

* 编写SQL语句，如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_编写SQL语句.png width=70%/>
</div>

* 设定转发数据配置，如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_转发规则.png width=70%/>
</div>

&emsp;&emsp;
完整规则引擎设定如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_完整规则引擎.png width=70%/>
</div>

&emsp;&emsp;
启动规则引擎，如下图所示，点击“启动”按钮 即可使能该规则引擎。

<div align="center">
<img src=./../../图片/ext_物理网平台_启动规则引擎.png width=60%/>
</div>

<br>

#### **设备端开发**

&emsp;&emsp;
模拟设备的 nodejs 脚本（脚本名称：device-2-iot-2-ots.js）内容如下：
```
// 引入依赖mqtt库，或自己实现。
const mqtt = require('aliyun-iot-mqtt');
// 设备身份。
var options = {
    productKey: "设备ProductKey",
    deviceName: "设备DeviceName",
    deviceSecret: "设备DeviceSecret",
    regionId: "cn-shanghai"
};
// 1.建立连接。
const client = mqtt.getAliyunIotMqttClient(options);
// 2.设备接收云端指令数据。
client.on('message', function(topic, message) {
    console.log("topic " + topic)
    console.log("message " + message)
})
// 3. 模拟设备上报数据（原始报文）。
setInterval(function() {
    client.publish(`/${options.productKey}/${options.deviceName}/user/temperatureData`, getPostData(),{qos:1});
}, 1000);
// 模拟设备原有报文格式。
Function getPostData() {
let payload = {
    temperature:Math.floor((Math.random() * 20) + 10)
humidity:Math.floor((Math.random() * 20) + 20)
 };
    console.log("payload=[ " + payload+" ]")
    return JSON.stringify(payload);
}
```

&emsp;&emsp;
用如下命令启动虚拟设备脚本后查看云端表格里边的数据 ，如下图所示。
```
node device-2-iot-2-ots.js 
```

<div align="center">
<img src=./../../图片/ext_物理网平台_表格存储数据.png width=80%/>
</div>

&emsp;&emsp;
当设备连接到 IoT 物联网平台，设备离线，在线状态变更会生成特定Topic的消息，服务端可以通过订阅这个Topic获得设备状态变更信息。
设备的上下线状态流转的 Topic 格式如下：
```
/as/mqtt/status/{productKey}/{deviceName}
```

&emsp;&emsp;
设备上线后的Payload数据格式如下:
```
{
"lastTime":"2021-07-15 22:17:23.101",
"iotId":"Bu1SQkSsVkPhh5JjXJ21000000",
"utcLastTime":"2021-07-15T14:17:23.101Z",
"clientIp":"42.120.75.143",
"utcTime":"2021-07-15T14:17:23.101Z",
"time":"2021-07-15 22:17:23.101",
"productKey":"a1yDu7O53kE",
"deviceName":"temperature_parlor",
"status":"online"
}
```

&emsp;&emsp;
该消息各参数说明如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_设备状态消息参数说明.png width=70%/>
</div>

&emsp;&emsp;
然后通过规则引擎SQL语句获取设备状态，SQL配置界面如下图所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_SQL配置界面.png width=70%/>
</div>

&emsp;&emsp;
在“字段”和“Topic”栏位填入图中的配置后点击确认后就可以在页面看到如下的SQL语句，这边是收到设备状态变化消息过程中实际执行的SQL语句，执行完毕之后就可以从消息体获取到设备的status，currentTime和lastTime信息了，其中a1yDu7O53kE为设备的productkey。

```
SELECT productKey, deviceName, timestamp() as timestamp , status, clientIp, time as currentTime ,lastTime 
FROM "/as/mqtt/status/ a1yDu7O53kE/temperature_parlor"
```

&emsp;&emsp;
数据流转配置界面如下图所示的操作。

<div align="center">
<img src=./../../图片/ext_物理网平台_转发规则.png width=70%/>
</div>

&emsp;&emsp;
这样系统上线之后，查看表格中的内容如图 5 32所示。

<div align="center">
<img src=./../../图片/ext_物理网平台_表格存储_设备状态信息.png width=70%/>
</div>

<br>

## 监控运维

&emsp;&emsp;
物联网平台提供在线设备数量、上下行消息数量、规则引擎流转消息次数、设备网络状态等指标数据的实时监控功能。同时，支持配置云监控报警规则，对物联网平台数据进行监控和报警。

&emsp;&emsp;
物联网平台可以实时监控阿里云账号下的设备数据和网络状态，并在实时监控页展示以下监控数据。关于实时监控和日志服务的功能请参考：
* [实时监控](https://help.aliyun.com/document_detail/274441.htm?spm=a2c4g.11186623.0.0.15bcac6eBRMCfp#concept-2321153)
* [日志服务](https://help.aliyun.com/document_detail/159422.html)


<br>

## 物联网平台开发实践
&emsp;&emsp;
本节主要针对使用物联网平台过程中最常使用的“设备接入”、“物模型管理”、“场景联动”等功能介绍如何对其进行

### **设备接入**
&emsp;&emsp;
设备接入物联网的过程中首先需要在云端创建一个能代表实际设备的设备，这个云端的设备可以看成是实际设备的一个影子。在云端创建设备需要“创建产品”和创建“设备”两个步骤。“创建产品”的目的是创建这个设备所属的品类，以方便管理同类型的不同设备；“创建设备”的目的是创建和实际设备一一对应的云端设备，详情请参考：
* [创建产品](https://help.aliyun.com/document_detail/73728.html?spm=a2c4g.11186623.0.0.4afb28c4LRh7lI)
* [创建设备](https://help.aliyun.com/document_detail/89271.html?spm=a2c4g.11186623.0.0.4afb28c4LRh7lI)


### **物模型管理**
#### **物模型概念**
&emsp;&emsp;
物模型是阿里云物联网平台为产品定义的数据模型，用于描述产品的功能。它是物理空间中的实体（如传感器、车载装置、楼宇、工厂等）在云端的数字化表示，从属性、服务和事件三个维度，分别描述了该实体是什么、能做什么、可以对外提供哪些信息。定义了物模型的这三个维度，即完成了产品功能的定义。

|功能类型|说明|
|:-|:-|
|属性（Property）|设备可读取和设置的能力。一般用于描述设备运行时的状态，如环境监测设备所读取的当前环境温度等。属性支持GET和SET请求方式。应用系统可发起对属性的读取和设置请求。|
|服务（Service）|设备可被外部调用的能力或方法，可设置输入参数和输出参数。产品提供了什么功能供云端调用。相比于属性，服务可通过一条指令实现更复杂的业务逻辑，如执行某项特定的任务。|
|事件（Event）|设备运行时，主动上报给云端的事件。事件一般包含需要被外部感知和处理的通知信息，可包含多个输出参数。例如，某项任务完成的信息，或者设备发生故障或告警时的温度等，事件可以被订阅和推送。|

&emsp;&emsp;
物联网平台支持为产品定义多组功能（属性、服务和事件）。一组功能定义的集合，就是一个物模型模块。多个物模型模块，彼此互不影响。

&emsp;&emsp;
物模型模块功能，解决了工业场景中复杂的设备建模，便于在同一产品下，开发不同功能的设备。

&emsp;&emsp;
例如，电暖扇产品的功能属性有电源开关、档位（高、中、低）和室内温度，您可以在一个模块添加前2个属性，在另一个模块添加3个属性，然后分别在不同设备端，针对不同物模型模块功能进行开发。此时，该产品下不同设备就可以实现不同功能。

&emsp;&emsp;
物联网平台已提供默认模块，您可根据需要新增自定义模块，总模块数量不超过10个。

&emsp;&emsp;
物联网平台通过定义一种物的描述语言来描述物模型模块和功能，称为TSL（Thing Specification Language）。

&emsp;&emsp;
物模型TSL文件格式为JSON。您可在物联网平台控制台产品详情页面，单击功能定义页签，单击物模型TSL，查看或导出JSON格式的TSL。相关字段说明，请参见[物模型TSL字段说明](https://help.aliyun.com/document_detail/213902.htm?spm=a2c4g.11186623.0.0.7bd846a5KmEJsi#concept-2070735)。

&emsp;&emsp;
在添加物模型的时候，可以选择手动添加一个或多个物模型，也可以选择批量添加物模型，详情请参考如下使用说明：
* [单个添加物模型](https://help.aliyun.com/document_detail/88241.html?spm=a2c4g.11186623.0.0.2bce27de9HgEJE)
* [批量添加物模型](https://help.aliyun.com/document_detail/88246.html?spm=a2c4g.11186623.0.0.2bce27de9HgEJE)


### **场景联动**
&emsp;&emsp;
场景联动是规则引擎中，一种开发自动化业务逻辑的可视化编程方式，您可以通过可视化的方式定义设备之间联动规则，并将规则部署至云端或者边缘端。详情请参考：
* [场景联动](https://help.aliyun.com/document_detail/102239.html)


