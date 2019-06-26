import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import RegularExpressionTextbox from '@/components/RegularExpressionTextbox.vue'

describe('RegularExpressionTextbox.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(RegularExpressionTextbox, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
