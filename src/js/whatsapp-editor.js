function whatsappEditor (element, options) {
  const settings = Object.assign({
    height: '300px',
    bold: true,
    italic: true,
    strikethrough: true,
    monospace: true,
    smiles: true,
    html_content: false,
    new_line: true,
    content: ''
  }, options)

  function createElement (tag, className, innerHTML) {
    const el = document.createElement(tag)
    if (className) el.className = className
    if (innerHTML) el.innerHTML = innerHTML
    return el
  }

  function initToolbar (parentElement) {
    const toolbar = createElement('div', 'whatsapp-toolbar')

    if (settings.bold) {
      const boldButton = createElement('a', null, "<span class='fa fa-bold fa-fw'></span>")
      boldButton.href = 'javascript:void(0)'
      boldButton.addEventListener('click', function () {
        format('bold')
      })
      toolbar.appendChild(boldButton)
    }

    if (settings.italic) {
      const italicButton = createElement('a', null, "<span class='fa fa-italic fa-fw'></span>")
      italicButton.href = 'javascript:void(0)'
      italicButton.addEventListener('click', function () {
        format('italic')
      })
      toolbar.appendChild(italicButton)
    }

    if (settings.strikethrough) {
      const strikeButton = createElement('a', null, "<span class='fa fa-strikethrough fa-fw'></span>")
      strikeButton.href = 'javascript:void(0)'
      strikeButton.addEventListener('click', function () {
        format('strikethrough')
      })
      toolbar.appendChild(strikeButton)
    }

    if (settings.new_line) {
      const newlinebutton = createElement('a', null, "<span class='fa fa-level-down-alt fa-fw'></span>")
      newlinebutton.href = 'javascript:void(0)'
      newlinebutton.addEventListener('click', function () {
        document.execCommand('insertLineBreak')
      })
      toolbar.appendChild(newlinebutton)
    }
    if (settings.smiles) {
      const dropdown = createElement('a', 'whatsapp-dropdown')

      dropdown.href = 'javascript:void(0)'
      const dropdownContent = createElement('div', 'whatsapp-dropdown-content hide')
      prepareSmileMenu(dropdownContent)
      const smileIcon = createElement('span', '', '🙂')

      dropdown.appendChild(smileIcon)
      toolbar.appendChild(dropdown)
      dropdown.appendChild(dropdownContent)
      dropdown.addEventListener('click', function (event) {
        event.stopPropagation()
        if (dropdownContent.classList.contains('hide')) {
          dropdownContent.classList.remove('hide')
        } else {
          dropdownContent.classList.add('hide')
        }
      })

      document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target)) {
          dropdownContent.classList.add('hide')
        }
      })
    }

    parentElement.appendChild(toolbar)
  }

  function prepareSmileMenu (parentElement) {
    const categorizedEmojis = {
      people: [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
        '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
        '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸',
        '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️',
        '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡',
        '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓',
        '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄',
        '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵',
        '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠',
        '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽',
        '👾', '🤖'
      ],
      animals: [
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
        '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤',
        '🐣', '🐥', '🦆', '🦅', '🦉', '🐴', '🦄', '🐝', '🐛', '🦋',
        '🐌', '🐞', '🐜', '🪲', '🦟', '🦗', '🐢', '🐍', '🦎', '🦖',
        '🦕', '🐙', '🦑', '🦐', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳',
        '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘',
        '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄',
        '🐎', '🐖', '🐏', '🐑', '🦙', '🦌', '🐐', '🐓', '🦃', '🦜',
        '🦢', '🦩', '🦚', '🦜', '🐕', '🐩', '🐈', '🐇', '🐿️', '🦔'
      ],
      food: [
        '🍵', '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐',
        '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑',
        '🥦', '🥬', '🥒', '🌶', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅',
        '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳',
        '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔',
        '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥘', '🥫',
        '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙',
        '🍚', '🍘', '🍥', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧',
        '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🧂', '🥤',
        '🧃', '🧉', '🧊', '☕', '🫖', '🍶', '🍺', '🍻', '🥂',
        '🍷', '🥃', '🍸', '🍹', '🍾', '🧋', '🥤', '🥢', '🍽', '🍴',
        '🥄'
      ],
      sports: [
        '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🎱', '🏓',
        '🏸', '🥅', '🏒', '🏑', '🥍', '🏏', '⛳', '🏹', '🎣', '🤿',
        '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🧗', '🏇', '🏂',
        '🏌️', '🏄', '🚣', '🏊', '🤽', '🚴', '🚵', '🏆', '🥇', '🥈',
        '🥉', '🏅', '🎖', '🎗', '🎟', '🏵', '🎫', '🎯', '🎳', '🪁'
      ],
      travelAndPlaces: [
        '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐',
        '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍️', '🛺', '🚨', '🚔',
        '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝',
        '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫',
        '🛬', '🛩️', '💺', '🛰️', '🚀', '🛸', '🚁', '🛶', '⛵', '🚤',
        '🛥️', '🛳️', '⛴️', '🚢', '⚓', '🪝', '⛽', '🚧', '🚦', '🚥',
        '🏁', '🚏', '🗺️', '🗿', '🗽', '🗼', '🏰', '🏯', '🏟️', '🎡',
        '🎢', '🎠', '⛲', '⛱️', '🏖️', '🏝️', '🏜️', '🌋', '⛰️', '🏔️',
        '🗻', '🏕️', '🏖️', '🏞️', '🏟️', '🏛️', '🏗️', '🧱', '🏘️', '🏚️',
        '🏠', '🏡', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪',
        '🏫', '🏩', '💒', '🏛️', '⛪', '🕌', '🛕', '🕍', '🕋', '⛩️',
        '🛤️', '🛣️', '🗾', '🎑', '🏞️', '🌅', '🌄', '🌠', '🎇', '🎆',
        '🌇', '🌆', '🏙️', '🌃', '🌌', '🌉', '🌁'
      ],
      objects: [
        '💡', '⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️',
        '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥',
        '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️',
        '🎛️', '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌',
        '🔦', '🕯️', '🪔', '🧯', '🛢️', '💸', '💵', '💴', '💶',
        '💷', '💰', '💳', '🧾', '💎', '⚖️', '🪜', '⚒️', '🛠️', '🗡️',
        '🔪', '🪚', '🔨', '⚙️', '🪛', '🔧', '🔩', '⚗️', '🧪', '🧫',
        '🧬', '🧯', '🔬', '🔭', '📡', '💉', '🩸', '💊', '🩹', '🩺',
        '🚪', '🛏️', '🛋️', '🪑', '🚽', '🚿', '🛁', '🪠', '🧴', '🧷',
        '🧹', '🧺', '🧻', '🪣', '🧼', '🪥', '🧽', '🪤', '🪒', '🧯',
        '🗑️', '🛒', '🚬', '⚰️', '⚱️', '🏺', '🗿', '🪆', '🪅', '🪐'
      ],
      symbols: [
        '🔣', '🏧', '🚮', '🚰', '♿', '🚹', '🚺', '🚻', '🚼', '🚾', '🛂',
        '🛃', '🛄', '🛅', '⚠️', '🚸', '⛔', '🚫', '🚳', '🚭', '🚯',
        '🚱', '🚷', '📵', '🔞', '☢️', '☣️', '⬆️', '↗️', '➡️', '↘️',
        '⬇️', '↙️', '⬅️', '↖️', '↕️', '↔️', '↩️', '↪️', '⤴️', '⤵️',
        '🔃', '🔄', '🔙', '🔚', '🔛', '🔜', '🔝', '🛐', '⚛️', '🕉️',
        '✡️', '☸️', '☯️', '✝️', '☦️', '☪️', '☮️', '🕎', '🔯', '♈',
        '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒',
        '♓', '🆔', '⚕️', '🏳️‍🌈', '🏳️‍⚧️', '🚺', '🚹', '🚻', '🚼', '🚾',
        '⚧️', '🅿️', '🈁', '🈂️', '🈷️', '🈶', '🈯', '🉐', '🉑', '㊗️',
        '㊙️', '🈺', '🈸', '🈴', '🈳', '🈲', '🅰️', '🅱️', '🆎', '🆑',
        '🅾️', '🆘', 'ℹ️', '🔤', '🔡', '🔠', '🔢', '🆗', '🆙', '🆒',
        '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣',
        '8️⃣', '9️⃣', '🔟', '🔠', '🔡', '🔢', '🔤', '🅰️', '🅱️'
      ],
      flags: [
        '🏴', '🏁', '🚩', '🎌', '🏳️', '🏳️‍🌈', '🏴‍☠️'
      ]
    }

    // Crear las pestañas
    const tabs = createElement('ul', 'tabs')
    Object.keys(categorizedEmojis).forEach(category => {
      const tab = createElement('li', 'tab', categorizedEmojis[category][0]) // Usa el primer emoji como ícono de la pestaña
      tab.dataset.category = category
      tab.addEventListener('click', function (event) {
        event.stopPropagation()
        Array.from(tabs.children).forEach(tab => tab.classList.remove('active'))
        tab.classList.add('active')

        renderEmojis(category)
      })
      tabs.appendChild(tab)
    })
    parentElement.appendChild(tabs)

    // Crear el contenedor de emojis
    const emojiContainer = createElement('div', 'emoji-container')
    parentElement.appendChild(emojiContainer)

    function renderEmojis (category) {
      emojiContainer.innerHTML = '' // Limpiar emojis previos

      if (categorizedEmojis[category]) {
        categorizedEmojis[category].forEach(emoji => {
          const emojiSpan = createElement('span', 'emoji', emoji)
          emojiSpan.addEventListener('click', function (event) {
            event.stopPropagation()
            format('smile', emoji)

            parentElement.classList.add('hide')
          })
          emojiContainer.appendChild(emojiSpan)
        })
      }
    }

    // Inicializar mostrando la primera categoría
    tabs.firstChild.classList.add('active')
    renderEmojis(Object.keys(categorizedEmojis)[0])
  }

  function format (command, value) {
    if (command === 'bold' || command === 'italic' || command === 'strikethrough') {
      document.execCommand(command, false)
    } else if (command === 'monospace') {
      document.execCommand('fontName', false, 'monospace')
    } else if (command === 'smile') {
      document.execCommand('insertHTML', false, value)
    }
  }

  function initEditor (parentElement) {
    const editor = createElement('div', 'whatsapp-editor')
    editor.setAttribute('data-placeholder', 'Escribe aquí tu mensaje…')
    editor.setAttribute('contenteditable', true)

    editor.style.height = settings.height
    editor.addEventListener('keypress', function (e) {
      if (e.charCode === 96 || e.charCode === 95 || e.charCode === 126 || e.charCode === 42) {
        e.preventDefault()
      }
      if (e.key === 'Enter') {
        document.execCommand('insertLineBreak')
        e.preventDefault()
      }
    })

    if (settings.content) {
      editor.innerHTML = settings.content
    }

    parentElement.appendChild(editor)
    editor.focus()
    placeCaretAtEnd(editor)
  }

  function placeCaretAtEnd (el) {
    // Crear un nuevo rango
    const range = document.createRange()
    // Obtener la selección actual
    const selection = window.getSelection()
    // Mover el rango al final del contenido del editor
    range.selectNodeContents(el)
    range.collapse(false)
    // Limpiar cualquier selección existente y establecer el nuevo rango
    selection.removeAllRanges()
    selection.addRange(range)
  }
  function prepareFormattedContent (htmlContent) {
    htmlContent = htmlContent.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')

    htmlContent = htmlContent.replace(/<b>(.*?)<\/b>/gs, function (match, content) {
      return content.split(/<br\s*\/?>/).map(line => line ? `*${line.trimRight()}* ` : '').join('\n')
    })

    htmlContent = htmlContent.replace(/<i>(.*?)<\/i>/gs, function (match, content) {
      return content.split(/<br\s*\/?>/).map(line => line ? `_${line.trimRight()}_ ` : '').join('\n')
    })

    htmlContent = htmlContent.replace(/<strike>(.*?)<\/strike>/gs, function (match, content) {
      return content.split(/<br\s*\/?>/).map(line => line ? `~${line.trimRight()}~ ` : '').join('\n')
    })

    htmlContent = htmlContent

      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<[^>]*>/g, '')
      .replaceAll('&nbsp;', ' ')

    return htmlContent
  }

  const getFormattedContent = function (elementId) {
    const editor = document.querySelector(`#${elementId} .whatsapp-editor`)
    if (editor) {
      return prepareFormattedContent(editor.innerHTML)
    }
    return null
  }

  initToolbar(element)
  initEditor(element)

  return {
    getFormattedContent
  }
}
