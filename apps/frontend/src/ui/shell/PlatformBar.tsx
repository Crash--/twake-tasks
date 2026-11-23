import {
  SdkProvider,
  TwakeBar,
  TwakeRail,
  TWAKE_RAIL_APPS,
  type TwakeBarSlots
} from '@linagora/twake-bar'
import type { Sdk } from '@linagora/twake-sdk'
import type { ReactElement } from 'react'

import projectTextIcon from '@/assets/project-text.svg?url'
import projectIcon from '@/assets/project.svg'
import { PlatformBarFrame } from '@/ds/AppFrame'
import { useI18n } from '@/ui/i18n/useI18n'
import { useSession } from '@/ui/session/SessionGate'

// Twake Project in the app registry, as in the manifest; the rail lists it
// as 'tasks' by default.
const SLUG = 'project'
const RAIL_APPS = TWAKE_RAIL_APPS.map(slug => (slug === 'tasks' ? SLUG : slug))

/** The deployment turns the rail on with TWAKE_RAIL=true. */
export function railEnabled(): boolean {
  return window.TWAKE_RAIL === 'true'
}

/** The apps the rail prerenders on hover: TWAKE_RAIL_PRERENDER, comma separated. */
export function railPrerender(): string[] {
  return (window.TWAKE_RAIL_PRERENDER ?? '')
    .split(',')
    .map(slug => slug.trim())
    .filter(Boolean)
}

/** The navigation between the apps, in place of the menus of the top bar. */
export function PlatformRail({ sdk }: { sdk: Sdk }): ReactElement {
  const { signOut } = useSession()
  return (
    <SdkProvider client={sdk}>
      <TwakeRail
        current={SLUG}
        apps={RAIL_APPS}
        prerender={railPrerender()}
        onLogOut={() => void signOut()}
      />
    </SdkProvider>
  )
}

/**
 * The platform top bar: home, the other apps and the account. Shown once the
 * SSO named the user's platform, which exchanges the id token for its own.
 */
export function PlatformBar({
  sdk,
  slots,
  withMenus = true
}: {
  sdk: Sdk
  slots: TwakeBarSlots
  withMenus?: boolean
}): ReactElement {
  const { t } = useI18n()
  const { signOut } = useSession()

  return (
    <SdkProvider client={sdk}>
      <PlatformBarFrame>
        <TwakeBar
          app={{
            slug: SLUG,
            name: t('app.name'),
            icon: new URL(projectIcon, window.location.origin).href,
            textIcon: new URL(projectTextIcon, window.location.origin).href
          }}
          slots={slots}
          withMenus={withMenus}
          onLogOut={() => void signOut()}
        />
      </PlatformBarFrame>
    </SdkProvider>
  )
}
