---
layout: post
title:  "I rewrote my app in SwiftUI. Now it doesn't work."
date:   2025-04-16
tags: swiftui
description: "SwiftUI is a single basket, but it sure seems to have a lot of eggs."
imagebase: "/images/blog/moaning/"
---

It was supposed to be so easy.

Last year I produced a macOS application, [Tin Toy](https://tintoy.app), for me to easily mess around writing Metal shaders.
Recently, I purchased an iPad and realized it would be great to be able to use Tin Toy on the go, so decided to port the app to iPadOS.

Although most of the UI was written in SwiftUI, the core app & document logic sat upon AppKit and [NSDocument](https://developer.apple.com/documentation/appkit/nsdocument).

If I was going to make the app fully multi-platform then it made perfect sense to move the app to fully use SwiftUI and move over to [DocumentGroup](https://developer.apple.com/documentation/swiftui/documentgroup) & [FileDocument](https://developer.apple.com/documentation/swiftui/filedocument).

On first impressions with macOS it was great. It removed a load of code and, even with some teething issues and refactoring to avoid Document having no knowledge of its file url (if it had one), it went smoothly and seemed to work fine on macOS.

Then I tested on iPad OS. You may be expecting me to say there was an issue here; nope. The app was perfectly happy running on my lovely new iPad and I busily set about improving the UI to better suit the platform. 

Then I did the unthinkable. One evening I updated the iPad from OS 18.3.1 to 18.4. Not a beta version; the full consumer release. I didn't think much of it. After all, what could change that much with a point release?

Oh boy was I wrong.

The first thing I notice is that the frame-rate seems to have more than halved. Also, when I update the shader, it sometimes doesn't reload correctly. Sometimes there are multiple of each button on the toolbar. The rename does not work. Saving isn't always working.

I haven't changed that much of my code, surely I couldn't have broken it that badly. I try a previous commit, same issue. I double check the simulator (for what I can; it does not support Metal Function Tables but that is a complaint for another day) and it is showing the same issue.
I start break-pointing and find that I am making two renderers for each file; oh dear. 

I then find that DocumentGroup on iPadOS is opening each document twice, creating a new view for each and showing them on top of each other. The elements in the toolbar seem to be fore both documents and may or may not affect the document on top. I roll back the simulator to 18.2 and the iPad to 18.3.1 and both are fine; producing a single view for each file.

Tin Toy is not a massively complicated app but it is doing to slightly, maybe unusual things with handling its renderer, textures and wrapping an MTKView for SwiftUI. I need a simpler example, and thankfully Apple has [one](https://developer.apple.com/documentation/swiftui/building-a-document-based-app-with-swiftui) of its own. This app exhibits all the same issues and allows me to confirm it is not just my code but something deeper.  

So where do I go now?

DocumentGroup & FileDocument are very simple and extremely limited in the customization then provide. There are a whole number of shortcomings, which I may rant about later, 
A point release of an OS has effectively broken the SwiftUI document loading system for one of their platforms and there is no real workaround within SwiftUI itself.
The most reliable alternative I can see is to move back to using `NSDocument` and `NSDocumentController` on AppKit for macOS and then having to produce the iOS code using `UIDocument`. The AppKit window management code which was removed when moving to SwiftUI will have to return with comparable code for iOS. But that is a fair bit of work which I have very little spare time to devote.

But the question hangs over all this; Why does DocumentGroup not work? It has been around for over 4 years and would seem a pretty crucial & common component. If you search through the Apple Developer forums there are dozens of threads going back to its release complaining that it does not work or it does weird things (mainly to the toolbar). How it is possible that a component can regress so wildly though minor OS releases and be so unreliable while being presented though documentation as the way to achieve document behavior using SwiftUI. It's not like it has been soft deprecatsed as Apple added the new `DocumentGroupLaunchScene` to iOS 18.

Beyond that, how can I possibly trust SwiftUI with any critical part of my code if it would fail so spectacularly at any point and my only real recourse is to rewrite my app functionality again, individually, for each platform.


## My other Document complaints
* FileDocument & ReferenceFileDocument are both passed a [ReadConfiguration](https://developer.apple.com/documentation/swiftui/filedocumentreadconfiguration) struct which gives access to the FileWrapper for the document, as well as the UTType, so that it can be read.
That is not passed if the file URL, if it exists. This causes issues with larger types which do not have convenient initializers for data but use a URL, like RealityKit's Entity.
* The documentation for anything beyond the most simple type of file is missing. Within Tin Toy, and other apps I have produced, my files are all packages which contain a large number of files. I would like to know the 'Apple' suggested way to handle these; should I keep reference to the FileWrappers? Should the reading be done outside the FileDocument struct where I can access the file URL?
* There doesn't seem to be a way to programmatically force a read of a file to revert back to the last save.
* SwiftUI added a whole bunch of new window modifiers for macOS 15. The [defaultLaunchBehavior](https://developer.apple.com/documentation/swiftui/scene/defaultlaunchbehavior(_:)) modifier is meant to allow welcome screen like functionality which will not show the window when a document window is open; even the example code in the documentation shows this. It does not seem to work.


## Disclaimer
Every one of my complaints and issues may be totally wrong explainable with "you're not meant to do it that way". I will be very happy if that is the case, as I can fix it, but the Apple documentation/support makes no suggestion that I am on the wrong track nor that there is a preferred alternative implementation.
