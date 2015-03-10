---
layout: post
title:  "The Phong & Blinn-Phong Light Reflection Model"
date:   2015-01-19
tags: 3D, Mesh, Painters Algorithm, Phong, Blinn-Phong, Lighting, Matrix, Transformation
description: "A quick look into the basics of 3D meshes and lighting."
imagepath: "/images/blog/blinn-phong-lighting/"
---


## Lighting

Lighting in 3D graphics does not work as it does in the real world, the physics of light is complex and fully reproducing it would be extremely complex and would not produce real time results on todays hardware. The illumination/shading models used in 3D graphics are simplified approximations more concerned with light looking approximately accurate than actually working as it does in the real world.


The most commonly used lighting model is the Phong (and Blinn-Phong) reflection model

Phong reflection uses ambient, diffuse, specular


<img src="http://upload.wikimedia.org/wikipedia/commons/6/6b/Phong_components_version_4.png" alt="specular, diffuse, and ambient light" />


all lights are point lights

We can make a performance improvement to this




The ambient value will decide the colour of the mesh in areas where no light is directly shining upon it. It is meant to represent the small amount of light that is scattered about the entire scene, you can imagine it as a very crude way of getting the effect of light bouncing of objects in the scene but at a constant rate and without any form of colour bleeding. 

<p><math xmlns="http://www.w3.org/1998/Math/MathML">
        <msub>
        	<mi>I</mi>
        	<mi>amb</mi>
        </msub>
        <mo>=</mo>
        <msub>
        	<mi>K</mi>
        	<mi>a</mi>
        </msub>
        <msub>
        	<mi>I</mi>
        	<mi>a</mi>
        </msub>
</math></p>


Phong lighting uses RGB color so we do this equation three times, one for each of the color channels.


The diffuse light represents the light that is directly shining upon the object. It will determine the matt (non shiny) color of the mesh. The more directly the light is shining upon the mesh the more the light color will effect the color of the mesh. 

<p><math xmlns="http://www.w3.org/1998/Math/MathML">
        <msub>
        	<mi>I</mi>
        	<mi>diff</mi>
        </msub>
        <mo>=</mo>
        <mrow>
			<msub>
				<mi>K</mi>
				<mi>d</mi>
			</msub>
			<mo>&InvisibleTimes;</mo>
			<msub>
				<mi>I</mi>
				<mi>i</mi>
			</msub>
			<mo>&InvisibleTimes;</mo>
				<mi>cos</mi>
				<mrow>
				<mo>(</mo>
				<mi>&#x3B8;</mi>
				<mo>)</mo>
				</mrow>
        </mrow>
</math></p>

The value of the diffuse light is dependant on the angle of the between the surface normal and the direction of the light. This angle is represented by the symbol theta. If the angle is less than 0 or more than pi/2rad then it is considered that the light can't be shining on that part of the surface so it will not be affected by the diffuse value for that light. This is what the cos function does in the method.


We can replace this cos theta function by calculating the dot product of the surface normal (N) and the direction of the light (L).

<p><math xmlns="http://www.w3.org/1998/Math/MathML">
        <msub>
        	<mi>I</mi>
        	<mi>diff</mi>
        </msub>
        <mo>=</mo>
        <mrow>
			<msub>
				<mi>K</mi>
				<mi>d</mi>
			</msub>
			<mo>&InvisibleTimes;</mo>
			<msub>
				<mi>I</mi>
				<mi>i</mi>
			</msub>
			<mo>&InvisibleTimes;</mo>
				<mrow>
				<mo>(</mo>
				<mi>L</mi>
				<mo>&sdot;</mo>
				<mi>N</mi>
				<mo>)</mo>
				</mrow>
        </mrow>
</math></p>


The final component of Phong lighting is the specular highlight. This represents a reflective glare on a surface, a shiny point. The specular has both a color value and a reflective value. This higher the reflective value, the tighter and brighter the reflective sports on the surface will be.

