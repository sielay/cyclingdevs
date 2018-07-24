import * as React from 'react'
import Link from 'gatsby-link'
import HeaderMenu from '../components/HeaderMenu'
import { menuItems } from '../layouts'
import Instafeed from 'react-instafeed'
import {
  Button,
  Segment,
  Container,
  Grid,
  Header,
  Icon,
} from 'semantic-ui-react'

const JUSTGIVING = 'https://www.justgiving.com/crowdfunding/cyclingdevs2018'
const INR = 'http://informatycynarowery.pl/home'
const T300M4D = 'https://www.justgiving.com/fundraising/300mfordad'
const TWTR = 'https://twitter.com/cyclingdevs?ref_src=twsrc%5Etfw'

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialized: false,
    }
  }

  componentDidMount() {
    if (this.state.initialized) {
      return
    }

    /* tslint:disable:no-string-literal */
    const twttr = window['twttr'] || undefined
    /* tslint:enable:no-string-literal */

    if (typeof twttr === 'undefined') {
      const twittertimeline = this.node
      const twitterscript = document.createElement('script')
      twitterscript.src = '//platform.twitter.com/widgets.js'
      twitterscript.async = true
      twitterscript.id = 'twitter-wjs'
      twittertimeline.parentNode.appendChild(twitterscript)
    } else {
      twttr.widgets.load()
    }

    setTimeout(function() {
      var d = document
      var jg = d.createElement('script')
      jg.type = 'text/javascript'
      jg.async = true
      jg.src = 'https://widgets.justgiving.com/crowdfunding-pledge-box/host.js'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(jg, s)
    }, 100)

    this.setState({ initialized: true })
  }

  shouldComponentUpdate() {
    return false
  }

  masterHead(props) {
    return (
      <Segment vertical inverted textAlign="center" className="masthead">
        <HeaderMenu
          Link={Link}
          pathname={props.location.pathname}
          items={menuItems}
          inverted
        />
        <Container text>
          <Header inverted as="h1">
            CyclingDevs
          </Header>
          <Header inverted as="h2">
            <span style={{
              textDecoration: 'line-through'
            }}>Cycling</span> Walking for Charity and Code
          </Header>
          <Button
            primary
            size="huge"
            as="a"
            href="https://www.strava.com/clubs/cyclingdevs"
          >
            Join us!
          </Button>
          <Button primary size="huge" as="a" href={JUSTGIVING}>
            Donate!
          </Button>
        </Container>
      </Segment>
    )
  }

  aboutUs() {
    return [
      <Header key="a-h">CyclingDevs</Header>,
      <p key="a-p">
        CyclingDevs is a non-profit initiative that hopes to gather people
        around IT sector in the UK to fundraise together for the community.
      </p>,
      <Header key="a-h2">Inspiration</Header>,
      <p key="a-p2">
        CyclingDevs is hugely inspired by{' '}
        <a href={INR} target="_blank">
          InformatycyNaRowery
        </a>{' '}
        which since 2012 gather developers from Szczecin, Poland (but not only)
        to fundraise for medical treatments for children in need.
      </p>,
    ]
  }

  about2018() {
    return [
      <Header key="a-1">Causes</Header>,

      <p key="a-2">
        Last year we{' '}
        <a href={T300M4D} target="_blank">
          gathered £560.00
        </a>{' '}
        for the University of Liverpool Pancreatic Cancer Research Fund. This
        year we cycle for {' '}<a href={JUSTGIVING} target="_blank">
          Szymon (10 years old)
        </a>{' '}
        who fights for a normal life after spinal tumour surgery which left him
        on a wheelchair.
      </p>,
      <Header key="a-3">Organisation</Header>,

      <p key="a-4">
        At the moment CyclingDevs has no organisational structure. Anyone can
        join, suggest the route or a cause to fundraise for.
      </p>,
    ]
  }

  twitter() {
    return [
      <Header icon key="twitter-h">
        <Icon name="twitter" />
        Our Twitter feed
      </Header>,
      <a
        key="twitter"
        className="twitter-timeline"
        data-tweet-limit="3"
        href={TWTR}
        ref={node => (this.node = node)}
      >
        Tweets by @CyclingDevs
      </a>,
    ]
  }

  insta() {
    const instafeedTarget = 'instafeed'
    const TOKEN = '7178833908.27e3e6f.8a0e6373ebe44c76b1026b29a340c6fe'
    return [
      <Header icon key="insta-h">
        <Icon name="instagram" />
        Our Instagram feed
      </Header>,
      <div id={instafeedTarget} key="insta">
        <Instafeed
          limit="5"
          ref="instafeed"
          resolution="standard_resolution"
          sortBy="most-recent"
          target={instafeedTarget}
          template={`
<div class="ui card">
<div class="image">
    <img src="{{image}}"/>
</div>
<div class="content">
  <a class="header">{{location}}</a>
  <div class="description">
    {{model.short_caption}}
  </div>
</div>
<div class="extra">
  <a href="{{link}}" target="_blank">
    View on Instagram
  </a>
</a>
</div>
`}
          userId="7178833908"
          clientId="27e3e6f45a9d426d935699b59ffefd7d"
          accessToken={TOKEN}
        />
      </div>,
    ]
  }

  strava() {
    const FEED =
      'https://www.strava.com/clubs/446772/latest-rides/' +
      '3287dd038d4f81aab21dd5a774244964e50d3f62?show_rides=true'
    return [
      <Header icon key="strava-h">
        <Icon name="bicycle" />
        Our Strava Activity
      </Header>,
      <iframe
        key="strava"
        frameBorder="0"
        height="454"
        scrolling="no"
        src={FEED}
        width="100%"
      />,
    ]
  }

  render() {
    const props = this.props
    return (
      <Grid stackable verticalAlign="top" className="container">
        <Grid.Row>
          <Grid.Column width="10" verticalAlign={'top'} stretched={true}>
            {this.masterHead(props)}

            {/* Key features */}
            <Segment vertical className="stripe alternate feature">
              <Grid
                columns="2"
                textAlign="center"
                divided
                relaxed
                stackable
                className="container"
              >
                <Grid.Row>
                  <Grid.Column>
                    {this.aboutUs()}
                    {this.about2018()}
                  </Grid.Column>
                  <Grid.Column>
                    {this.insta()}
                    {this.twitter(props)}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column width="6" verticalAlign={'top'} stretched={true} textAlign="center">
            <Segment vertical className="stripe alternate feature">
            <div
              id="jg-crowdfunding-pledge-box"
              data-config="id=cyclingdevs2018"
            />
            {this.strava()}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
