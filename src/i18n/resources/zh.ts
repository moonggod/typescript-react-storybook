import { Spec } from './_spec'

import { I18N_NS as componentsNs } from '../../components/_i18n'
import { zh as componentsResZh } from '../../components/_i18n/zh'
import { I18N_NS as NotificationNs } from '../../components/Notification/_i18n'
import { zh as NotificationResZh } from '../../components/Notification/_i18n/zh'
import { I18N_NS as LogNs } from '../../pages/Log/_i18n'
import { zh as LogResZh } from '../../pages/Log/_i18n/zh'

export const zh: Spec = {
  [componentsNs]: componentsResZh,
  [NotificationNs]: NotificationResZh,
  [LogNs]: LogResZh,
}
