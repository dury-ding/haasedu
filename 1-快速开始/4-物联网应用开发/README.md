> **学习物联网，来HaaSEDU就对了**

# 物联网应用开发

&emsp;&emsp;
常规的物联网应用开发，不管是WebIDE还是小程序，都需要有专业的前端知识才能实现。而一个完整的物联网系统一般是需要有前端页面可以正好的将物联网设备的属性信息呈现给使用者或者对物联网设备上传的数据进行统计之后显示在数据大屏上。

&emsp;&emsp;
本节课程主要给大家介绍阿里云物联网平台应用开发工具 - IoT Studio如何使用。主要包含以下内容：
* IoT Studio简介
* 开通IoT Studio功能
* 快速开发一个温湿度计的Web应用

<br>

## IoT Studio简介
&emsp;&emsp;
为了降低物联网应用开发的门槛，缩短物联网系统的开发周期，阿里云提供的生产力工具-IoT Studio，属于阿里云物联网平台的一部分，提供了Web可视化开发、移动可视化开发、业务逻辑开发与物联网数据分析等一系列便捷的物联网开发工具。主要解决的是物联网开发领域开发链路长、定制化程度高、投入产出比低、技术栈复杂、协同成本高以及方案移植困难等问题,目的是帮助物联网企业完成设备上云的最后一公里。

&emsp;&emsp;
IoT Studio的架构如下图所示。
<div align="center">
<img src=./../../图片/1_IoT_Studio架构图.png width=80%/>
</div>

<br>

&emsp;&emsp;
其主要功能如下：
* Web可视化开发   
IoT Studio提供的开发工具。无需写代码，只需在编辑器中拖拽组件到画布上，再配置组件的显示样式、数据源和动作，以可视化的方式进行Web应用开发。
适用于开发状态监控面板、设备管理后台、设备数据分析报表等。

* 移动可视化开发  
与Web可视化工具功能相同，区别是在移动应用开发。

* 业务逻辑  
通过编排服务节点的方式，快速完成简单的物联网业务逻辑的设计。

* 数据分析  
物联网数据分析LA（Link Analytics）是阿里云为物联网开发者提供的数据智能分析产品，提供海量数据的存储备份、资产管理、报表分析和数据服务能力。

<br>

