---
layout: page
---


<ul class="posts">
{% for post in site.posts %}
<li>
<h2><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h2>
<span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
<p>{{ post.description }}</p>
</li>
{% endfor %}
</ul>