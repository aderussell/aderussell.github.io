---
layout: post
title:  "Freecell in Objective-C & Swift"
date:   2014-07-30
tags: objective-c
description: "This is a test of the description system"
---

You'll find this post in your `_posts` directory - edit this post and re-build (or run with the `-w` switch) to see your changes!
To add new posts, simply add a file in the `_posts` directory that follows the convention: YYYY-MM-DD-name-of-post.ext.

Jekyll also offers powerful support for code snippets:

{% highlight objc %}
#define VALUE 3.0
- (void)makeBigString:(NSString *)aString
{
    BOOL hi = YES;
    // appends "hello message" to end of input string;
    return [aString stringByAppendingString:@" hello!"];
}
{% endhighlight %}


{% highlight swift %}
func makeBigString(aString : NSString)
{
    bool hi = true;
    // appends "hello message" to end of input string;
    return aString.stringByAppendingString(" hello!");
}
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll's GitHub repo][jekyll-gh].

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
