import * as React from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../store";
import { Container, Menu, Icon } from "semantic-ui-react";

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.onSidebar = this.onSidebar.bind(this);
    }

    onSidebar() {
        const { dispatch } =  this.props;
        dispatch(toggleSidebar())
    }

    render() {
        const { items, pathname, Link, inverted } = this.props;
        return (
            <Container>
                <Menu
                    size="large"
                    pointing
                    secondary
                    inverted={inverted}
                    borderless
                >
                    <Menu.Item
                        as="a"
                        className="mobile only"
                        icon="sidebar"
                        onClick={this.onSidebar}
                    />
                    <Menu.Item className="mobile hidden">
                        <Icon name="bicycle" size="big" />
                    </Menu.Item>
                    {items.map((item) => {
                        const active = item.exact
                            ? pathname === item.path
                            : pathname.startsWith(item.path);
                        if (item.path.startsWith("https://")) {
                            return (
                                <a
                                    className="item mobile hidden"
                                    key={item.path}
                                    href={item.path}
                                    target="_blank"
                                >
                                    {item.name}
                                </a>
                            );
                        }
                        return (
                            <Menu.Item
                                as={Link}
                                className="mobile hidden"
                                name={item.name}
                                to={item.path}
                                key={item.path}
                                active={active}
                            />
                        );
                    })}
                </Menu>
            </Container>
        );
    }
}

export default connect()(HeaderMenu);
