---
layout: page
title: Components
permalink: /components/
imagebase: /images/components/
css: /stylesheets/portfolio.css

#layout: redirected
#sitemap: false
#navbar: false
#redirect_to:  /portfolio/
---


{% include projects/component.html 
	url         = "https://github.com/aderussell/string-to-CGPathRef"
	name        = "string-to-CGPathRef"
	language    = "Objective-C" 
	platform    = "iOS & Mac OS"
	description = "A set of methods to produce CGPaths from single or multi-line NSAttributedStrings. Also available as a category for UIBezierPath for easier use in iOS." 
%}

{% include projects/component.html 
	url         = "https://github.com/aderussell/ARRatingView"
	name        = "ARRatingView"
	language    = "Objective-C" 
	platform    = "iOS"
	description = "A customisable control for iOS that allows a rating to be displayed and selected." 
%}
  
  
{% include projects/component.html 
	url="https://github.com/aderussell/ARCameraView"
	name="ARCameraView"
	language="Objective-C" 
	platform="iOS"
	description="A drop-in view component for iOS that gives access to the device camera and allows photos to be captured." 
%}

{% include projects/component.html 
	url="https://github.com/aderussell/ARPickerInputViews"
	name="ARPickerInputViews"
	language="Objective-C" 
	platform="iOS"
	description="A set of pickers that can easily be used as input views for a UITextField. A date picker, number picker, and string list picker are included." 
%}



{% include projects/component.html 
	url         = "https://github.com/aderussell/arson_json_parser"
	name        = "arson_json_parser"
	language    = "Ansi C" 
	platform    = "Any"
	description = "A strict json validator and parser that can conform to standards RFC4627 & RFC7158." 
%}




## Deprecated Components

{% include projects/component-deprecated.html 
	url="https://github.com/aderussell/ARListPopoverViewController"
	name="ARListPopoverViewController"
	language="Objective-C" 
	platform="iOS <= 8.0"
	description="A UIPopoverController that can display nested information in a UITableView manner." 
%}


{% include projects/component-deprecated.html 
	url         = "https://github.com/aderussell/ARImageViewPopoverController"
	name        = "ARImageViewPopoverController"
	language    = "Objective-C" 
	platform    = "iPad <= 8.0"
	description = "A UIPopoverController that can be used to display a set of images." 
%}

    