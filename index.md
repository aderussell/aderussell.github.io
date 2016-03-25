---
layout: generic
<!-- css: /stylesheets/index.min.css -->
---

<!-- Header -->

<!-- <div class="page-content"> -->
<!--       <div class="wrap"> -->


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


<!-- 	</div> -->
<!-- </div> -->