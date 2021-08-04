import React, {useCallback} from "react";
import {Box, makeStyles, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {curCard} from "../store/selectors";
import {skip} from "../store/actions";

const useStyles = makeStyles((theme) => ({
    card: {
        width: "100%",
        paddingTop: "50%",
        background: '#FFF7DB',
        border: 'solid 9px black',
        boxShadow: "16px 16px 0 #F5E9BC",
        boxSizing: "border-box",
        position: "relative"
    },
    text: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
    },
    button: {
        position: "absolute",
        right: 0,
        bottom: 0
    }
}));


export default function Cards() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentCard = useSelector(curCard);

    const onSkip = useCallback(() => {
        dispatch(skip())
    }, [dispatch]);

    return <>
        {currentCard && <Box className={classes.card}>
            <Box className={classes.text}><Typography align={"center"} variant={"h2"}>{currentCard}</Typography></Box>
            <Button variant={"text"} className={classes.button} onClick={onSkip}>SKIP</Button>
        </Box>}
    </>
}
