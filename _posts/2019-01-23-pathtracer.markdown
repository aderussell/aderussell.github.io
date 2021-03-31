---
layout: post
title:  "Creating a path tracer"
date:   2019-01-23
tags: C++, graphics, 3D, raytracing, raytracer, pathtracing, pathtracer
description: "Creating a Monte-Carlo path tracer in C++"
imagepath: "/images/blog/raytracer-1/"
---

Recently I have been creating a path tracer.
It is available to download on [github][github-project].




# Features
* Load obj meshes
* Lambertian, phong, glass, mirror, & PBR materials


# Example Scenes

![Three lights (one red, green, and blue) illuminating three glass spheres](/images/blog/raytracer-1/rgb-glass.png)


![A Cornell Box with a mirrored block and three glass spheres](/images/blog/raytracer-1/spheres-with-caustics.png)


![Suzanne the Blender monkey in blue glass within a Cornell Box](/images/blog/raytracer-1/suzanne.png)

![PBR material spheres within a Cornell Box](/images/blog/raytracer-1/balls-pbr1.png)


# Next Steps
The next step is to implement an algorithm for bidirectional path tracing which will allow
for the convergence of high quality images more quickly.




[github-project]: https://github.com/aderussell/Path-Tracer
