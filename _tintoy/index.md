---
layout: tintoy
navbar: false
title: Tin Toy
permalink: /tin-toy/
css: /stylesheets/height.css
js: /demos/heights/heights.js
imagebase: "/images/blog/tintoy/"
---

<div class="heading-section" markdown="1">
![Icon](/images/projects/tintoy-icon.png)
# Tin Toy
## Metal shaders made easy
</div>


## Intro
I really love [shadertoy.com](https://shadertoy.com). It is such a great platform for creating and sharing really fascinating shaders. I have long wished that such a thing also existed for Apple's metal shader language and so I have created my own. Introducing Tin Toy.
Currently available through [TestFlight Beta](https://testflight.apple.com/join/38YuPtRy)

![Tin Toy](/images/blog/tintoy/tintoy-rain-vid.gif)



## Some example shaders
I have converted a few interesting shaders written for shadertoy.com to metal so that they will run within Tin Toy. The attributions of the original creators is included in the tops of the files and I would like to thank them for creating and sharing such interesting work on shadertoy.com; they all given me much inspiration and have taught me a lot.


<ul class="shader-block">

{% include posts/shader-block.html name='Rain' link='/demos/tintoy/rain.metal' image='rain.png' %}
{% include posts/shader-block.html name='Plasma ball' link='/demos/tintoy/PlasmaBall.metal' image='plasma.png' %}
{% include posts/shader-block.html name='Warp' link='/demos/tintoy/warp-vortex.metal' image='warp.png' %}
{% include posts/shader-block.html name='Zebra-valley' link='/demos/tintoy/zebra-valley-2b.metal' image='zebra.png' %}
{% include posts/shader-block.html name='Ascii renderer' link='/demos/tintoy/ascii-renderer.metal' image='ascii.png' %}


</ul>