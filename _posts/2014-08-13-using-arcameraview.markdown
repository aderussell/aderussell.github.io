---
layout: post
title:  "Using ARCameraView"
date:   2014-08-12
tags: objective-c, camera, iOS, ARCameraView
description: "A quick guide to using the ARCameraView component in an iOS project."
imagepath: "/images/blog/using-arcameraview/"
---


ARCameraView is a single view that can be placed into an iOS project to allow access to the device's cameras and provides an interface for taking still images. The main reason to use ARCameraView over [UIImagePickerController][apple-camera] in an app is if you need a camera that is not fullscreen and you only wish for it to appear as a view on a view controller.

<!--- <img src="{{ "camera-view.png" | prepend: page.imagepath | prepend: site.baseurl }}" width="400px" /> -->


{::options parse_block_html="true" /}

## Adding ARCameraView to a project
You can download both the necessary files and an example Xcode project that will run on both iPad and iPhone from [github][camera-project].

<div class="hi">
The files that will need to add to your project are in the [ARCameraView][camera-needed-code] folder. They are:

 *  **ARCameraButton:** The class that represents the button pressed by the user to capture an image.
 *  **ARCameraView:** The class that represents actual camera view that can be used in the project. This is the class that you will work with.
 *  **AVCamCaptureManager:** The class that manages the connection to the camera session being used. This is adapted from a piece of Apple example source code of the same name.
 *  **UIImage+AspectResize:** This category adds a method to UIImage that allows an image to be cropped to fit into a given aspect ratio. This is used to create a image that is exactly the contents of the camera view.
</div>

ARCameraView is a subclass of UIView and so can be added to any storyboard, NIB, or programmatically the the exact way you can to any other UIView. 



## Handling starting and stopping the camera
The camera does not automatically start when the view is loaded as that would be inefficient so it is down to you to start the camera manually.

To start the camera you need to call the `- (void)startCamera` method on ARCameraView.

There are two methods to stop the camera:<br>
`- (void)stopCamera` will stop the camera view from displaying data from the camera and will stop the camera session. <br>
`- (void)stopCameraAndSession` will both stop the camera and destroy the camera session.



## Keeping the system responsive
To keep the system responsive the camera should be stopped whenever the containing view controller is not directly present; this includes the view controller being modally covered, covered in a navigation controller or when the application is sent to the background

_Example of code that a UIViewController containing an ARCameraView should follow:_
{% highlight objc %}
- (void)viewDidLoad
{
    ... other code ...

    // create notification observers for the app being opened and closed.
    // These are used as viewDidAppear and viewWillDisappear aren't called when the app is opened and closed.
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(willResignActive:)
                                                 name:UIApplicationWillResignActiveNotification
                                               object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(didEnterForeground:)
                                                 name:UIApplicationWillEnterForegroundNotification
                                               object:nil];
}

- (void)viewDidAppear:(BOOL)animated
{
    ... other code ...

    // only start the camera after the view has appeared.
    [self.cameraView startCamera];
}

- (void)viewWillDisappear:(BOOL)animated
{
    // stop the camera before the view disappears.
    [self.cameraView stopCameraAndSession];

    ... other code ...
}

- (void)willResignActive:(NSNotification *)notification
{
    // stop the camera before the app is sent to background.
    [self.cameraView stopCamera];
}

- (void)didEnterForeground:(NSNotification *)notification
{
    // start the camera again after the app is reopened. 
    // This is not always needed. You should check if the camera has an image first.
    [self.cameraView startCamera];
}
{% endhighlight %}



## Getting the taken images
There are two ways that a photo can be taken using ARCameraView. It can either be taken by the user when the press the capture button on the view or programmatically by calling the `- (void)captureImage` method on ARCameraView.

There is a delegate method `- (void)cameraView:(ARCameraView *)cameraView hasTakenImage:(UIImage *)image` that is called when the capture button is pressed and returns the image that was taken cropped to the ration of the camera view, i.e. the image only contains what the camera view contains. This picture can also be gotten from the `imageTaken` property.

There is also a `wholeImageTaken` property that returns the entire image that was taken by the camera. This is not in the proportions of the camera view but ratio of the camera itself.



## Camera overlays
The camera view is capable of displaying an overlay over the camera image. This allows you to add useful alignment guides such as a grid.
The overlay will take the form of a CALayer and will be resized to the frame of the camera view. This overlay will also be resized if the frame of the camera changes.
To add an overlay to the camera assign it to the `overlay` property. To remove the overlay just set the property to `nil`.



## Changing the class of the camera button
If you wish to use a custom button for the camera view it is possible to subclass both ARCameraButton and ARCameraView to do so.

You can subclass ARCameraButton and override the `- (void)drawRect:` method to provide a custom look to the button. ARCameraButton adds one additional property over the UIButton class which is `showingCancel`; this property indicates whether or not the button should display that pressing it will capture an image from the camera or dismiss the taken image and start the camera again. Your drawing method should respect this property and clearly show what action the button will take.

To use your new button class, subclass ARCameraView and override the `+ (Class)cameraButtonClass` method to return the class of your new button.

<div class="note">
It should be noted at this time the size of the button can not be changed from 60 by 60 pixels and the position we always be fixed 50 pixels above the centre bottom of the camera view. This will be changed in the future to allow more flexibility in button placement.
</div>


[apple-camera]: https://developer.apple.com/library/ios/documentation/uikit/reference/UIImagePickerController_Class/UIImagePickerController/UIImagePickerController.html
[camera-project]:   https://github.com/aderussell/ARCameraView
[camera-needed-code]: https://github.com/aderussell/ARCameraView/tree/master/ARCameraView