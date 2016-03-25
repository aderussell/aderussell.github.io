---
layout: generic
<!-- css: /stylesheets/index.min.css -->
---


<ul class="posts">
{% for post in site.posts %}
<li>
<a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
<span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
<p>{{ post.description }}<p>
</li>
{% endfor %}
</ul>