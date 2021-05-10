import { TextField } from '@material-ui/core';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { addCalendarFB } from './redux/modules/Calendar_redux';

const New = (props) => {
    const inputText = useRef();
    const dateText = useRef();
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);

    const submit = () => {
        setDisabled(true);
        if (dateText.current.value.length != 16 || inputText.current.value.length < 1) {
            alert("체크해주세요")
            setDisabled(false)
        } else {
            let text = inputText.current.value;
            let date_info = dateText.current.value.split("T");
            let date = date_info[0];
            let time = date_info[1];

            let schedule = { title: text, date: date, time: time };
            dispatch(
                addCalendarFB(schedule),
                window.setTimeout(() => {
                    props.history.push("/")
                    alert("일정을 추가하였습니다.");
                }, 100)
            )
        }
        ;
    };


    const Background = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('https://source.unsplash.com/random/1920x1080');
        background-size: cover;
    `
    const Container = styled.div`
    max-width: 350px;
    min-height: 60vh;
    background-color: #fff;
    padding: 16px;
    margin: 20px auto;
    border-radius: 5px;
    border: 1px solid #ddd;
    opacity: 0.8;
    background-color: white;
    border: 2px solid;
    background-position: center;
    `;

    const Todo = styled.h1`
    color:black;
    `

    const Text = styled.input`
    height:300px;
    width:300px;
    margin: 0px 0px 10px;
    `
    const Typedate = styled.input`
    margin: 10px;
    `
    const [name, setName] = useState('')



    const Button = styled.button`
    padding: 5px;
    margin: 30px auto;
    `

    return (
        <>
            <Background>
                <Container>
                    <Todo>일정 추가</Todo>
                    <Text ref={inputText} />
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
                    <Button onClick={submit}>123</Button>
                    <Button onClick={() => {
                        let text = inputText.current.value;
                        let date_info = dateText.current.value.split("T");
                        let date = date_info[0];
                        let time = date_info[1];

                        let schedule = { title: text, date: date, time: time };
                        dispatch(
                            addCalendarFB(schedule),
                            window.setTimeout(() => {
                                props.history.push("/")
                                alert("일정 추가 완료");
                            }, 1000)
                        )
                    }}>등록</Button>
                    <Button onClick={() => {
                        props.history.goBack();
                    }}>취소</Button>
                </Container>
            </Background>
        </>
    )
};

export default New;