---
layout: project
title:    Using ARPhysics
subtitle: Creating a simple simulation using ARPhysics
##logofile: arphysics-logo.png
permalink: /projects/arphysics/using-arphysics-1-simple-example/
imagebase: /images/projects/
navbar: false
css: /projects/arphysics.css
---


In this tutorial we will use ARPhysics to create an application that will add three circular bodies and a floor to a world.
 
The floor and one of the circular bodies will be statically fixed and so will their states not be affected by any forces in the simulation.

The other two circular bodies will be affected by a gravity force generator added to the world.

One of these two circular bodies will be attached to the static circular body with a spring constraint that will limit its movement.

The ARPhysics library only includes the functionality to process the physics in a simulation. 
All of the graphics, input, and timing control must be supplied additionally. 
We will not cover this but an example is visible in the source code for the project [available here](https://github.com/aderussell/ARPhysics).




## 1. Create the world and the spatial indexing system
In this example we will use the brute force spatial indexing system provided by the library. 
The first thing we do is create a brute force indexing object. Each world must have its own spatial indexing object or you will have a really bad time.
The brute force indexing object takes no parameters but any spatial indexing system you create can take parameters if you need.

The next thing we do is create the world object supplying it the created spatial indexing object. The world object takes four parameters...

1. The width of the world. This is only supplied for convenience of creator as bodies can move outside of these boundaries unless they are limited by walls to stop them. If not needed just set this as 0.
2. The height of the world. This is again only supplied for convenience. If not needed just set this a 0.
3. the spatial indexing object to use for managing bodies and collisions.
4. The number of times that each collision of constraint is solved each step of the simluation. The larger this number the more accurate the simluation will be but the longer it will take. you will need to find a balance between performance and accuracy for your game.

Every object in the library uses reference counting for memory management. 


{% highlight cpp %}
World* createWorld()
{
	// create the spatial indexing object. It takes in no parameters by default.
	SpatialIndexing *spatialIndexing = new BruteForceIndexing();
	
	// create the world. It takes in four parameters;
	// 1. the width of the world
	// 2. the height of the world
	// 3. the spatial indexing object to use for managing bodies and collisions
	// 4. the number of times that each collision of constraint is solved each step of the simluation. The larger this number the more accurate the simluation will be but the longer it will take. 
	World *world = new World(320, 240, spatialIndexing, 10);

	// as the world object will retain a reference to spatialIndexing, you can release it and it will be destroyed when the world is released.
	spatialIndexing->release();

	return world;
}
{% endhighlight %}


## 2. Add gravity to the world
By default, there are no forces present in the world. 
To add gravity to the world we will need to add a force generator which will apply a force to each body on each step of the simulation.


{% highlight cpp %}
void addGravityToWorld(World *world)
{
	// create a vector for the gravity. This signifies the power and direction of the force. It will apply an accelation of 9.81m\s^2 directly downwards to each body.
	Vector2 gravityForce = Vector2(0.0, -9.81);

	// create the gravity force generator object. We supply the force vector to the generator.
	GravityForceGenerator *gravityForceGenerator = new GravityForceGenerator(gravityForce);
	
	// add the force generator directly to the world. If had already been added then this method would do nothing.
	world->addForceGenerator(gravityForceGenerator);

	// the world will retain a reference to the gravity force generator so we can release it to avoid a memory leak.
	gravityForceGenerator->release();
}
{% endhighlight %}



## 3. Add the floor to the world
To create the floor we will add a thin rectangle along the bottom of the world.
We will set this rectangle as static. This means that it will not be affected by any forces that are applied to it from the gravity force generator we added to the world.

To create a rectangular body we need to use a PolygonBody object. Polygon bodies can form any convex polygon. 
Normally you would give the body an array of vertices that would form the parameter of the body but there is a convenience method available for PolygonBody that allows for each creation of rectangular bodies.

We set the body to be static simply by calling the <code>setStatic()</code> method. This will prevent the body from being moved or rotated by any forces but will still allow it to collide with and affect other non-static bodies.

We then add the body to the world. At the current time this method only adds it to the spatial indexing object. 
It is recommended, however, to add objects to the world rather than directly to the spatial indexing object as this may change in the future.

{% highlight cpp %}
void addFloorToWorld(World *world)
{
	// create a rectangle shape for the floor. This method takes 4 parameters;
	// 1. the x origin. The x position of the bottom-left corner of the rectangle
	// 2. the y origin. The y position of the bottom-left corner of the rectangle
	// 3. the width of the rectangle.
	// 4. the height of the rectangle.
	Rect floorRect = Rect(4,4,world->getWidth() - 8, 4);
	
	// create the floor body using the floorRect as its dimenstions and giving it a mass.
	// the mass is set to 0.0 as we will make the object static so the mass doesn't matter.
	PolygonBody *floor = new PolygonBody(floorRect, 0.0);
	
	// set the floor body as static. this will stop all movement of the body. It will still be able to impact other bodies.
	floor->setStatic();
	
	// add the floor to the world.
	world->addBody(floor);

	// the world will retain a reference to the body so we can release it to avoid a memory leak.
	floor->release();
}
{% endhighlight %}


## 4. Add the static circle to the world
This is done exactly the same was as the floor was added except we use a CircleBody rather than a PolygonBody.

{% highlight cpp %}
void addStaticCircleToWorld(World *world)
{
	// create the circular body. This method takes three parameters;
	// 1. the radius of the circular body
	// 2. the position of the center of the circle, as a vector
	// 3. the mass of the body.
	CircleBody *circle = new CircleBody(1.0, Vector2(100, 100), 0.0);
	
	// set the circle body as static. this will stop all movement of the body. It will still be able to impact other bodies.
	circle->setStatic();
	
	// add the circle to the world.
	world->addBody(circle);

	// the world will retain a reference to the body so we can release it to avoid a memory leak.
	circle->release();
}
{% endhighlight %}

## 5. Add the free moving circle to the world
This circle will not be attached to any other body and will be placed in midair.
When the world is simulated the circular body will fall towards the floor as it is affected by the gravity force generator.

{% highlight cpp %}
void addMovableCircleToWorld(World *world)
{
	// create the circular body
	CircleBody *circle = new CircleBody(1.0, Vector2(200, 100), 0.0);
	
	// add the circle to the world.
	world->addBody(circle);

	// the world will retain a reference to the body so we can release it to avoid a memory leak.
	circle->release();
}
{% endhighlight %}


## 6. Add the circle attached by a spring to the static circle
We will create another movable body that will be attached to the static circle we created in step 4 by a spring constraint.
When the world is simulated the ball will fall by gravity but will be stopped by the spring constraint and will hand and bounce on the spring.

{% highlight cpp %}
void addConstrainedCircleToWorld(World *world)
{
	// create the circular body
	CircleBody *circle = new CircleBody(1.0, Vector2(200, 100), 0.0);
	
	// add the circle to the world.
	world->addBody(circle);

	// the world will retain a reference to the body so we can release it to avoid a memory leak.
	circle->release();
}
{% endhighlight %}


## 7. Simulate the world
We have now finished creating the world and all bodies within the world so we can start simulating the world. 

The only method that needs to be called is the <code>step(float dt)</code> method on the world object. 
It will advance the simulation by the delta time provided as the parameter.
e.g. If you call step will 0.016 then the simulation will be advanced by 16 milliseconds.

{% highlight cpp %}
void simulateWorld(World *world, float dt)
{
	world->step(dt);
}
{% endhighlight %}


<!--# Result
Here is a video of the resultant simulation with graphics added to draw the bodies. The source code is provided HERE
-->