<p><math xmlns="http://www.w3.org/1998/Math/MathML">
        <msub>
        	<mi>I</mi>
        	<mi>spec</mi>
        </msub>
        <mo>=</mo>
        <mrow>
			<msub>
				<mi>K</mi>
				<mi>s</mi>
			</msub>
			<mo>&InvisibleTimes;</mo>
			<msub>
				<mi>I</mi>
				<mi>i</mi>
			</msub>
			<mo>&InvisibleTimes;</mo>
				<mrow>
				<msup>
				<mrow>
				<mi>cos</mi>
				<mo>(</mo>
				<mi>&Phi;</mi>
				<mi>)</mi>
				</mrow>
				<mi>n</mi>
				</msup>
				</mrow>
        </mrow>
</math></p>



The final value for each color channel is produced by adding the three equations to togethor.

<p><math xmlns="http://www.w3.org/1998/Math/MathML">
        <mi>I</mi>
        <mo>=</mo>
        
		<msub>
        	<mi>K</mi>
        	<mi>a</mi>
        </msub>
        <msub>
        	<mi>I</mi>
        	<mi>a</mi>
        </msub>

		<mo>+</mo>

        <mrow>
			<msub>
				<mi>K</mi>
				<mi>d</mi>
			</msub>
			<mo>&InvisibleTimes;</mo>
			<msub>
				<mi>I</mi>
				<mi>i</mi>
			</msub>
			<mo>&InvisibleTimes;</mo>
				<mi>cos</mi>
				<mrow>
				<mo>(</mo>
				<mi>&#x3B8;</mi>
				<mo>)</mo>
				</mrow>
        </mrow>
        
        <mo>+</mo>
        
        <mrow>
			<msub>
				<mi>K</mi>
				<mi>s</mi>
			</msub>
			<mo>&InvisibleTimes;</mo>
			<msub>
				<mi>I</mi>
				<mi>i</mi>
			</msub>
			<mo>&InvisibleTimes;</mo>
				<mrow>
				<msup>
				<mrow>
				<mi>cos</mi>
				<mo>(</mo>
				<mi>&Phi;</mi>
				<mi>)</mi>
				</mrow>
				<mi>n</mi>
				</msup>
				</mrow>
        </mrow>
</math></p>






### Multiple lights

We can have multiple light sources in a scene so we will create the equation for calculating the color of a point on the surface from multiple lights.

The ambient color of the surface is not affected by the light so this element will be the same as for a single light source.

The diffuse and specular for each light are added togethor. 

You may notice that this could cause the surface point to reach a value of over 1, this is correct as we clamp the values for each RGB element between 0 and 1 when se draw the surface.

By adding the values for each light intensity togethor we can get the effect of light mixing, i.e. a red light and a green light shined at the same spot will produce a yellow color.

<p><math xmlns="http://www.w3.org/1998/Math/MathML">
        <msub>
        	<mi>I</mi>
        	<mi>diff</mi>
        </msub>
        <mo>=</mo>
        <mrow>
			<munderover>
				<mo>&#x2211;</mo>
				<mrow>
					<mi>i</mi>
					<mo>=</mo>
					<mn>1</mn>
				</mrow>
				<mi>n</mi>
			</munderover>
        </mrow>
        <mrow>
        	<mo>(</mo>
        	<mo>)</mo>
        </mrow>
</math></p>

Below we can see a final example of a mesh that has been drawn using the painters algorithm and is working with multpile light sources. Using Preset1 there is a red, a green, and a blue light shining on the sphere from different angles. We can we where the colors are being mixed to produce orange, magenta, cyan, and white colors on the sphere. You can move the positions of the lights by using the appropriate sliders. You can also turn off a light by setting it's intensity to 0.


<iframe width="100%" height="620px" src="http://jsfiddle.net/ade177/qkqbznps/embedded/result,js,resources,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


We are only flat shading (giving a solid color for each face of the mesh) in this example so you can see the triangles in the examples. Phongs reflections model will also work with pixel shading. This is where every pixel of each face has it's color calculated, using the same equation as before. This would result in a smoothly shaded surface and you wouldn't be able to distinguish where the faces join. This is something we can't easily produce in javascript as the performance for each intensive mathematics isn't available. This could be easily produced by implementing the Phong reflection model as a shader in WebGL but that is beyond the scope of this tutorial.