## 开通IoT Studio功能
&emsp;&emsp;
IoT Studio产品的网站是[IoT Studio](https://www.aliyun.com/ss/?k=iotstudio)。首次使用需要先开通IoT Studio的功能，点击下图高亮的“立即开通”按钮即可开通服务。

<div align="center">
<img src=./../../图片/1_开通IoT_Studio服务.png width=80%/>
</div>

&emsp;&emsp;
开通服务之后就可以看到，就可以在[IoT Studio](https://studio.iot.aliyun.com/)产品首页看到它提供的4项功能（下图的4个红框）的入口了。

<div align="center">
<img src=./../../图片/1_IoT_Studio首页.png width=80%/>
</div>

&emsp;&emsp;
接下来我们以”温湿度计“为例介绍怎样从头到为你完成一个Web应用。

<br>

## 温湿度计的Web应用开发
&emsp;&emsp;
下图是一个物联网应用开发的标准步骤，其中“业务逻辑开发”和“模拟设备调试”两个步骤是否需要则视自己的业务需求而定。

<div align="center">
<img src=./../../图片/1_物理网应用开发的一般流程.png width=80%/>
</div>

<br>

### **新建“普通项目”**
&emsp;&emsp;
打开IoT Studio官网（studio.iot.aliyun.com），在项目管理中创建一个空白项目，如下图所示，将此项目命名为“温湿度计”。
<div align="center">
<img src=./../../图片/1_IoT_Studio新建项目入口.png width=80%/>
</div>

<br>

### **新建“Web应用”**
&emsp;&emsp;
新建“普通项目”之后，在新项目的首页新建一个Web应用，命名为“温湿度计-web版”。
<div align="center">
<img src=./../../图片/1_新建Web应用页面.png width=80%/>
</div>

&emsp;&emsp;
Web应用创建成功后会进入到应用界面设计页面。
<div align="center">
<img src=./../../图片/1_温湿度计_Web应用开发页面.png width=80%/>
</div>


&emsp;&emsp;
点击上图红框中的“组件”按钮图标，就可以看到可用的组件列表。各组件的说明请参考[IoT Studio组件说明](https://help.aliyun.com/document_detail/125196.html)。

<br>

### **页面设计**
&emsp;&emsp;
这里我们用到2个组件：图片和表盘。将图片空间拖到中间的画布区，选中图片，点击右边的“上传图片”按钮，本文以上传HaaS EDU K1的图片为例进行演示，读者可以根据自己的实际需求或喜好上传合适的图片。
<div align="center">
<img src=./../../图片/1_IoT_Studio_HaaS_EDU_K1.png width=80%/>
</div>

&emsp;&emsp;
拖动两个表盘的组件到画布区，适当调整三个组件的大小，如上图所示。然后将两个表盘一个名称设置为“湿度计”，一个设置为“温度计”。其中温度计的“单位”格式设置为°C，“弧形进度颜色”设置为红色的渐变色，完成设计后点击保存按钮 。这样温湿度计的页面展示就完成了。
<div align="center">
<img src=./../../图片/1_HaaS_EDU_K1_温度计.png width=80%/>
</div>

<br>

### **关联产品和设备**
&emsp;&emsp;
此时回到温湿度计的主页，对产品和设备进行关联，如下图所示：
<div align="center">
<img src=./../../图片/1_IoT_Studio_关联产品和设备入口.png width=80%/>
</div>


&emsp;&emsp;
关联产品的过程如下：
<div align="center">
<img src=./../../图片/1_IoT_Studio关联产品.png width=80%/>
</div>

&emsp;&emsp;
关联设备的过程如下：
<div align="center">
<img src=./../../图片/1_IoT_Studio_关联设备.png width=80%/>
</div>
&emsp;&emsp;
产品和设备关联完毕之后，就可以将把组件和设备的属性关联起来了。

<br>

### **关联数据源**
&emsp;&emsp;
关联数据源分为如下3个步骤，每个步骤的截图如下：
* 关联产品
* 关联设备
* 关联属性

&emsp;&emsp;
具体操作步骤如下：
1. 选中湿度计表盘组件，点击右侧的“配置数据源”。

<div align="center">
<img src=./../../图片/1_IoT_Studio_湿度计设定数据源.png width=80%/>
</div>

2. 为湿度计选择所述产品
<div align="center">
<img src=./../../图片/1_IoT_Studio_湿度计选择产品.png width=80%/>
</div>

3. 为湿度计选择具体设备
<div align="center">
<img src=./../../图片/1_IoT_Studio_选择设备.png width=80%/>
</div>


4. 为湿度计选择设备的“当前湿度”属性
<div align="center">
<img src=./../../图片/1_IoT_Studio_湿度计选择属性.png width=80%/>
</div>

&emsp;&emsp;
选择好产品、设备和属性之后，可以看到湿度计表盘上面的湿度值已经已经更新为物联网平台设备属性中最新的湿度值。

&emsp;&emsp;
同样的方式为“温度计”表盘组件选择相同设备的“当前温度”属性。“温度计”和“湿度计”设定都完成后保存整个Web应用的设定。

<br>

### **业务逻辑开发**
&emsp;&emsp;
此处不涉及到业务逻辑开发。详情请参考[物联网应用开发](../../拓展知识/物联网应用开发/README.md)中的讲解。

<br>

### **模拟设备调试**
&emsp;&emsp;
此处的产品不复杂，所以直接用硬件平台和云端进行联调，不涉及到模拟设备使用。详情请参考[物联网应用开发](../../拓展知识/物联网应用开发/README.md)中的讲解。

<br>

### **发布上线**
<div align="center">
<img src=./../../图片/1_IoT_Studio_HaaS_EDU_K1_预览和发布.png width=80%/>
</div>

&emsp;&emsp;
在发布之前可以点击上图的“预览”查看应用的实际运行效果。实际运行效果如下：

<div align="center">
<img src=./../../图片/1_HaaS_EDU_K1_温湿度计.gif width=80%/>
</div>
<br>

&emsp;&emsp;
这样我们就完成了一个HaaS EDU K1温湿度计应用的完整开发流程等。

<br>

> 怎么样？是不是没想到物联网应用的开发也可以变的这么简单？赶快来试试吧。

&emsp;&emsp;
> 关于阿里云IoT Studio的详细信息，读者可以参考[物联网应用开发](../../拓展知识/物联网应用开发/README.md)
