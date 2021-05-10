import { TextField } from '@material-ui/core';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { addCalendarFB } from './redux/modules/Calendar_redux';

const New = (props) => {
    const inputText = useRef();
    const dateText = useRef();
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);

    const submit = () => {
        setDisabled(true);
        if (dateText.current.value.length !== 16 || inputText.current.value.length < 1) {
            alert("일정내용과 시간을 확인해주세요.")
            setDisabled(false)
        } else {
            let text = inputText.current.value;
            let date_info = dateText.current.value.split("T");
            let date = date_info[0];
            let time = date_info[1];
            let schedule = { title: text, date: date, time: time, completed: "false" };
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


    const GlobalStyles = createGlobalStyle`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
        body {
            font-family: 'Noto Sans KR', sans-serif !important;
            font-size: 1.7em;
        }
    `


    const Background = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* background-image: url('https://source.unsplash.com/random/1920x1080'); */
        /* background-image: url('https://images.unsplash.com/photo-1616236740564-3e4624330c88?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixlib=rb-1.2.1&q=80&w=1920'); */
        background-image: url('https://images.unsplash.com/photo-1615714734821-e0671ec65ef7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixlib=rb-1.2.1&q=80&w=1920');
        background-size: cover;
    `
    const Container = styled.div`
    /* width: 400wh; */
    /* height: 60vh; */
    background-color: #fff;
    padding: 16px;
    /* margin: 30px auto; */
    border-radius: 5px;
    border: 1px solid #ddd;
    opacity: 0.8;
    background-color: white;
    border: 2px solid;
    `;

    const Todo = styled.h1`
    color:black;
    font-size:1.25em;
    `

    const Text = styled.div`
    /* margin: 0px 0px 5px; */
    `
    const Typedate = styled.div`
    margin: 0 auto;
    width: 250px;
    `
    
    const Button = styled.button`
    padding: 10px 20px 10px 20px;
    margin: 10px;
    `

    return (
        <>
        <GlobalStyles/>
            <Background/>
                <Container>
                    <Todo>일정 추가</Todo>
                    <Text>
                    <TextField 
                    style={{
                        // fontSize:"1.25em"
                        width:"30vw",
                        height:"10vh"
                    }}
                    inputRef={inputText} id="outlined-search" label="일정 입력" type="search" variant="outlined" />
                    </Text>
                    <Typedate>
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
                        <Button onClick={submit} disabled={disabled}>등록</Button>
                        <Button disabled={disabled} onClick={() => {
                            props.history.goBack();
                        }}>취소</Button>
                    </Typedate>
                </Container>
        </>
    )
};

export default New;