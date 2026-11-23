import { afterEach, describe, expect, it } from 'vitest'

import { railPrerender } from './PlatformBar'

afterEach(() => {
  delete window.TWAKE_RAIL_PRERENDER
})

describe('railPrerender', () => {
  it('reads the apps of TWAKE_RAIL_PRERENDER', () => {
    window.TWAKE_RAIL_PRERENDER = 'mail, calendar,,project '
    expect(railPrerender()).toEqual(['mail', 'calendar', 'project'])
  })

  it('prerenders no app when the setting is not there', () => {
    expect(railPrerender()).toEqual([])
  })
})
