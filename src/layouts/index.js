import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import '../css/styles.css'
import '../css/responsive.css'
import '../css/semantic.min.css'
import { Provider } from 'react-redux'
import { store } from '../store'
import { Sidebar, Segment, Container, Icon } from 'semantic-ui-react'
import SidebarMenu from '../components/SidebarMenu'
import HeaderMenu from '../components/HeaderMenu'

export const menuItems = [
  { name: 'Home', path: '/', exact: true, icon: 'home', inverted: true },
  {
    name: '2017',
    path: '/blog/2018-05-17--2017/',
    exact: true,
    icon: 'info circle',
  },
  { name: '2018', path: '/blog/tags/2018', exact: true, icon: 'info circle' },
  { name: 'Blog', path: '/blog/', exact: false, icon: 'newspaper' },
  {
    name: 'Donate',
    path: 'https://www.justgiving.com/crowdfunding/cyclingdevs2018',
    exact: false,
    icon: 'money',
  },
  {
    name: 'Club',
    path: 'https://www.strava.com/clubs/cyclingdevs',
    exact: false,
    icon: 'group',
  },
]

const Layout = ({ children, data, location }) => {
  const { pathname } = location
  const isHome = pathname === '/'
  return (
    <Provider store={store}>
      <Sidebar.Pushable as={Segment}>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <SidebarMenu
          Link={Link}
          pathname={pathname}
          items={menuItems}
          visible={false}
        />
        <Sidebar.Pusher style={{ minHeight: '100vh' }}>
          {/* Header */}
          {isHome ? null : (
            <HeaderMenu Link={Link} pathname={pathname} items={menuItems} dispath={store.dispatch.bind(store)} />
          )}
          {/* Render children pages */}
          <div style={{ paddingBottom: 60 }}>{children()}</div>

          {/* Footer */}
          <Segment
            inverted
            vertical
            style={{ position: 'absolute', bottom: 0, width: '100%' }}
          >
            <Container textAlign="center">
              <p>
                Powered with <Icon name="heart" /> by Gatsby 1.0
              </p>
            </Container>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
