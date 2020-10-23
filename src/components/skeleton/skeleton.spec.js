import { mount } from '@vue/test-utils'
import { BSkeleton } from './skeleton'

describe('skeleton', () => {
  it('default has root element of div, and default classes', async () => {
    const wrapper = mount(BSkeleton)

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')

    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.classes()).toContain('b-skeleton')
    expect(wrapper.classes()).toContain('b-skeleton-text')
    expect(wrapper.classes()).toContain('b-skeleton-animate-wave')

    wrapper.unmount()
  })

  it('has class `b-skeleton-button` when `type="button"` is set', async () => {
    const wrapper = mount(BSkeleton, {
      props: {
        type: 'button'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.classes()).toContain('b-skeleton-button')

    wrapper.unmount()
  })

  it('has class `b-skeleton-animate-fade` when `animation="fade"` is set', async () => {
    const wrapper = mount(BSkeleton, {
      props: {
        animation: 'fade'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.classes()).toContain('b-skeleton-animate-fade')

    wrapper.unmount()
  })

  it('has no animate class when `animation` prop has falsy value', async () => {
    const wrapper = mount(BSkeleton, {
      props: {
        animation: null
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.classes()).not.toContain('b-skeleton-animate-wave')

    wrapper.unmount()
  })

  it('has `width` style set when `width` prop is used', async () => {
    const wrapper = mount(BSkeleton, {
      props: {
        width: '50px'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.style.width).toBe('50px')

    wrapper.unmount()
  })

  it('has `height` style set when `height` prop is used', async () => {
    const wrapper = mount(BSkeleton, {
      props: {
        height: '50px'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.style.height).toBe('50px')

    wrapper.unmount()
  })

  it('has `width` and `height` styles set when `size` prop is used', async () => {
    const wrapper = mount(BSkeleton, {
      props: {
        size: '50px'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.style.height).toBe('50px')
    expect(wrapper.element.style.width).toBe('50px')

    wrapper.unmount()
  })

  it('`size` prop overrules the `width` and `height` props', async () => {
    const wrapper = mount(BSkeleton, {
      props: {
        height: '25px',
        width: '40px',
        size: '50px'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.style.height).toBe('50px')
    expect(wrapper.element.style.width).toBe('50px')

    wrapper.unmount()
  })

  it('has `bg-[variant]` class applied when `variant` prop is used', async () => {
    const wrapper = mount(BSkeleton, {
      props: {
        variant: 'primary'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.classes()).toContain('bg-primary')

    wrapper.unmount()
  })
})
