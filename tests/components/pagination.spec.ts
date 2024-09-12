import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'

describe('Pagination', () => {
  it('renders a list of buttons of the first page', async () => {
    const wrapper = mount(Pagination, {
      props: {
        pending: 'success',
        page: 1,
        lastPage: 10,
        perPage: 20,
        total: 20
      },
      global: {
        stubs: {
          'client-only': {
            template: '<slot></slot>'
          }
        }
      }
    })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(7)
  })

  it('renders a list of buttons of the last page', async () => {
    const wrapper = mount(Pagination, {
      props: {
        pending: 'success',
        page: 10,
        lastPage: 10,
        perPage: 20,
        total: 20
      },
      global: {
        stubs: {
          'client-only': {
            template: '<slot></slot>'
          }
        }
      }
    })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(7)
  })

  it('renders a list of buttons of the second page', async () => {
    const wrapper = mount(Pagination, {
      props: {
        pending: 'success',
        page: 2,
        lastPage: 10,
        perPage: 20,
        total: 20
      },
      global: {
        stubs: {
          'client-only': {
            template: '<slot></slot>'
          }
        }
      }
    })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(9)
  })

  it('Verify if the endPageValue match the correct result', async () => {
    const wrapper = mount(Pagination, {
      props: {
        pending: 'success',
        page: 10,
        lastPage: 10,
        perPage: 20,
        total: 20
      },
      global: {
        stubs: {
          'client-only': {
            template: '<slot></slot>'
          }
        }
      }
    })

    const vm = wrapper.vm as any
    expect(vm.endPage()).toBe(10)
    await wrapper.setProps({ page: 10 })
    expect(vm.endPage()).toBe(10)
    await wrapper.setProps({ page: 5 })
    expect(vm.endPage()).toBe(8)
    await wrapper.setProps({ lastPage: 3, page: 2 })
    expect(vm.endPage()).toBe(3)
  })

  it('Verify if button emits an event', async () => {
    const wrapper = mount(Pagination, {
      props: {
        pending: 'success',
        page: 2,
        lastPage: 10,
        perPage: 20,
        total: 20
      },
      global: {
        stubs: {
          'client-only': {
            template: '<slot></slot>'
          }
        }
      }
    })

    const buttons = wrapper.findAll('button')

    // Anterior
    await buttons[1].trigger('click')
    expect(wrapper.emitted().paginate[0]).toEqual([1])
    await wrapper.vm.$nextTick()

    // página 3
    await buttons[4].trigger('click')
    expect(wrapper.emitted().paginate[1]).toEqual([3])
    await wrapper.vm.$nextTick()

    // primeira
    await buttons[0].trigger('click')
    expect(wrapper.emitted().paginate[2]).toEqual([1])
    await wrapper.vm.$nextTick()

    // próxima
    await buttons[7].trigger('click')
    console.log(wrapper.emitted().paginate)
    expect(wrapper.emitted().paginate[3]).toEqual([3])

    // ultima
    await buttons[8].trigger('click')
    console.log(wrapper.emitted().paginate)
    expect(wrapper.emitted().paginate[4]).toEqual([10])

  })
})