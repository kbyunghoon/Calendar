import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import styled from 'styled-components';
import { Modal } from "./components/Modal";


const Main = (props) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      // dateClick={({ dateStr }) => {
      // console.log(props, dateStr)
      // const index = props.dateStr;
      // console.log(state)
      // props.history.push("/detail/" + dateStr);
      // }}
      initialView="dayGridMonth"
      weekends={true}
      events={[
        { title: '이벤트1', date: '2021-03-21' },
        { title: '이벤트2', date: '2021-03-22' }
      ]}
      eventClick={
        // openModal
        (ev) => {
        console.log(ev.event.startStr)
        // const date = ev.event.startStr;
        // const event_info = ev.event._def.title;
        // props.history.push("/schedule/" + event_info);
        }
      }
      locale={'ko'}
    />
  )
};

export default Main;