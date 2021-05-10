import styled from "styled-components";
import React, { useState, useRef } from 'react';
import "./modal.css";
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import { deleteCalendarFB, updateCalendarFB } from "./redux/modules/Calendar_redux";

const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, name, id } = props;
    const [disabled, setDisabled] = useState(false);
    const date = props.header.split('T')
    // const time = date[1].split(':')
    const inputName = useRef();
    const dateText = useRef();
    const dispatch = useDispatch();
    const Datebox = styled.div`
    margin: 5px;
    `

    const Text = styled.input`
    `;

    const edit = () => {
        setDisabled(true);
        if (dateText.current.value.length !== 16 || inputName.current.value.length < 1) {
            alert("일정내용과 시간을 확인해주세요.")
            setDisabled(false)
        } else {
            let text = inputName.current.value;
            let date_info = dateText.current.value.split("T");
            let date = date_info[0];
            let time = date_info[1];
            let schedule = { title: text, date: date, time: time, id: id };
            dispatch(updateCalendarFB(schedule));
            alert("일정을 수정하였습니다.")
            setDisabled(false)
            close();
        }
    }

    const del = () => {
        let schedule = { id: id };
        dispatch(deleteCalendarFB(schedule));
        alert("일정이 삭제되었습니다!")
        close();
    };

    const comp = () => {
        let comp = "true"
        let color = "#ffffff"
        let complete = { completed: comp, id: id, color: color, date: date[0], time: date[1], title: name };
        dispatch(updateCalendarFB(complete));
        alert("일정 완료!")
        close();
    }



    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
            { open ? (
                <section>
                    <header>
                        {date[0]}
                        <p style={{ margin: "auto" }}>{name}</p>
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        <Text ref={inputName} placeholder="제목" />
                        <Datebox>
                            <TextField
                                id="datetime-local"
                                label="날짜 입력"
                                type="datetime-local"
                                defaultValue="yyyy-MM-ddThh:mmss"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputRef={dateText}
                            />
                        </Datebox>
                    </main>
                    <footer>
                        <button className="close" disabled={disabled} onClick={edit}> 일정 수정 </button>
                        <button className="close" disabled={disabled} onClick={del}> 일정 삭제 </button>
                        <button className="close" disabled={disabled} onClick={comp}> 일정 완료 </button>
                        <button className="close" disabled={disabled} onClick={close}> 닫기 </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

export default Modal;