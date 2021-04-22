# midi-machines

## \<korg-nanopad2\> Custom Element

### Install

Add the following code to the head of your HTML document.

```html
<script src="https://raw.githubusercontent.com/stellartux/midi-machines/master/src/nanopad2.js" defer></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Changa:wght@400;700&display=swap">
```

### API

#### Attributes

The following attributes can be changed either in HTML or with [`setAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)

* `color-scheme` - The colour scheme of the nanoPAD2
  * `auto` Default, chooses `light` or `dark` based on browser's preferred colour scheme.
  * `light`
  * `dark`
  * `orange-green`
  * `blue-yellow`
* `onpaddown` - Pad press event listener
* `onpadup` - Pad release event listener
* `onxymove` - XY pad touch event listener

##### HTML Attribute Example

```html
<korg-nanopad2
    color-scheme="dark"
    onpaddown="console.log(`Note ${event.detail.pitch} pressed!`)"
    onpadup="console.log(`Note ${event.detail.pitch} released!`)"
>
</korg-nanopad2>
```

#### Events

It is also possible to listen for pad events through the following [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).

* `paddown`
* `padup`
* `onxymove`

The event listener callback for pad events receive a CustomEvent with a [detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) property with the following interface.

```ts
interface NoteEventDetail {
  pitch: number, // MIDI note number
  velocity: number // in range 0-127, defaults to 80 if not specified
}
```

XY touchpad events receive a CustomEvent with a detail property with the following interface.

```ts
interface XYEventDetail {
  x?: number, // in range 0-127, for left to right
  y?: number // in range 0-127, from bottom to top
}
```

Only one of `x` or `y` will be present on the object. Note that the `y` attribute goes from top to bottom, which is consistent with the device's y axis, but not with the DOM.

##### JavaScript Event Listener Example

```js
document.querySelector('korg-nanopad2')
  .addEventListener('paddown', event => {
    console.log(`Note $(event.detail.pitch) pressed!`)
  })
```
