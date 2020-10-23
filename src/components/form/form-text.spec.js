import { mount } from '@vue/test-utils'
import { BFormText } from './form-text'

describe('form > form-text', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BFormText)

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BFormText, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.unmount()
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BFormText, {
      props: {
        tag: 'p'
      }
    })

    expect(wrapper.element.tagName).toBe('P')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('has user supplied ID', async () => {
    const wrapper = mount(BFormText, {
      props: {
        id: 'foo'
      }
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('foo')

    wrapper.unmount()
  })

  it('does not have class form-text when prop inline set', async () => {
    const wrapper = mount(BFormText, {
      props: {
        inline: true
      }
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).not.toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has variant class applied when prop text-variant is set', async () => {
    const wrapper = mount(BFormText, {
      props: {
        textVariant: 'info'
      }
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })
})
