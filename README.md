#dcldash

A bundle of helper functions that simplify some of the more time consuming and repetitive tasks developers tend to do in the Decentraland SDK

##Installation

`npm install -b dcldash@latest`

## Debug

### Tweaker

**Purpose:** A graphical UI for adjusting the Transform of any Entity in your scene

### ZoneCreator

**Purpose:** Drop a zone creation cube into the scene and then move around the area to define the size of the zone. Then click a button to export the Transform information for that zone

## Entities

### SimplePoster

**Purpose:** A very simple poster that allows you to pass along a src and hyperlink (clickable event) to go to a specific URL (optional)

### TriggerZone

**Purpose:** Easily create a triggerZone with a more intuitive visual cue (debug mode) for when a user enters/leaves the zone

## Animations

### AnimationQueue

**Purpose:** Quickly create a simple animation without having to create a new ISystem

### OnUpdateFrame

**Purpose:** Simplify your animations/physics code by creating togglable onUpdateFrame functions.

### DynamicImage

**Purpose:** Animate UIImage size, position and cropping with ease

### DynamicImageBar

**Purpose:** A very fast, performant and easy to implement image progress bar

## Materials

**Purpose:** Easily implement common materials for testing and debugging purposes

## Utils

### Wait

**Purpose:** Sometimes you want to call a setTimeout function anywhere within your code and not just add it as a component to an entity

### UVs

**Purpose:** When you attach a video or image material to a primative shape (BoxShape, PlaneShape, ect) the rotation of the texture will be rotated or flipped incorrectly. Instead of rotating the entire entity, you can leverage one of these functions to just alter the UVmap for how the material is applied to the entity.

### OnFirstMove

**Purpose:** The webbrowser instance of decentraland requires that you interact with the site before a video or audio file will play. Adding any video/audio play events to an onFirstMove will ensure that it plays more consistently

### GlobalCanvas

**Purpose:** Generating a new `UICanvas` more than once is not preferred for performance purposes. Use the globalcanvas whenever possible instead of generating a new one each time

### Ease

**Purpose:** Easily add ease animations to your AnimationQueues and DynamicImages

### Countdown

**Purpose:** Invoke a countdown event that allows you to listen for every frame or every second with a callback function when it is completed

