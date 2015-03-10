---
layout: project
title:    ARPhysics
#logofile: arphysics-logo.png
permalink: /projects/arphysics/
imagebase: /images/projects/
navbar: false
css: /projects/arphysics.css
---


<p class="intro">
ARPhysics is a real-time 2D rigid-body physics library, written by me as my final-year Computer Science undergraduate project while at the University of Plymouth.
It takes the form of a static library that can be linked in any other project. It is written using standard C++11 so it can be complied for any platform using a compliant compiler.
</p>


<figure>
<img src="{{ "arphysics-cloth.png" | prepend: page.imagebase | prepend : site.baseurl }}" width="400px" height="332px" srcset="{{ "arphysics-cloth@2x.png" | prepend: page.imagebase | prepend : site.baseurl }} 2x">
<figcapture>A cloth like simulation</figcapture>
</figure>

## The Structure of ARPhysics

There are five basic objects that exist in ARPhysics.


### World
The world is the space where all the simulation of objects occurs. Bodies, constraints, and force generators are added to a world be be simulated.

### Spatial Indexing
The spatial indexing object is the system that controls the organisation and collision detection of the bodies in the world.
Each World object requires a single SpatialIndexing object. This is designed so that the broadphase collision detection system can be easily changed for different types of game.
At the current time the library includes a single brute force spatial indexing system to demonstrate how a SpatialIndexing object should work.

### Body
The base element of simulation is a Body object. This is the object that has physical properties and is affected by forces.
In the base library there are two types of body: CircleBody and PolygonBody.


### Force Generator
A force generator object can provide forces to a set of bodies. This can be used to implement effects such as gravity or an explosion.


### Constraint
A constraint is an object that joins to bodies togethor and limits their movement. It can be used to implement ropes, springs and other such concepts.


<!--## Memory Management
ARPhysics implements a basic reference counting system for memory management. 
Most objects present in ARPhysics extend a class called Object which supplies three methods.

<code>retain()</code> retains a reference to an object by incrementing its retain count.
<br />
<code>release()</code> releases a reference to an object by decrementing its retain count and deleting the object when the count reaches 0.
<br />
<code>getRetainCount()</code> returns the current retain count for the object.

All objects should be created with the `new` keyword and will start life with a retain count of one. You will need to release the object or it will cause a memory leak.
It is strongly discouraged to directly delete an object rather than releasing it.-->


## Tutorials
1. [Creating a simple simulation](/projects/arphysics/using-arphysics-1-simple-example)
<!-- 2. [Creating a custom force generator](/projects/using-arphysics-1-simple-example) -->
<!-- 3. [Creating a custom constraint](/projects/using-arphysics-1-simple-example) -->
<!-- 4. [Creating a custom spatial indexing system](/projects/using-arphysics-1-simple-example) -->

