import { mount } from '@vue/test-utils'
import { BNavbarBrand } from './navbar-brand'

describe('navbar-brand', () => {
  it('default has tag "div"', async () => {
    const wrapper = mount(BNavbarBrand)

    expect(wrapper.element.tagName).toBe('DIV')

    wrapper.unmount()
  })

  it('default has class "navbar-brand"', async () => {
    const wrapper = mount(BNavbarBrand)

    expect(wrapper.classes()).toContain('navbar-brand')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('accepts custom tag', async () => {
    const wrapper = mount(BNavbarBrand, {
      props: { tag: 'span' }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('navbar-brand')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('renders link when href set', async () => {
    const wrapper = mount(BNavbarBrand, {
      props: { href: '#foo' }
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('#foo')
    expect(wrapper.classes()).toContain('navbar-brand')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })
})
