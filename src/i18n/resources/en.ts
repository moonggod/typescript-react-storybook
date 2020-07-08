import { Spec } from './_spec'

import { I18N_NS as componentsNs } from '../../components/_i18n'
import { en as componentsResEn } from '../../components/_i18n/en'
import { I18N_NS as NotificationNs } from '../../components/Notification/_i18n'
import { en as NotificationResEn } from '../../components/Notification/_i18n/en'
import { I18N_NS as LogNs } from '../../pages/Log/_i18n'
import { en as LogResEn } from '../../pages/Log/_i18n/en'

export const en: Spec = {
  [componentsNs]: componentsResEn,
  [NotificationNs]: NotificationResEn,
  [LogNs]: LogResEn,
}
