class KorgNanopad2 extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.innerText = `
@import url('https://fonts.googleapis.com/css2?family=Changa:wght@300;700&display=swap');
.dark {
  --text-color: #999999;
  --body-color: #222222;
  --body-shadow-color: #555555;
  --pad-color: #303030;
  --pad-shadow-color: #555555;
  --touch-color: #777777;
}
main, .light {
  --text-color: #666666;
  --body-color: #dddddd;
  --body-shadow-color: #bbbbbb;
  --pad-color: #c2d7ee;
  --pad-shadow-color: #8297ae;
  --touch-color: #777777;
  box-shadow: 1vw 1vw 1vw #000000cc;
}
@media (prefers-color-scheme: dark) {
  main {
    --text-color: #999999;
    --body-color: #222222;
    --body-shadow-color: #555555;
    --pad-color: #303030;
    --touch-color: #777777;
  }
}
* {
  box-sizing: border-box;
  user-select: none;
}
main {
  color: var(--text-color);
  background-color: var(--body-color);
  display: grid;
  width: 100%;
  max-width: 97vw;
  min-height: 25vw;
  border: 1vw outset var(--body-shadow-color);
  border-radius: 2vw;
  grid-template-rows: 1fr 2fr 2fr;
  grid-template-columns: 3fr repeat(8, 1fr);
  column-gap: 1vw;
  margin: auto;
  padding: 0 1vw 1vw 1vw;
  font-family: Changa, Impact, sans-serif;
}
#xypad {
  grid-row: 2 / 4;
  grid-column: 1 / 2;
  background-color: var(--touch-color);
  border: 1vw inset var(--body-shadow-color);
  border-radius: 1vw;
}
.brand {
  place-self: center;
  font-size: 1.6rem;
  font-weight: 700;
}
.model {
  place-self: center;
  font-size: 1.6rem;
  font-style: italic;
  grid-column: span 2;
}
#nano {
  font-size: 1rem;
}
#buttons, label, .pad, #scene {
  display: flex;
}
#buttons, #scene {
  grid-column: span 3;
  justify-content: space-around;
  gap: 1vw;
  align-items: center;
  padding-left: 3vw;
}
label {
  flex-direction: column;
  justify-content: center;
}
label div {
  font-size: 0.7vw;
  min-width: max-content;
  text-align: center;
}
label button {
  margin: auto;
  align-self: center;
  width: 2.5vw;
  height: 1.2vw;
  background-color: var(--body-color);
  border: thick outset var(--body-shadow-color);
  border-radius: 2vw;
}
.lit {
  border-color: red;
  box-shadow: 0 0 1vw red, 0 0 0.4vw red inset;
}
#connectled {
  background-color: #111111;
  width: 10%;
  height: 25%;
  align-self: center;
  border: thin inset var(--body-shadow-color);
  border-radius: 1vw;
}
#connectled.lit {
  background: radial-gradient(white, #aaaaaa);
  box-shadow: 0 0 1vw white;
}
#scene {
  grid-column: span 2;
}
.pad {
  flex-direction: column;
  font-size: 0.9vw;
  font-family: sans-serif;
}
.pad button {
  border: 0.3vw outset var(--pad-shadow-color);
  border-radius: 0.4vw;
  background-color: var(--pad-color);
  height: 100%;
}
.pad button:active {
  background: radial-gradient(var(--pad-shadow-color), var(--pad-color));
}
.pad button:focus {
  outline: none;
}
.led {
  width: 0.7vw;
  height: 0.7vw;
  background-color: var(--body-shadow-color);
  border: thin inset var(--body-shadow-color);
  border-radius: 1vw;
}
.led.lit {
  background-color: red;
}
    `
    this.shadowRoot.append(style)

    this.main = document.createElement('main')
    if (this.getAttribute('mode') === 'light') {
      this.main.classList.add('light')
    }

    this.led = document.createElement('div')
    this.led.id = 'connectled'
    this.led.addEventListener('click', function() {
      this.classList.toggle('lit')
    })
    this.main.append(this.led)

    const brand = document.createElement('div')
    brand.innerText = 'KORG'
    brand.classList.add('brand')
    this.main.append(brand)
    const model = document.createElement('div')
    model.classList.add('model')
    model.append(document.createElement('span'))
    model.firstChild.innerText = 'nano'
    model.firstChild.id = 'nano'
    model.append('PAD2')
    this.main.append(model)

    const buttonTemplate = document.createElement('label')
    buttonTemplate.append(document.createElement('button'))
    buttonTemplate.append(document.createElement('div'))

    const buttons = document.createElement('div')
    buttons.id = 'buttons'

    for (const text of [
      'HOLD',
      'GATE ARP',
      'TOUCH SCALE',
      'KEY/RANGE',
      'SCALE/TAP',
    ]) {
      const button = buttonTemplate.cloneNode(true)
      button.children[1].innerText = text
      button.addEventListener('click', function() {
        button.children[0].classList.toggle('lit')
      })
      buttons.append(button)
    }

    this.main.append(buttons)

    const scene = document.createElement('div')
    scene.id = 'scene'
    scene.append(buttonTemplate.cloneNode(true))
    scene.firstChild.children[1].innerText = 'SCENE'
    const ledTemplate = document.createElement('div')
    ledTemplate.append(document.createElement('div'))
    ledTemplate.append(document.createElement('div'))
    for (let i = 1; i <= 4; i++) {
      const led = ledTemplate.cloneNode(true)
      led.firstChild.classList.add('led')
      if (i === 1) {
        led.firstChild.classList.add('lit')
      }
      led.children[1].innerText = i
      scene.append(led)
    }
    let currentlyLit = 1
    scene.firstChild.addEventListener('click', () => {
      scene.children[currentlyLit].firstChild.classList.remove('lit')
      currentlyLit = (currentlyLit & 3) + 1
      scene.children[currentlyLit].firstChild.classList.add('lit')
    })
    this.main.append(scene)

    const xyPad = document.createElement('div')
    xyPad.id = 'xypad'
    this.main.append(xyPad)

    const padTemplate = document.createElement('div')
    padTemplate.classList.add('pad')
    padTemplate.append(document.createElement('div'))
    padTemplate.append(document.createElement('button'))

    for (const text of [
      'C / Chromatic',
      'C♯ / Major1',
      'D / Major2',
      'D♯ / M.Penta',
      'E / M.Blues',
      'F / Bass Line',
      'F♯ / China',
      'G / 4th',
      'G♯ / User',
      'A / minor1',
      'A♯ / minor2',
      'B / m.Penta',
      'Range - / m.Blues',
      'Range + / Raga',
      'Oct - / Ryukyu',
      'Oct + / 5th',
    ]) {
      const pad = padTemplate.cloneNode(true)
      pad.children[0].innerText = text
      this.main.append(pad)
    }

    this.shadowRoot.append(this.main)
  }

  get [Symbol.toStringTag]() {
    return 'KorgNanopad2'
  }

  static get observedAttributes() {
    return ['mode']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'mode') {
      if (oldValue === 'light' || oldValue === 'dark') {
        this.main.classList.remove(oldValue)
      }
      if (newValue === 'light' || newValue === 'dark') {
        this.main.classList.add(newValue)
      }
    }
  }

  async setupMIDI() {
    const access = await navigator.requestMIDIAccess({ sysex: true })
    this.input = [...access.inputs.values()].find(
      input => input.name === 'nanoPAD2'
    )
    return !!this.input
  }
}

const fonts = document.createElement('link')
fonts.setAttribute(
  'href',
  'https://fonts.googleapis.com/css2?family=Changa:wght@400;700&display=swap'
)
fonts.setAttribute('rel', 'stylesheet')
document.head.append(fonts)
customElements.define('korg-nanopad2', KorgNanopad2)
