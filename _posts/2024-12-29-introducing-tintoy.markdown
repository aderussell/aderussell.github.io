---
layout: post
title:  "Introducing Tin Toy"
date:   2024-12-29
tags: metal, shaders, graphics
description: "Easily create Apple Metal shaders"
imagebase: "/images/blog/tintoy/"
---

## Intro
I really love [shadertoy.com](https://shadertoy.com). It is such a great platform for creating and sharing really fascinating shaders. I have long wished that such a thing also existed for Apple's metal shader language and so I have created my own. Introducing Tin Toy.
Currently available through [TestFlight Beta](https://testflight.apple.com/join/38YuPtRy)

![Tin Toy](/images/blog/tintoy/tintoy-rain-vid.gif)

## Creating a shader

The structure of are functions within the shader are based upon those from shadertoy.com but with a few differences:
* The fragCoord passed into the shader function is proportional (between 0-1) rather than a pixel value. This may change in future betas though.
* The xy mouse position is not just for when the left mouse button is pressed, but for any button state.
* The keyboard texture currently uses the carbon key values for the positions. This may change in future betas depending on feedback.


The easiest way to start creating a shader is to use the template. This can be created from the 'New from Default Template...' option in the File menu. It will give you a default function for the main shader and the cubemap.


### The function signatures

```glsl
[[visible]]
half4 mainFragment(float2 fragCoord, constant FragmentUniforms &uniforms) {
    half4 finalColor = half4(0,0,0,1);
    // perform
    return finalColor;
}
```

```glsl
[[visible]]
half4 bufferA(float2 fragCoord, constant FragmentUniforms &uniforms) {  // works for bufferA, bufferB, bufferC, & bufferD
    half4 finalColor = half4(0,0,0,1);
    // perform
    return finalColor;
}
```

```glsl
[[visible]]
half4 mainCubemap(float2 fragCoord, float3 rayOrigin, float3 rayDirection, constant FragmentUniforms &uniforms) {
    half4 finalColor = half4(0,0,0,1);
    // perform
    return finalColor;
}
```


### The uniforms
Each of the render methods are provided a uniform struct of values with contains the inputs and textures.

```glsl
struct FragmentUniforms {
    float time;                     // the current time through the render in seconds
    float timeDelta;                // the time it takes to render the last frame, in seconds
    float frameRate;                // currently pinned to 60
    int frame;                      // the count of the current frame
    int4 date;                      // the date as year, month, dat, and time in seconds as the .xyzw
    float2 resolution;              // the resolution of the viewport
    float4 mouse;                   // the current mouse position on the viewport as .xy, and the position a left click started as .zw
    float4 textureMediaTimes;       // the times of media for each of the four textures in the x, y, z, & w values. 0 if not applicable.
    texture2d<half> textureA;       // the texture in slot A. If not set in the app it is a default missing-texture appearance.
    texture2d<half> textureB;       // the texture in slot B. If not set in the app it is a default missing-texture appearance.
    texture2d<half> textureC;       // the texture in slot C. If not set in the app it is a default missing-texture appearance.
    texture2d<half> textureD;       // the texture in slot D. If not set in the app it is a default missing-texture appearance. 
    texturecube<half> cubemap;      // the texture created by the cubemap function. A black texture if not implemented.
};

```

These need to be defined at the top of the metal file being rendered and are automatically included in the template file for the shader.


## Providing textures

Much like shadertoy it has the functionality to pass four textures (and a cubemap) to each of the rendering stages. These can be the output buffer of one of the render stages, an image, a frame of a video, a texture with states of keyboard key presses, or the webcam.

These can be specified independently for each stage allowing stages to be changed together.

## Viewing the outputs
When launched, the default output render is the main fragment but it is possible to change to view the output of each buffer, view them all mixed togethor, and also view the output of the cubemap as either a cubemap or as a equirectangular.

![Changing output](/images/blog/tintoy/changing-views.gif)

## Some example shaders
I have converted a few interesting shaders written for shadertoy.com to metal so that they will run within Tin Toy. The attributions of the original creators is included in the tops of the files and I would like to thank them for creating and sharing such interesting work on shadertoy.com; they all given me much inspiration and have taught me a lot.


<ul class="shader-block">

{% include posts/shader-block.html name='Rain' link='/demos/tintoy/rain.metal' image='rain.png' %}
{% include posts/shader-block.html name='Plasma ball' link='/demos/tintoy/PlasmaBall.metal' image='plasma.png' %}
{% include posts/shader-block.html name='Warp' link='/demos/tintoy/warp-vortex.metal' image='warp.png' %}
{% include posts/shader-block.html name='Zebra-valley' link='/demos/tintoy/zebra-valley-2b.metal' image='zebra.png' %}
{% include posts/shader-block.html name='Ascii renderer' link='/demos/tintoy/ascii-renderer.metal' image='ascii.png' %}


</ul>