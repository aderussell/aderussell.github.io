---
layout: post
title:  "Creating slideshows in iOS apps"
date:   2018-11-04
tags: iOS
description: "Using ARSlideshow to create animated slideshows in iOS apps."
imagepath: "/images/blog/arslideshow/"
---

# ARSlideShow

An animating image slide show for iOS

[GitHub repository][github-project]



## Creating a slide show

Slide shows are controlled by an instance of `ARSlideShowController`. 
The controller will be instantiated with the container view there the slideshow will be presented and an `ARSlideShowImageProviding` data provider which will provide all the images to be displayed as well as any transition animators to be used to transition between the images.
It can also take an optional music controller which can play background music along with the slide show while it is being displayed.


### A simple example

{% highlight objc %}
// prepare the images to be shown in the slide show.
// note that this is an example object used only by the example project and not a part of ARSlideShow
TestImagesSlideShowImagePreparation *imagePreparation = [[TestImagesSlideShowImagePreparation alloc] init];
[imagePreparation prepareImages:nil];

// create an image provider object for the slide show which will provide the images to be displayed and the transitions to use between the provided images
id<ARSlideShowImageProviding> imageProvider = [[TestSlideShowImageProvider alloc] initWithImages:imagePreparation.images];

// get the view upon which the slide show images will be displayed
UIView *containerView = self.view;

// create the slide show controller with the image provider and container view
ARSlideShowController *slideShowController = [[ARSlideShowController alloc] initWithImageProvider:imageProvider containerView:containerView musicController:nil];
slideShowController.repeat   = YES;
slideShowController.delegate = self;

// start the slide show
[slideShowController beginSlideShow];
{% endhighlight %}


### Creating an image provider

An image provider must conform to `ARSlideShowImageProviding`. There are three methods to implement:

{% highlight objc %}
/**
 *  The number of images that are to be shown in the slideshow.
 */
@property (nonatomic, readonly) NSUInteger numberOfImages;


/**
 *  Returns the image to be displayed in the slide show at the specified index.
 *
 *  @param index The index of the image to return.
 *  @return The image to be displayed at the specified index.
 */
- (nonnull UIImage *)imageAtIndex:(NSUInteger)index;


/**
 *  The transition animator which should be used to transition between the specified image views.
 *  If nil is returned by this method then the slide show controller will use an instance of `NoAnimationTransitionAnimator` and no animation will occur.
 *
 *  @param index          The index of the image which is going to be displayed with the returned animation.
 *  @param existingView   The view which contains the image being currently displayed.
 *  @param presentingView The view which contains the image which is going to be displayed.
 *  @param containerView  The view where the image views are displayed and where the image will be performed.
 *
 *  @return The transition animator to be used, or nil if the default should be used.
 */
- (nullable id<ARSlideShowTransitionAnimating>)transitionAnimationForIndex:(NSUInteger)index
                                                              existingView:(nonnull UIView *)existingView
                                                            presentingView:(nonnull UIView *)presentingView
                                                             containerView:(nonnull UIView *)containerView;
{% endhighlight %}


### Creating a music controller

A music controller must conform to `ARSlideShowMusicControlling`. There are two methods to implement:

{% highlight objc %}
/**
 *  Start playing any music.
 */
- (void)startMusic;

/**
 *  Pause or stop playing any music.
 */
- (void)endMusic;
{% endhighlight %}



## Available animated transitions

* No Animation (`NoAnimationTransitionAnimator`)

![](/images/blog/arslideshow/none.gif)


* Slide (`SlideTransitionAnimator`)

![](/images/blog/arslideshow/slide.gif)


* Bounce (`BounceTransitionAnimator`)

![](/images/blog/arslideshow/bounce.gif)


* Flip (`FlipTransitionAnimator`)

![](/images/blog/arslideshow/flip.gif)


* Cube (`CubeTransitionAnimator`)

![](/images/blog/arslideshow/cube.gif)


* Fade (`FadeTransitionAnimator`)

![](/images/blog/arslideshow/fade.gif)


* Iris In (`IrisTransitionAnimation`)

![](/images/blog/arslideshow/iris.gif)


* Explosion (`ExplosionTransitionAnimation`)

![](/images/blog/arslideshow/explode.gif)


[github-project]: https://github.com/aderussell/ARSlideshow
