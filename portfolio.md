---
layout: page
title: Portfolio
permalink: /portfolio/
imagebase: /images/projects/
css: /stylesheets/portfolio.css
---

<div>

    <p class="intro">Various projects that I have been involved with.</p>

	<section class="project" id="epsmon">
		
		<div class="large-6 small-9">
			<img src="{{ "epsmon-icon.png" | prepend: page.imagebase | prepend: site.baseurl }}" alt="EpSMon app icon" class="app-icon" />
		
        	<h1 class="project-title">EpSMon<a href="http://epsmon.com" class="project-link"><small>View website</small></a></h1>
        	<h2 class="platform">iOS</h2>
        	<h2 class="client">NeuroCore (University of Plymouth)</h2>
        	<h2 class="role">Role: Lead Engineer</h2>
        	<p>EpSMon is an epilepsy self monitor that provides an easy to use assessment for checking a user's risk of SUDEP.</p>
        </div>
        <div class="large-6 small-3">
        	<div class="epsmon-device"></div>
        </div>
    </section>
    


    <section class="project" id="acemobile">
    
    	<div class="large-6 small-12">
    		<img src="{{ "acemobile-icon.png" | prepend: page.imagebase | prepend: site.baseurl }}" alt="ACEmobile app icon" class="app-icon" />
    	
			<h1 class="project-title">ACEmobile<a href="http://acemobile.org" class="project-link"><small>View website</small></a></h1>
			<h2 class="platform">iPad (iOS8)</h2>
			<h2 class="client">NeuroCore (University of Plymouth)</h2>
			<h2 class="role">Role: Lead Engineer</h2>
			<p>ACEmobile is a free, iPad based app for use by clinicians to support dementia assessment.</p>
        </div>
        <div class="large-6 small-0">
        	<div class="acemobile-device"></div>
        </div>
    </section>

                    
    <section class="project" id="arphysics">
    	<div class="large-6 small-12">
			<img src="{{ "arphysics-logo.png" | prepend: page.imagebase | prepend: site.baseurl }}" alt="ARPhysics logo" />
			<h1 class="project-title">ARPhysics<a href="/projects/arphysics/" class="project-link"><small>View project page</small></a></h1>
			<h2 class="platform">Any <small>(needs compiling with C++11 compiler)</small></h2>
			<h2 class="client">Final year BSc. Computer Science project (University of Plymouth)</h2>
			<h2 class="role">Role: Sole Developer</h2>
			<p>ARPhysics is a 2D physics engine written in C++.</p>
        </div>
        <div class="large-6 small-0">
        	<div class="arphysics-device"></div>
        </div>
    </section>
    
</div>