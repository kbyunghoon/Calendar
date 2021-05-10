import React from 'react';
import { Container, Button, Link } from 'react-floating-action-button'


class MainContent extends React.Component {
  render() {
    return (
      <Container>
        <Link href="#"
          tooltip="Create note link"
          icon="far fa-sticky-note" />
        <Link href="#"
          tooltip="Add user link"
          icon="fas fa-user-plus" >122131233</Link>
              {/* className="fab-item btn btn-link btn-lg text-white" */}
        <Button
          tooltip="The big plus button!"
          // icon="fas fa-plus"
          rotate={false}
          onClick={() => alert('FAB Rocks!')} >메뉴</Button>
      </Container>
    )
  }
}

// const CalendarBody = styled.

export default MainContent;