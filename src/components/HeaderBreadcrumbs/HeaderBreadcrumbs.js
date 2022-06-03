import { useLocation, useParams } from 'react-router-dom'

import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import PATHS from 'pages/paths'
import pluralize from 'pluralize'
import { useTransformName } from './hooks'
import { useTranslations } from 'contexts/Translation'

const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

const HeaderBreadcrumbs = () => {
  const { AUTHENTICATED } = PATHS
  const { t } = useTranslations()
  const transformName = useTransformName()
  const location = useLocation()
  const params = useParams()
  const breadcrumbNameMap = Object.fromEntries(
    Object.entries(AUTHENTICATED).map((a) => a.reverse())
  )

  const transformCollectionName = (name) =>
    name
      .split('-')
      .map((word, index) => (index !== 0 ? capitalize(word) : word))
      .join('')

  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const [collectionName] = pathSnippets

  const modelName = pluralize.singular(
    collectionName.includes('-')
      ? transformCollectionName(collectionName)
      : collectionName
  )

  const documentId = params[`${modelName}Id`]

  if (documentId) {
    pathSnippets[1] = `:${modelName}Id`
  }

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`

    const transformedUrl = breadcrumbNameMap[url] ? url : pluralize(url)
    const transformedName = transformName(breadcrumbNameMap[transformedUrl])

    const showedName = transformedName === 'Show' ? documentId : transformedName

    return (
      <Breadcrumb.Item key={transformedUrl}>
        <Link to={transformedUrl.replace(`:${modelName}Id`, documentId)}>
          {t(showedName)}
        </Link>
      </Breadcrumb.Item>
    )
  })

  return (
    <Breadcrumb>
      <Breadcrumb.Item key={'/'}>
        <Link to="/">{t('Home')}</Link>
      </Breadcrumb.Item>
      {extraBreadcrumbItems}
    </Breadcrumb>
  )
}

export default HeaderBreadcrumbs
