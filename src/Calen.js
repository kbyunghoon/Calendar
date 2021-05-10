import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import styled, { createGlobalStyle } from 'styled-components';
import Modal from "./Modal";
import Fab from '@material-ui/core/Fab';
import AddIcon from "@material-ui/icons/Add";
import AllIcon from "@material-ui/icons/CalendarToday"
import Done from "@material-ui/icons/DoneOutline"
import { useDispatch, useSelector } from 'react-redux';

const Calen = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [date_all, setDate] = useState("")
    const [name, setName] = useState();
    const [id, setId] = useState();
    const [toggle, settoggle] = useState(true);
    // const calendar_list = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCalendarFB())
    }, []);

    const calendar_list = useSelector(state => state.calendar.list);
    let Sche = calendar_list.map((a, idx) => {
        return {
            date: a.date,
            title: a.title,
            id: a.id,
            color: a.color,
            completed: a.completed,
            start: a.date + "T" + a.time,
            allDay: false,
        };
    });

    const handletoggle = () => {
        toggle === true ? viewComp() : viewAll()
    }

    const viewComp = () => {
        settoggle(false)
        dispatch(comploadCalendarFB())
    }

    const viewAll = () => {
        settoggle(true)
        dispatch(loadCalendarFB())
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

    const Test = styled.div`
        position: fixed;
        z-index: 10;
    `

    const BottomButton = styled.div`
        background-position: 0 -35px;
        position: fixed;
        right: 50px;
        top: 90%;
    `;

    const TopButton = styled.div`
        background-position: 0 0;
        position: fixed;
        right: 50px;
        top: 84%;
    `;

    const fabstyle = {
        width: "auto",
        height: "48px",
        borderRadius: "25px",
        minHeight: "auto",
        minWidth: "50px",
        padding: "10px",
    }

    const Full = styled.div`
        height:100%;
    `

    const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    /* background-image: url('https://source.unsplash.com/random/1920x1080'); */
    background-image: url('https://4kwallpaper.wiki/wp-content/uploads/2019/07/159329.jpg');
    /* background-image: url('https://images.unsplash.com/photo-1615714734821-e0671ec65ef7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixlib=rb-1.2.1&q=80&w=1920'); */
    background-size: cover;
    background-attachment:fixed;
    `

    const GlobalStyles = createGlobalStyle`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
        body {
            font-family: 'Nanum Pen Script', cursive !important;
            font-size: 1.8em;
            color: white;
            text-shadow: 1px 1px 1px #000;
        }
    `


    return (
        <Full>
            <Background />
            <GlobalStyles />
            <FullCalendar
                height={'auto'}
                // aspectRatio={'3'}
                // contentHeight={'auto'}
                displayEventTime={true}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={Sche}
                eventClick={openModal}
                locale={'ko'}
                eventTimeFormat={{
                    hour: "numeric",
                    minute: "2-digit",
                    meridiem: "short",
                }}
                buttonText={{
                    today: '오늘'
                }}
            />
            <Modal open={modalOpen} close={closeModal} header={date_all} name={name} id={id} />
            {/* <FloatingButton> */}
            <Test>
                <BottomButton>
                    <Fab color='primary' aria-label='add' onClick={() => {
                        // 배열의 몇번째 항목을 눌렀는 지, url 파라미터로 넘겨줍니다.
                        props.history.push("/new");
                    }}>
                        <AddIcon />
                    </Fab>
                </BottomButton>
                <TopButton>
                    <Fab
                        style={fabstyle}
                        color='primary'
                        aria-label='add'
                        onClick={handletoggle}>
                        {toggle === true                            ?
                            <><Done style={{ marginRight: "5px" }} /><p>완료 일정 보기</p></>
                            : <><AllIcon style={{ marginRight: "5px" }} /><p>전체 일정 보기</p></>}
                        {/* <Done style={{ marginRight: "5px" }} />
                        <p>완료된 일정 보기</p> */}
                    </Fab>
                </TopButton>
            </Test>
        </Full>
    )
};




export default Calen;



<Fab
    style={fabstyle}
    color='primary'
    aria-label='add'
    onClick={handletoggle}>
    <Done style={{ marginRight: "5px" }}><p>완료 일정 보기</p></Done>
</Fab>