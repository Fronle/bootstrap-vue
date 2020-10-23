import { mount } from '@vue/test-utils'
import { createContainer, waitNT } from '../../../tests/utils'
import { BTable } from './table'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table > tbody row events', () => {
  it('should emit row-clicked event when a row is clicked', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems
      },
      attrs: {
        // Row-clicked will only occur if there is a registered listener
        onRowClicked: () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    await $rows[1].trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeDefined()
    expect(wrapper.emitted('row-clicked').length).toBe(1)
    expect(wrapper.emitted('row-clicked')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-clicked')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-clicked')[0][2]).toBeInstanceOf(MouseEvent) // Event

    wrapper.unmount()
  })

  it('should not emit row-clicked event when prop busy is set', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems,
        busy: true
      },
      attrs: {
        // Row-clicked will only occur if there is a registered listener
        onRowClicked: () => {}
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    await $rows[1].trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()

    wrapper.unmount()
  })

  it('should not emit row-clicked event when vm.localBusy is true', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems
      },
      attrs: {
        // Row-clicked will only occur if there is a registered listener
        onRowClicked: () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    await wrapper.setData({
      localBusy: true
    })
    await $rows[1].trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()

    wrapper.unmount()
  })

  it('should emit row-dblclicked event when a row is dblclicked', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems
      },
      attrs: {
        // Row-clicked will only occur if there is a registered listener
        onRowDbclicked: () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-dblclicked')).not.toBeDefined()
    await $rows[1].trigger('dblclick')
    expect(wrapper.emitted('row-dblclicked')).toBeDefined()
    expect(wrapper.emitted('row-dblclicked').length).toBe(1)
    expect(wrapper.emitted('row-dblclicked')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-dblclicked')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-dblclicked')[0][2]).toBeInstanceOf(MouseEvent) // Event

    wrapper.unmount()
  })

  it('should not emit row-dblclicked event when a row is dblclicked and table busy', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems,
        busy: true
      },
      attrs: {
        // Row-clicked will only occur if there is a registered listener
        onRowDbclicked: () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-dblclicked')).not.toBeDefined()
    await $rows[1].trigger('dblclick')
    expect(wrapper.emitted('row-dblclicked')).not.toBeDefined()

    wrapper.unmount()
  })

  it('should emit row-middle-clicked event when a row is middle clicked', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems
      },
      listeners: {
        // Row-middle-clicked will only occur if there is a registered listener
        'row-middle-clicked': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-middle-clicked')).not.toBeDefined()
    await $rows[1].trigger('auxclick', { which: 2 })
    expect(wrapper.emitted('row-middle-clicked')).toBeDefined()
    expect(wrapper.emitted('row-middle-clicked').length).toBe(1)
    expect(wrapper.emitted('row-middle-clicked')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-middle-clicked')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-middle-clicked')[0][2]).toBeInstanceOf(Event) // Event

    wrapper.unmount()
  })

  it('should not emit row-middle-clicked event when a row is middle clicked and table busy', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems,
        busy: true
      },
      listeners: {
        // Row-middle-clicked will only occur if there is a registered listener
        'row-middle-clicked': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-middle-clicked')).not.toBeDefined()
    await $rows[1].trigger('auxclick', { which: 2 })
    expect(wrapper.emitted('row-middle-clicked')).not.toBeDefined()

    wrapper.unmount()
  })

  it('should emit row-contextmenu event when a row is right clicked', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems
      },
      listeners: {
        // Row-contextmenu will only occur if there is a registered listener
        'row-contextmenu': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-contextmenu')).not.toBeDefined()
    await $rows[1].trigger('contextmenu')
    expect(wrapper.emitted('row-contextmenu')).toBeDefined()
    expect(wrapper.emitted('row-contextmenu').length).toBe(1)
    expect(wrapper.emitted('row-contextmenu')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-contextmenu')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-contextmenu')[0][2]).toBeInstanceOf(Event) // Event

    wrapper.unmount()
  })

  it('should not emit row-contextmenu event when a row is right clicked and table busy', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems,
        busy: true
      },
      listeners: {
        // Row-contextmenu will only occur if there is a registered listener
        'row-contextmenu': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-contextmenu')).not.toBeDefined()
    await $rows[1].trigger('contextmenu')
    expect(wrapper.emitted('row-contextmenu')).not.toBeDefined()

    wrapper.unmount()
  })

  it('should emit row-hovered event when a row is hovered', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems
      },
      listeners: {
        // Row-hovered will only occur if there is a registered listener
        'row-hovered': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-hovered')).not.toBeDefined()
    await $rows[1].trigger('mouseenter')
    expect(wrapper.emitted('row-hovered')).toBeDefined()
    expect(wrapper.emitted('row-hovered').length).toBe(1)
    expect(wrapper.emitted('row-hovered')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-hovered')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-hovered')[0][2]).toBeInstanceOf(MouseEvent) // Event

    wrapper.unmount()
  })

  it('should not emit row-hovered event when a row is hovered and no listener', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-hovered')).not.toBeDefined()
    await $rows[1].trigger('mouseenter')
    expect(wrapper.emitted('row-hovered')).not.toBeDefined()

    wrapper.unmount()
  })

  it('should not emit row-hovered event when a row is hovered and table busy', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems,
        busy: true
      },
      listeners: {
        // Row-hovered will only occur if there is a registered listener
        'row-hovered': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-hovered')).not.toBeDefined()
    await $rows[1].trigger('mouseenter')
    expect(wrapper.emitted('row-hovered')).not.toBeDefined()

    wrapper.unmount()
  })

  it('should emit row-unhovered event when a row is unhovered', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems
      },
      listeners: {
        // Row-unhovered will only occur if there is a registered listener
        'row-unhovered': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-unhovered')).not.toBeDefined()
    await $rows[1].trigger('mouseleave')
    expect(wrapper.emitted('row-unhovered')).toBeDefined()
    expect(wrapper.emitted('row-unhovered').length).toBe(1)
    expect(wrapper.emitted('row-unhovered')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-unhovered')[0][1]).toEqual(1) // Row index
    expect(wrapper.emitted('row-unhovered')[0][2]).toBeInstanceOf(MouseEvent) // Event

    wrapper.unmount()
  })

  it('should not emit row-unhovered event when a row is hovered and no listener', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-unhovered')).not.toBeDefined()
    await $rows[1].trigger('mouseleave')
    expect(wrapper.emitted('row-unhovered')).not.toBeDefined()

    wrapper.unmount()
  })

  it('should not emit row-unhovered event when a row is unhovered and table busy', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems,
        busy: true
      },
      listeners: {
        // Row-unhovered will only occur if there is a registered listener
        'row-unhovered': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-unhovered')).not.toBeDefined()
    await $rows[1].trigger('mouseleave')
    expect(wrapper.emitted('row-unhovered')).not.toBeDefined()

    wrapper.unmount()
  })

  it('should emit row-clicked event when a row is focusable and enter pressed', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems
      },
      listeners: {
        // Rows will only have tabindex=0 when a row-clicked listener present
        'row-clicked': () => {}
      },
      attachTo: createContainer()
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    $rows[1].element.focus() // Event only works when the TR is focused
    await waitNT(wrapper.vm)
    await $rows[1].trigger('keydown.enter')
    await waitNT(wrapper.vm)
    expect(wrapper.emitted('row-clicked')).toBeDefined()
    expect(wrapper.emitted('row-clicked').length).toBe(1)
    expect(wrapper.emitted('row-clicked')[0][0]).toEqual(testItems[1]) // Row item
    expect(wrapper.emitted('row-clicked')[0][1]).toEqual(1) // Row index
    // Note: the KeyboardEvent is passed to the row-clicked handler
    expect(wrapper.emitted('row-clicked')[0][2]).toBeInstanceOf(KeyboardEvent) // Event

    wrapper.unmount()
  })

  it('should not emit row-clicked event when a row is focusable, enter pressed, and table busy', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems,
        busy: true
      },
      listeners: {
        // Row-clicked will only occur if there is a registered listener
        'row-clicked': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    $rows[1].element.focus() // Event only works when the TR is focused
    await $rows[1].trigger('keydown.enter')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()

    wrapper.unmount()
  })

  it('should not emit row-clicked event when clicking on a button or other interactive element', async () => {
    const wrapper = mount(BTable, {
      attachTo: createContainer(),
      props: {
        // Add extra virtual columns
        fields: [].concat(testFields, ['d', 'e', 'f']),
        // We just use a single row for testing
        items: [testItems[0]]
      },
      slots: {
        // In Vue 2.6x, slots get translated into scopedSlots
        'cell(a)': '<button id="a">button</button>',
        'cell(b)': '<input id="b">',
        'cell(c)': '<a href="#" id="c">link</a>',
        'cell(d)':
          '<div class="dropdown-menu"><div id="d" class="dropdown-item">dropdown</div></div>',
        'cell(e)': '<label for="e">label</label><input id="e">',
        'cell(f)': '<label class="f-label"><input id="e"></label>'
      },
      listeners: {
        // Row-clicked will only occur if there is a registered listener
        'row-clicked': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('TABLE')
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(1)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()

    const $btn = wrapper.find('button[id="a"]')
    expect($btn.exists()).toBe(true)
    await $btn.trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()

    const $input = wrapper.find('input[id="b"]')
    expect($input.exists()).toBe(true)
    await $input.trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()

    const $link = wrapper.find('a[id="c"]')
    expect($link.exists()).toBe(true)
    await $link.trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()

    const $dd = wrapper.find('div[id="d"]')
    expect($dd.exists()).toBe(true)
    await $dd.trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()

    const $label = wrapper.find('label[for="e"]')
    expect($label.exists()).toBe(true)
    await $label.trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()

    const $labelf = wrapper.find('label.f-label')
    expect($labelf.exists()).toBe(true)
    await $labelf.trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()

    wrapper.unmount()
  })

  it('keyboard events moves focus to appropriate rows', async () => {
    const wrapper = mount(BTable, {
      props: {
        fields: testFields,
        items: testItems
      },
      listeners: {
        // Tabindex will only be set if there is a row-clicked listener
        'row-clicked': () => {}
      },
      attachTo: createContainer()
    })
    expect(wrapper).toBeDefined()
    await waitNT(wrapper.vm)
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect($rows.wrappers.every(w => w.attributes('tabindex') === '0')).toBe(true)

    expect(document.activeElement).not.toBe($rows[0].element)
    expect(document.activeElement).not.toBe($rows[1].element)
    expect(document.activeElement).not.toBe($rows[2].element)

    $rows[0].element.focus()
    expect(document.activeElement).toBe($rows[0].element)

    await $rows[0].trigger('keydown.end')
    expect(document.activeElement).toBe($rows[2].element)

    await $rows[2].trigger('keydown.home')
    expect(document.activeElement).toBe($rows[0].element)

    await $rows[0].trigger('keydown.down')
    expect(document.activeElement).toBe($rows[1].element)

    await $rows[1].trigger('keydown.up')
    expect(document.activeElement).toBe($rows[0].element)

    await $rows[0].trigger('keydown.down', { shiftKey: true })
    expect(document.activeElement).toBe($rows[2].element)

    await $rows[2].trigger('keydown.up', { shiftKey: true })
    expect(document.activeElement).toBe($rows[0].element)

    // Should only move focus if TR was target
    await $rows[0].find('td').trigger('keydown.down')
    expect(document.activeElement).toBe($rows[0].element)

    wrapper.unmount()
  })
})
