import React, {useCallback, useState, useEffect, useRef} from "react";
import {Box, makeStyles, useTheme} from "@material-ui/core";
import {USE_SPEECH} from "../const/game";
import {useDispatch, useSelector} from "react-redux";
import {curPlayerName, isFetching, isRunning} from "../store/selectors";
import {describe} from "../store/actions";


if (USE_SPEECH) {
    // new speech recognition object
    // eslint-disable-next-line no-undef
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.continuous = true;
}


const useStyles = makeStyles((theme) => ({
    header: {
        fontFamily: theme.typography.fontFamily,
        fontSize: 24,
        color: 'white',
        background: 'black',
        borderRadius: "6px 6px 0 0",
        display: 'inline-block',
        padding: "12px 32px 14px"
    },
    input: {
        width: "100%",
        border: "solid 7px black",
        marginTop: -12,
        borderRadius: 15,
        outline: "none",
        padding: 32,
        fontSize: 32,
        background: "white"
    }
}));

export default function InputComponent() {
    const theme = useTheme();
    const classes = useStyles(theme);

    const dispatch = useDispatch();

    const currentPlayer = useSelector(curPlayerName);
    const running = useSelector(isRunning);
    const guessIsLoading = useSelector(isFetching);
    const inputRef = useRef();

    const [inputValue, setInputValue] = useState("");

    const speechActive = useRef(false);

    const onInputChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    useEffect(() => {
        if (!USE_SPEECH) {
            return;
        }
        if (running) {
            recognition.onstart = function() {
                speechActive.current = true;
            };
            recognition.onspeechstart = function(event) {
                setInputValue("listening...");
            };
            recognition.onresult = function(event) {
                const transcript = event.results[event.resultIndex][0].transcript;
                setInputValue(transcript);
                dispatch(describe(transcript));
            };
            // start recognition
            if (!speechActive.current) {
                recognition.start();
                return () => {
                    recognition.stop();
                }
            }
        } else {
            // clear recognition instance just in case
            recognition.onresult = function () {};
            recognition.stop();
            setInputValue("");
            speechActive.current = false;
        }
    }, [running, dispatch]);


    const onKeyPress = useCallback((e) => {
        if(e.key === 'Enter') {
            dispatch(describe(inputValue));
        }
    }, [inputValue, dispatch]);

    useEffect(() => {
        // clear input on guess
        if (!guessIsLoading) {
            setInputValue("");
            inputRef.current.focus();
        }
    }, [guessIsLoading]);

    const isDisabled = USE_SPEECH || guessIsLoading || !running;
    return <Box>
        <Box className={classes.header}>{currentPlayer}:</Box><br/>
        <input className={classes.input} ref={inputRef}
               placeholder={isDisabled ? "" : "Describe the character"}
                   disabled={isDisabled}
                   value={inputValue} onChange={onInputChange} onKeyPress={onKeyPress}/>
    </Box>

}
