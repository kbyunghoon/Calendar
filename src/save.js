import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import styled from 'styled-components';
import Modal from "./Modal";
import New from "./New";
import Fab from '@material-ui/core/Fab';
import AddIcon from "@material-ui/icons/Add";
import Done from "@material-ui/icons/DoneOutline"


const Calen = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [date_all, setDate] = useState("")
    const [name, setName] = useState()


    const openModal = (e) => {
        setName(e.event._def.title)
        setDate(e.event.startStr)
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const DoPlus = styled.button`
        /* float: right; */
        position:relative;
        left: 610px;
        bottom: 5px;;
        background-color: #FFFFFF;
        border: 1px solid;
        border-radius: 5px;
        cursor: pointer;
        padding: 5px;
    `

    const Full = styled.div`
    max-width: 600px;
    min-height: 30vh;
    height: 100%;
    background-color: #fff;
    padding: 16px;
    margin: 20px auto;
    border-radius: 5px;
    border: 1px solid #ddd;
    `;

    const BottomButton = styled.div`
    position:fixed;
    /* width: 1150px; */
    /* margin: -20px auto; */
    float: right;
    `;



    return (
        <Full>
            <h1>달력</h1>
            {/* <DoPlus onClick={New}>일정 추가</DoPlus> */}
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={[
                    { title: '이벤트1', date: '2021-03-21' },
                    { title: '이벤트2', date: '2021-03-22' }
                ]}
                eventClick={openModal}
                locale={'ko'}
            />
            <Modal open={modalOpen} close={closeModal} header={date_all} name={name} />
            <BottomButton>
                <Fab color='primary' aria-label='add' onClick={() => {
                    // 배열의 몇번째 항목을 눌렀는 지, url 파라미터로 넘겨줍니다.
                    props.history.push("/new");
                }}>
                    <AddIcon />
                </Fab>
            </BottomButton>
            <TopButton>
                <Fab color='primary' aria-label='add' onClick={() => {
                    // 배열의 몇번째 항목을 눌렀는 지, url 파라미터로 넘겨줍니다.
                    props.history.push("/new");
                }}>
                    <Done />
                </Fab>
            </BottomButton>
        </Full>
    )
};




export default Calen;