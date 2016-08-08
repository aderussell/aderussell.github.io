---
layout: post
title:  "Drawing 3D meshes"
date:   2015-01-17
tags: 3D, Mesh, Painters Algorithm, Matrix, Transformation
description: "A quick look into the basics of 3D meshes and lighting. Part 1."
imagepath: "/images/blog/painters-algorithm/"
---



3D graphics availability is now ubiquitous in modern software development; even a mobile phone can render extremely complex 3D scenes that were once just fevered dreams for all without a movie studio sized rendering suite. 
There a many different 3D libraries available with various purposes from real-time rendering (OpenGL, Direct3D, etc.) to fully photo realistic rendering (Renderman, Clarisse iFX, etc.) but they all have one basic shared concept: taking some data representation of 3D objects and producing a 2D image of those objects so that it can be displayed on a screen. 
This tutorial will look at how 3D libraries do this... sort of... well not really... in a really simplified high level example, that just about works in real time, in plain javascript. Let's crack on.

## A Mesh
To render something in 3D we need a representation of something 3D to render; we need a polygon mesh. In this example we will use a triangular mesh as it is the easiest to understand.

A polygon mesh is composed of a set of triangular polygons that are all joined together to define the shape of a 3D object. 

<<IMAGE OF MESH OF TRIANGLES>>


{% highlight c++ %}
struct Vector {
	double x; 
	double y; 
	double z;
}
{% endhighlight %}

{% highlight c++ %}
struct Vector4 {
	double x; 
	double y; 
	double z;
	double w;
}
{% endhighlight %}


{% highlight c++ %}
struct Face {
	Vector v1; 
	Vector v2; 
	Vector v3; 
}
{% endhighlight %}


{% highlight c++ %}
struct Mesh {
	Vector[]  vertices; 
	integer[] indices;
}
{% endhighlight %}


{% highlight c++ %}
struct Mesh {
	double m11, m12, m13, m14;
	double m21, m22, m23, m24;
	double m31, m32, m33, m34;
	double m41, m42, m43, m44;
}
{% endhighlight %}






Each of the triangular polygons is composed of 3 vertices which define the position of each of the corners of the triangle.

A vertex is a coordinate in 3D space; an x, y, and z value that denotes where a point on the mesh will be. for example:


Looking at the following example we can see a polygon that has been created with 3 vertices.

<<IMAGE OF POLYGON FROM 3 VERTICES>>




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


### Matrices (scale, rotation, translation, projection)





{% highlight javascript %}

// identity matrix
{ 1, 0, 0, 0
  0, 1, 0, 0
  0, 0, 1, 0
  0, 0, 0, 1 }


// translation matrix
{ 1, 0, 0, 0
  0, 1, 0, 0
  0, 0, 1, 0
  x, y, z, 1 }
  

// scale matrix
{ x, 0, 0, 0
  0, y, 0, 0
  0, 0, z, 0
  0, 0, 0, 1 }


// rotate around the x axis
{ 1, 0,       0,      0
  0, cos(a),  sin(a), 0
  0, -sin(a), cos(a), 0
  0, 0,       0,      1 }



// rotate around the y axis
{ cos(a), 0, -sin(a), 0
  0,      1, 0,       0
  sin(a), 0, cos(a),  0
  0,      0, 0,       1 }


// rotate around the z axis
{ cos(a),  sin(a), 0, 0
  -sin(a), cos(a), 0, 0
  0,       0,      1, 0
  0,       0,      0, 1 }
  
  
  
  
function matrixPerspective(fov, aspectRatio, nearZ, farZ) {

	var mtx = new Matrix44();

    var h = (1 / tan(fov/2.0));
    var w = h / aspectRatio;
    

    mtx.a[0] = w;
    mtx.a[1] = 0.0;
    mtx.a[2] = 0.0;
    mtx.a[3] = 0.0;
    
    mtx.a[4] = 0.0;
    mtx.a[5] = h;
    mtx.a[6] = 0.0;
    mtx.a[7] = 0.0;
    
    mtx.a[8] = 0.0;
    mtx.a[9] = 0.0;
    mtx.a[10] = (farZ) / (farZ - nearZ);
    mtx.a[11] = 1.0;
    
    mtx.a[12] = 0.0;
    mtx.a[13] = 0.0;
    mtx.a[14] = -farZ * nearZ / (farZ - nearZ);
    mtx.a[15] = 0.0;
    
    return mtx;
}

  
  

{% endhighlight %}




### Putting it all togethor

// load the mesh

// create the matrix

// do the matrix

// draw to screen
// * point
// * line
// * filled


<figure class="demo">
	<iframe width="100%" height="620px" src="http://jsfiddle.net/d5amc6u0/9/embedded/result,js,resources,html,css/" allowfullscreen="allowfullscreen" frameborder="0" sandbox="allow-scripts"></iframe>
	<figcapture>Thing</figcapture>
</figure>

