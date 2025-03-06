---
layout: page
title: Portfolio
permalink: /portfolio/
imagebase: /images/projects/
css: /stylesheets/portfolio.css
---

{% include projects/project.html 
    icon-name   = "tintoy-icon.png"
    icon-alt    = "Tin Toy app icon"
    url         = "https://tintoy.app"
    name        = "Tin Toy"
    platform    = "macOS"
    client      = "(Coming soon)"
    role        = "Sole Developer"
    description = "A macOS equivalent of shadertoy.com which allows producing shaders using Apple Metal."
    image-class = "tintoy-device"
%}

{% include projects/project.html 
    icon-name   = "contrastical-icon.png"
    icon-alt    = "Contrastical app icon"
    url         = ""
    name        = "Contrastical"
    platform    = "macOS"
    client      = "(Coming soon)"
    role        = "Sole Developer"
    description = "An app that allows testing color contrast, allowing easy comparison for multiple appearances."
    image-class = "contrast-device"
%}


{% include projects/project.html 
	icon-name   = "arphysics-logo.png"
	icon-alt    = "ARPhysics logo"
	url         = "/projects/arphysics/"
	name        = "ARPhysics"
	platform    = "Any <small>(needs compiling with C++11 compiler)</small>"
	client      = "Final year BSc. Computer Science project (University of Plymouth)"
	role        = "Sole Developer"
	description = "ARPhysics is a 2D physics engine written in C++."
	image-class = "arphysics-device"
%}

{% include projects/project.html 
	url         = "https://github.com/aderussell/Solar-System"
	name        = "Solar System"
	platform    = "Windows DirectX 11"
	client      = "Final year BSc. Computer Science project (University of Plymouth)"
	role        = "Sole Developer"
	description = "An interactive solar system written in DirectX11."
	image-class = "solar-system-device"
%}

