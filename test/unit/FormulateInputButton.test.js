import Vue from 'vue'
import flushPromises from 'flush-promises'
import { mount } from '@vue/test-utils'
import Formulate from '@/Formulate.js'
import FormulateInput from '@/FormulateInput.vue'
import FormulateInputButton from '@/inputs/FormulateInputButton.vue'

Vue.use(Formulate)

describe('FormulateInputButton', () => {

  it('renders a button element', () => {
    const wrapper = mount(FormulateInput, { propsData: { type: 'button' } })
    expect(wrapper.contains(FormulateInputButton)).toBe(true)
  })

  it('renders a button element when type submit', () => {
    const wrapper = mount(FormulateInput, { propsData: { type: 'submit' } })
    expect(wrapper.contains(FormulateInputButton)).toBe(true)
  })

  it('uses value as highest priority content', () => {
    const wrapper = mount(FormulateInput, { propsData: {
      type: 'submit',
      value: 'Value content',
      label: 'Label content',
      name: 'Name content'
    }})
    expect(wrapper.find('button').text()).toBe('Value content')
  })

  it('uses label as second highest priority content', () => {
    const wrapper = mount(FormulateInput, { propsData: {
      type: 'submit',
      label: 'Label content',
      name: 'Name content'
    }})
    expect(wrapper.find('button').text()).toBe('Label content')
  })

  it('uses name as lowest priority content', () => {
    const wrapper = mount(FormulateInput, { propsData: {
      type: 'submit',
      name: 'Name content'
    }})
    expect(wrapper.find('button').text()).toBe('Name content')
  })

  it('uses "Submit" as default content', () => {
    const wrapper = mount(FormulateInput, { propsData: {
      type: 'submit',
    }})
    expect(wrapper.find('button').text()).toBe('Submit')
  })

  it('with label does not render label element', () => {
    const wrapper = mount(FormulateInput, { propsData: {
      type: 'button',
      label: 'my label'
    }})
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('does not render label element when type "submit"', () => {
    const wrapper = mount(FormulateInput, { propsData: {
      type: 'button',
      label: 'my label'
    }})
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('renders slot inside button when type "button"', () => {
    const wrapper = mount(FormulateInput, {
      propsData: {
        type: 'button',
        label: 'my label',
      },
      slots: {
        default: '<span>My custom slot</span>'
      }
    })
    expect(wrapper.find('button > span').html()).toBe('<span>My custom slot</span>')
  })

  it('emits a click event when the button itself is clicked', async () => {
    const handle = jest.fn();
    const wrapper = mount({
      template: `
        <div>
          <FormulateInput
            type="submit"
            @click="handle"
          />
        </div>
      `,
      methods: {
        handle
      }
    })
    wrapper.find('button[type="submit"]').trigger('click')
    await flushPromises();
    expect(handle.mock.calls.length).toBe(1)
  })

})
