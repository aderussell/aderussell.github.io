---
layout: default
css: /stylesheets/index.min.css
---

<!-- Header -->

<div class="header">
	<div class="wrap">
		<div class="large-6 small-12">
			<div class="banner-left">
<!-- 			<img src="/images/projects/epsmon-icon.png" alt="EpSMon app icon" class="app-icon"> -->
				<h1 class="banner-header">EpSMon now available</h1>
				<a href="https://itunes.apple.com/gb/app/epsmon/id988418313"><img src="{{ "/images/appstore-badge.svg" | prepend: site.baseurl }}" class="appstore-badge" alt="linkedin icon"></a>
				<p class="epsmon-learn-more"><a class="epsmon-learn-more" href="/portfolio#epsmon">Learn more</a></p>
			</div>
		</div>
		<div class="large-6 small-0">
			<div class="epsmon-device"></div>
		</div>
	</div>
</div>

<div class="page-content">
      <div class="wrap">


<h1>Recent posts</h1>

<ul class="posts">
{% for post in site.posts %}
<li>
<span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
<a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
<p>{{ post.description }}<p>
</li>
{% endfor %}
</ul>


	</div>
</div>