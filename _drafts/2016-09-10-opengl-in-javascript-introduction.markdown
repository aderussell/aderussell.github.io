---
layout: post
title:  "Building Open GL in Javascript... Sort of. Part 0 - Introduction"
date:   2016-09-09
tags: Open GL, Direct X, 3D, Graphics, Javascript, Tutorial
description: "How 3D graphics libraries actually work."
imagepath: "/images/blog/using-arcameraview/"
---

Ever wondered how Open GL and Direct X actually work?
How they actually produce a 3D image on screen?
Well, this tutorial will run though, at a high level, how a 3D graphics library actually produces an image.

This tutorial will produce a working 3D library with will be able to render images completely from scratch using javascript.



<iframe width="560" height="560" src="/demos/opengl - tutorial 0 - example 0/Z1.html" frameborder="0" seamless="seamless" scrolling="no"></iframe>


## Woah Nelly! 

Let's start by addressing the elephant in the room; why produce this in javascript?
The result is going to be slow and widely impractical for use in the real world. Why not use C++?

The answer is simple... Barrier to entry. If you are viewing the demo running at the top of this page then you have everything you need to be able to follow this tutorial, view the examples, and reproduce or edit the code.
If I had used C++ or a similar language I would have to guide you through installing a compiler and a library that can output images so that you could start and that is often enough to push people away.
By using javascript you can interact with all of the produced code right in the tutorial immediately and quickly see how it all works with no hassle. 

If the demos do not function it is as simple as updating to the latest version of Chrome or Firefox to be able to begin.


## Tutorial Contents

* Vectors
* Matrices
* View Ports
* Meshes
	* OBJ Loader
* Interpolation
* Painters Algorithm
* Depth Buffering
* Shaders
	* Gouraud
	* Phong / Blinn-Phong
	* Others
	* Normal Mapping
