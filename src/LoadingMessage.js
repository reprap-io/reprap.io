import React from 'react'
import { Message, Icon } from 'semantic-ui-react'


const LoadingMessage = () => (
  <Message icon>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>One moment please...</Message.Header>
      We're 2D printing the information you requested
    </Message.Content>
  </Message>
)

export default LoadingMessage
