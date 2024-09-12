import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/app.vue'

describe('Default Layout', () => {
  it('verify if app mounts', () => {
    const wrapper = mount(App,
      {
        global: {
          stubs: {
            NuxtPage: true
          }
        }
      }
    )
    expect(wrapper.findComponent({ name: 'NuxtPage' }).exists()).toBe(true)
  })

})