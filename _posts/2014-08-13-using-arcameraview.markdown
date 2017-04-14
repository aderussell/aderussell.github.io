---
layout: post
title:  "Using ARCameraView"
date:   2014-08-12
last_modified_at: 2017/04/14
tags: [objective-c, camera, iOS, ARCameraView]
description: "A quick guide to using the ARCameraView component in an iOS project."
imagepath: "/images/blog/using-arcameraview/"
---

{% include posts/update-notice.html date="2017-04-14" message="Updated to reflect changes in ARCameraView 1.0.1." %}



ARCameraView is a single view that can be placed into an iOS project to allow access to the device's cameras and provides an interface for taking still images. The main reason to use ARCameraView over [UIImagePickerController][apple-camera] in an app is if you need a camera that is not fullscreen and you only wish for it to appear as a view on a view controller.


ARCameraView is a subclass of UIView and so can be added to any storyboard, NIB, or programmatically the the exact way you can to any other UIView.



## Adding ARCameraView to a project
The easiest way to add ARCameraView to your project is to use CocoaPods by adding `pod 'ARCameraView'` to your Podfile.

If you do not wish to use CocoaPods with your project you can download the necessary files from the [GitHub repository][camera-project].
More detailed instructions are included in the repository.


 



## Handling starting and stopping the camera
The camera does not automatically start when the view is loaded so it is your responsibility to start the camera when it is needed. To start the camera, call the `- (void)startCamera` method.

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
To add an overlay to the camera assign it to the `overlay` property. To remove the overlay, set the property to `nil`.



## Changing the camera button
If you wish to use a custom button on the camera view, create a subclass of `ARCameraButton` and assign an instance to the camera view's `cameraButton` property.

`ARCameraButton` adds one additional property over the UIButton class called `showingCancel`; this property indicates whether, or not, the button should display that pressing it will capture an image from the camera or dismiss the taken image and start the camera again.



[apple-camera]: https://developer.apple.com/library/ios/documentation/uikit/reference/UIImagePickerController_Class/UIImagePickerController/UIImagePickerController.html
[camera-project]:   https://github.com/aderussell/ARCameraView
[camera-needed-code]: https://github.com/aderussell/ARCameraView/tree/master/ARCameraView