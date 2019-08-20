import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import RegularPatternTextbox from '@components/RegularPatternTextbox.vue'

describe('RegularPatternTextbox.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(RegularPatternTextbox, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
