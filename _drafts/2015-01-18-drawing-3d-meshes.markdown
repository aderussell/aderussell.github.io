---
layout: post
title:  "Drawing 3D meshes"
date:   2015-01-17
tags: 3D, Mesh, Painters Algorithm, Matrix, Transformation
description: "A quick look into the basics of 3D meshes and lighting."
imagepath: "/images/blog/painters-algorithm/"
---



3D graphics availability is now ubiquitous in modern software development; even a mobile phone can render extremely complex 3D scenes that were once just fevered dreams for all without a movie studio sized rendering suite. There a many different 3D libraries available with various purposes from real-time rendering (OpenGL, Direct3D, etc.) to fully photo realistic rendering (Renderman, Clarisse iFX, etc.) but they all have one basic shared concept: taking some data representation of 3D objects and producing a 2D image of those objects so that it can be displayed on a screen. This tutorial will look at how 3D libraries do this... sort of... well not really... in a really simplified high level example, that just about works in real time, in plain javascript. Let's crack on.

## A Mesh
To render in 3D we need something 3D to render; we need a polygon mesh.


A mesh at its most simple, what we will be discussing, is simply a list of vertices. A vertex is a coordinate in 3D space; an x, y, and z value that denotes where a point on the mesh will be. for example:


A vertex may have the coordinates { 1, 2, 3 }


This that in the space being rendered that point will have an x position of 1, a y position of 2, and a z position of 3; exactly like a point on a 3D graph.

If we create a second vertex with the coordinates { 2, 2, 3 } it will have the same y and z position but it's x position will be one unit further to the right.

These two vertices can be joined to create an edge.

Let's make one further vertex with the coordinates { 2, 3, 3 }. This one is a unit higher in the y direction than the second vertex. we can create edges between all of the vertices. These edges will create a closed triangle that is called a face or a polygon.

A polygon mesh is simply a set of faces/polygons that join on their edges to produce a 3D shape.

As well as triangular faces, a mesh may have quadrilateral (4 vertices) faces however triangular are more common and easier to work with so we will only work with triangular faces from now on.

### Vertices and Indicies
Even a simple mesh will probably have many thousands of faces, each with three vertices, and so will take up a sizeable space in memory. As many faces will be touching they will share vertices which will result in duplicate vertices.

To avoid this, most 3D libraries have a vertex buffer and an index buffer. The vertex buffer is just the list of vertices except that each vertex is only in the list once, i.e. there are no duplicate vertices even though they may appear in many faces.

So that the 3D library knows which vertices belong to which faces there is also an index buffer. This is simply a list of indices each of which relates the position of the vertex in the vertex buffer to be used in the face.

<figure>
	<iframe width="100%" height="620px" src="http://jsfiddle.net/d5amc6u0/9/embedded/result,js,resources,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
	<figcapture>Thing</figcapture>
</figure>

