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
* `mode` - The colour scheme of the nanoPAD2
  * `auto` Default, chooses `light` or `dark` based on browser's preferred colour scheme.
  * `light`
  * `dark`
  * `orange-green`
  * `blue-yellow`
* `onpadpress` - Pad press event listener
* `onpadrelease` - Pad release event listener
* `onpadclick` - Pad click event listener

##### Example
```html
<korg-nanopad2
    mode="dark"
    onpadpress="console.log(`Note ${event.detail.noteNumber} pressed!`)"
    onpadrelease="console.log(`Note ${event.detail.noteNumber} released!`)"
    onpadclick="console.log(`Note ${event.detail.noteNumber} pressed and released!`)"
>
</korg-nanopad2>
```

#### Events

It is also possible to listen for pad events through the following [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
* `padpress`
* `padrelease`
* `padclick`

The event listener callback receives a CustomEvent with a [detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) property with the following interface.
```ts
interface Details {
  noteNumber: number,
  padElement?: HTMLElement // only available if event was fired through DOM
}
```

##### Example

```js
document.querySelector('korg-nanopad2')
  .addEventListener('padpress', event => {
    console.log(`Note $(event.detail.noteNumber) pressed!`)
  })
```
