---
layout: post
title:  "Creating a path tracer"
date:   2019-01-23
tags: C++, graphics, 3D, raytracing, raytracer, pathtracing, pathtracer
description: "Creating a Monte-Carlo path tracer in C++"
imagepath: "/images/blog/raytracer-1/"
---

Recently I have been creating a path tracer, available to download on [github][github-project].

It initially started out by following the excellent [Ray Tracing in One Weekend](https://raytracing.github.io) series by Philip Shirley.

I then extended it to support:
* triangle primitives to allow the loading of obj meshes
* ability to scale primitives and rotate around x-axis
* Skyboxes
* PBR material
* Anisotropic Phong material
* Beer-Lambert law support to dielectric material
* multi-threading and SSE instructions
* Jittering support to reduce noise.


# Example Scenes

![Three lights (one red, green, and blue) illuminating three glass spheres](/images/blog/raytracer-1/rgb-glass.png)


![A Cornell Box with a mirrored block and three glass spheres](/images/blog/raytracer-1/spheres-with-caustics.png)


![Suzanne the Blender monkey in blue glass within a Cornell Box](/images/blog/raytracer-1/suzanne.png)

![PBR material spheres within a Cornell Box](/images/blog/raytracer-1/balls-pbr1.png)


# Next Steps
The next step is to implement an algorithm for bidirectional path tracing which will allow
for the convergence of high quality images more quickly.




[github-project]: https://github.com/aderussell/Path-Tracer
