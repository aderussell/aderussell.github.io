---
layout: post
title:  "The Painter's Algorithm"
date:   2015-01-18
tags: 3D, Mesh, Painters Algorithm, Matrix, Transformation
description: "A quick look into the basics of 3D meshes and lighting."
imagepath: "/images/blog/painters-algorithm/"
---

The painters algorithm is one of the simplest algorithms for solving which polygons in a mesh are hidden and which are visible.
It's called so because it works somewhat like painting a picture; objects in the back are drawn first and closer objects are drawn over the top, effectively covering objects behind.

The painters algorithm in practice has a lot of problems especially when it comes to overlapping polygons but it is a good, simple example for this tutorial.
Almost all 3D engines now use some form of Catmull's/Straßer's z-buffering concept which solves this problem put will not be covered for complexity sake.

The algorithm is incredibly simple

<code>
	transform all vertices by the world matrix / view matrix
	get the depth of the face / (vertex averge depth / min / max depth)
	sort the faces by depth, back to front
	transform by the projection matrix
	draw them in the sorted order
</code>

Pretty simple, huh.

The only addition is the face sorting before transforming by the projection matrix.

Let's have a look at this working in the below example. Now can now see that, as the mesh is rotated, the faces are drawn so that those closest to the camera are always on top as opposed to the previous example where the order was fixed and produced weird results during rotation.

<iframe width="100%" height="620px" src="http://jsfiddle.net/jpcetwyq/2/embedded/result,js,resources,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
