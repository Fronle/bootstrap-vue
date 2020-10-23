import { mount } from '@vue/test-utils'
import { createContainer, waitNT, waitRAF } from '../../../tests/utils'
import { BOverlay } from './overlay'

describe('overlay', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BOverlay, {
      slots: {
        default: '<span>foobar</span>'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.attributes('aria-busy')).not.toBe('true')
    expect(wrapper.text()).toContain('foobar')
    expect(wrapper.find('.b-overlay').exists()).toBe(false)
    expect(wrapper.find('.spinner-border').exists()).toBe(false)

    wrapper.unmount()
  })

  it('has expected default structure when `show` prop is true', async () => {
    const wrapper = mount(BOverlay, {
      props: {
        show: true
      },
      slots: {
        default: '<span>foobar</span>'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.text()).toContain('foobar')

    const $overlay = wrapper.find('.b-overlay')
    expect($overlay.exists()).toBe(true)
    expect($overlay.classes()).toContain('position-absolute')

    const $children = $overlay.findAll('div:not(.b-overlay)')
    expect($children.length).toBe(2)

    expect($children[0].classes()).toContain('position-absolute')
    expect($children[0].classes()).toContain('bg-light')
    expect($children[0].text()).toBe('')

    expect($children[1].classes()).toContain('position-absolute')
    expect($children[1].classes()).not.toContain('bg-light')
    expect($children[1].find('.spinner-border').exists()).toBe(true)

    wrapper.unmount()
  })

  it('responds to changes in the `show` prop', async () => {
    const wrapper = mount(BOverlay, {
      attachTo: createContainer(),
      props: {
        show: false
      },
      slots: {
        default: '<span>foobar</span>'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.attributes('aria-busy')).not.toBe('true')
    expect(wrapper.text()).toContain('foobar')
    expect(wrapper.find('.b-overlay').exists()).toBe(false)
    expect(wrapper.find('.spinner-border').exists()).toBe(false)

    expect(wrapper.emitted('shown')).toBeUndefined()
    expect(wrapper.emitted('hidden')).toBeUndefined()

    await wrapper.setProps({
      show: true
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.text()).toContain('foobar')
    expect(wrapper.find('.b-overlay').exists()).toBe(true)
    expect(wrapper.find('.spinner-border').exists()).toBe(true)

    expect(wrapper.emitted('shown')).not.toBeUndefined()
    expect(wrapper.emitted('hidden')).toBeUndefined()
    expect(wrapper.emitted('shown').length).toBe(1)

    await wrapper.setProps({
      show: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.attributes('aria-busy')).not.toBe('true')
    expect(wrapper.text()).toContain('foobar')
    expect(wrapper.find('.b-overlay').exists()).toBe(false)
    expect(wrapper.find('.spinner-border').exists()).toBe(false)

    expect(wrapper.emitted('hidden')).not.toBeUndefined()
    expect(wrapper.emitted('shown').length).toBe(1)
    expect(wrapper.emitted('hidden').length).toBe(1)

    await wrapper.setProps({
      show: true
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('shown').length).toBe(2)
    expect(wrapper.emitted('hidden').length).toBe(1)

    await wrapper.setProps({
      show: false
    })
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('shown').length).toBe(2)
    expect(wrapper.emitted('hidden').length).toBe(2)

    wrapper.unmount()
  })

  it('emits event when overlay clicked', async () => {
    const wrapper = mount(BOverlay, {
      props: {
        show: true
      },
      slots: {
        default: '<span>foobar</span>'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay-wrap')

    const $overlay = wrapper.find('.b-overlay')
    expect($overlay.exists()).toBe(true)

    expect(wrapper.emitted('click')).not.toBeDefined()

    await $overlay.trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
    expect(wrapper.emitted('click').length).toBe(1)
    expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(Event)
    expect(wrapper.emitted('click')[0][0].type).toEqual('click')

    wrapper.unmount()
  })

  it('has expected default structure when `no-wrap` is set', async () => {
    const wrapper = mount(BOverlay, {
      props: {
        noWrap: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.find('div').exists()).toBe(false)

    wrapper.unmount()
  })

  it('has expected default structure when `no-wrap` is set and `show` is true', async () => {
    const wrapper = mount(BOverlay, {
      props: {
        noWrap: true,
        show: true
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-overlay')
    expect(wrapper.classes()).toContain('position-absolute')
    expect(wrapper.classes()).not.toContain('b-overlay-wrap')
    expect(wrapper.classes()).not.toContain('position-relative')

    const $children = wrapper.findAll('div:not(.b-overlay)')
    expect($children.length).toBe(2)

    expect($children[0].classes()).toContain('position-absolute')
    expect($children[0].classes()).toContain('bg-light')
    expect($children[0].text()).toBe('')

    expect($children[1].classes()).toContain('position-absolute')
    expect($children[1].classes()).not.toContain('bg-light')
    expect($children[1].find('.spinner-border').exists()).toBe(true)

    wrapper.unmount()
  })
})
