import { ResourceKey } from 'i18next'

import { I18N_NS as user } from '../../pages/user/_i18n'
import { I18N_NS as home } from '../../pages/GFashion/Home/_i18n'
import { I18N_NS as product } from '../../pages/GFashion/product/_i18n'
import { I18N_NS as search } from '../../pages/GFashion/search/_i18n'

/* Example:
  type Namespaces =
  | typeof module1
  | typeof module2
  | typeof module3
  | typeof module4
  | typeof module5
 */
type Namespaces = typeof user | typeof home | typeof product | typeof search
export type Spec = Record<Namespaces, ResourceKey>
