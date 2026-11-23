import type { AuthConfig } from '@linagora/twake-oidc'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { signInSilently } from '@/adapters/oidc/ssoFrame'

vi.mock('openid-client', () => ({
  discovery: vi.fn(() => Promise.resolve({})),
  randomPKCECodeVerifier: vi.fn(() => 'verifier'),
  randomState: vi.fn(() => 'state'),
  calculatePKCECodeChallenge: vi.fn(() => Promise.resolve('challenge')),
  buildAuthorizationUrl: vi.fn(() => new URL('https://sso.test/authorize'))
}))

const config: AuthConfig = {
  ssoUrl: 'https://sso.test/',
  clientId: 'twaketasks',
  scope: 'openid',
  redirectUri: 'http://localhost:3000/auth/callback',
  postLogoutRedirectUri: 'http://localhost:3000/',
  apiUrl: 'http://localhost:3000'
}

describe('signInSilently', () => {
  afterEach(() => {
    Reflect.deleteProperty(document, 'prerendering')
    document.querySelectorAll('iframe').forEach(frame => {
      frame.remove()
    })
  })

  it('opens its hidden frame once a prerendered page is shown, not before', async () => {
    Object.defineProperty(document, 'prerendering', {
      configurable: true,
      value: true
    })
    void signInSilently(config).catch(() => undefined)

    await new Promise(resolve => setTimeout(resolve, 50))
    expect(document.querySelector('iframe')).toBeNull()

    document.dispatchEvent(new Event('prerenderingchange'))
    await vi.waitFor(() => {
      expect(document.querySelector('iframe')).not.toBeNull()
    })
  })
})
