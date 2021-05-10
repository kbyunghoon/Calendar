import React, { useEffect, useState } from 'react'
import FullCalendar, { CalendarApi } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import styled from 'styled-components';
import Modal from "./Modal";
import New from "./New";
import Fab from '@material-ui/core/Fab';
import AddIcon from "@material-ui/icons/Add";
import Done from "@material-ui/icons/DoneOutline"
import { useDispatch, useSelector, connect } from 'react-redux';
import { loadCalendarFB } from './redux/modules/Calendar_redux';
import { firestore } from "./firebase";

const Calen = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [date_all, setDate] = useState("")
    const [name, setName] = useState();
    const [id, setId] = useState();
    // const calendar_list = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCalendarFB())
    }, []);

    const calendar_list = useSelector(state => state.calendar.list);
    console.log(calendar_list)
    let Sche = calendar_list.map((a, idx) => {
        return { date: a.date, title: a.title, id: a.id, color: a.color, completed: a.completed };
    });
    console.log(Sche)
    const complete_ = calendar_list.filter((e) => {
        return e.completed === "true"
    })
    console.log(complete_)


    const test = () => {
        // let Sche = complete_
    }



    const openModal = (e) => {
        setName(e.event._def.title)
        setDate(e.event.startStr)
        setId(e.event.id)
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

    const FloatingButton = styled.div`
        position:relative;
        z-index: 1;
        width: 1100px;
        margin: 0 auto;
    `

    const Test = styled.div`
        position: absolute;
    `

    const Test_1 = styled.div`
        width: 50px;
        height: 300px;
        z-index: 50;
        overflow: visible;
        position: fixed;
        right: 450px;
        bottom: 90px;
    `

    const BottomButton = styled.div`
        background-position: 0 -35px;
        position: absolute;
        top: 60px;
        
    `;

    const TopButton = styled.div`
        background-position: 0 0;
    `;




    return (
        <Full>
            <h1>달력</h1>
            {/* <DoPlus onClick={New}>일정 추가</DoPlus> */}
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={Sche}
                eventClick={openModal}
                locale={'ko'}
            />
            <Modal open={modalOpen} close={closeModal} header={date_all} name={name} id={id} />
            <FloatingButton>
                <Test>
                    <Test_1>
                        <BottomButton>
                            <Fab color='primary' aria-label='add' onClick={() => {
                                // 배열의 몇번째 항목을 눌렀는 지, url 파라미터로 넘겨줍니다.
                                props.history.push("/new");
                            }}>
                                <AddIcon />
                            </Fab>
                        </BottomButton>
                        <TopButton>
                            <Fab color='primary' aria-label='add' onClick={test}>
                                <Done />
                            </Fab>
                        </TopButton>
                    </Test_1>
                </Test>
            </FloatingButton>
        </Full>
    )
};




export default Calen;