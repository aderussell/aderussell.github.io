---
layout: page
title: Portfolio
permalink: /portfolio/
imagebase: /images/projects/
css: /stylesheets/portfolio.css
---


{% include projects/project.html 
	icon-name   = "epsmon-icon.png"
	icon-alt    = "EpSMon app icon"
	icon-is-app = true
	url         = "https://epsmon.com"
	name        = "EpSMon"
	platform    = "iOS"
	client      = "NeuroCore (University of Plymouth)"
	role        = "Lead Engineer"
	description = "EpSMon is an award-winning epilepsy self monitor that provides an easy to use assessment for checking a user's risk of SUDEP."
	image-class = "epsmon-device"
%}


{% include projects/project.html 
	icon-name   = "acemobile-icon.png"
	icon-alt    = "ACEmobile app icon"
	icon-is-app = true
	url         = "http://acemobile.org"
	name        = "ACEmobile"
	platform    = "iPad"
	client      = "NeuroCore (University of Plymouth)"
	role        = "Lead Engineer"
	description = "ACEmobile is a free, iPad based app for use by clinicians to support dementia assessment."
	image-class = "acemobile-device"
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
	platform    = "Windows DirectX 11</small>"
	client      = "Final year BSc. Computer Science project (University of Plymouth)"
	role        = "Sole Developer"
	description = "An interactive solar system written in DirectX11."
	image-class = "solar-system-device"
%}

