import * as React from 'react'
import { connect } from 'react-redux'
import "../store";
import { Menu, Icon, Sidebar } from 'semantic-ui-react'

const SidebarMenu = ({ items, pathname, Link, visible }) => {
  const isActive = item =>
    item.exact ? pathname === item.path : pathname.startsWith(item.path)
  const activeItem = items.find(item => isActive(item)) || {}
  return (
    <Sidebar
      as={Menu}
      animation="slide along"
      width="thin"
      visible={visible}
      icon="labeled"
      vertical
      inverted={activeItem.inverted}
    >
      {items.map(item => {
        const active = isActive(item)
        if (item.path.startsWith('https://')) {
          return (
            <a
              className="item"
              key={item.path}
              href={item.path}
              target="_blank"
            >
              <Icon name={item.icon} />
              {item.name}
            </a>
          )
        }
        return (
          <Menu.Item as={Link} to={item.path} active={active} key={item.path}>
            <Icon name={item.icon} />
            {item.name}
          </Menu.Item>
        )
      })}
    </Sidebar>
  )
}

const mapStateToProps = state => {
  console.log('mapStateToProps 2', state)
  return {
    visible: state.isSidebarVisible,
  }
}

export default connect(mapStateToProps)(SidebarMenu)
