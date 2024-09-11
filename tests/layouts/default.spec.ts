import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DefaultLayout from '@/layouts/default.vue'

describe('Default Layout', () => {
  it('renders the logo', () => {
    const wrapper = mount(DefaultLayout)
    const logo = wrapper.find('img[alt="Farm Tech"]')
    expect(logo.exists()).toBe(true)
    const slot = wrapper.find('main')
    expect(slot.exists()).toBe(true)
  })

  it('renders the mobile doctors image', () => {
    const wrapper = mount(DefaultLayout)
    const doctorsImage = wrapper.find('img[alt="Um desenho de uma enfermeira e uma médica."]')
    expect(doctorsImage.exists()).toBe(true)
  })
})