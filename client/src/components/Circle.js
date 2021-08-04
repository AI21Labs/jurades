import React, {useCallback} from "react";
import {Grid, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {curRound, isReady, isRunning, lastTurn, turnScore} from "../store/selectors";
import {endGame, nextTurn, runTimer, startTurn} from "../store/actions";
import { useHistory } from "react-router-dom";
import {ROUND_DUR} from "../const/game";

const useStyles = makeStyles((theme) => ({
    '@keyframes rota': {
        "0%": {transform: 'rotate(0deg)'},
        "100%": {transform: 'rotate(360deg)'}
    },
    "@keyframes opa": {
        "0%": {opacity: 1},
        "50%": {opacity: 0},
        "100%": {opacity: 0}
    },
    circle: {
        width: "100%",
        paddingTop: "100%",
        borderRadius: '50%',
        boxSizing: 'content-box',
        overflow: 'hidden',
        position: 'relative',
        border: "solid 10px black",
    },
    circleInner: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        zIndex: 999,
        width: "calc(100% - 40px)",
        height: "calc(100% - 40px)",
        borderRadius: '50%',
        boxSizing: 'content-box',
        border: "solid 20px #ECECEC",
    },
    pie: {
        width: '50%',
        height: '100%',
        transformOrigin: '100% 50%',
        position: 'absolute',
        top: 0,
        background: '#BEFF98',
    },
    spinner: {
        borderRadius: '100% 0 0 100% / 50% 0 0 50%',
        zIndex: 200,
        borderRight: 'none',
        animation: `$rota ${ROUND_DUR}s linear infinite`
    },
    filler: {
        borderRadius: '0 100% 100% 0 / 0 50% 50% 0',
        left: '50%',
        opacity: 0,
        zIndex: 100,
        animation: `$opa ${ROUND_DUR}s steps(1, end) infinite reverse`,
        borderLeft: 'none'
    },
    mask: {
        width: '50%',
        height: '100%',
        position: 'absolute',
        background: 'white',
        opacity: 1,
        zIndex: 300,
        top:0,
        animation: `$opa ${ROUND_DUR}s steps(1, end) infinite`
    }
}));



export default function Circle() {
    const classes = useStyles();
    const round = useSelector(curRound);
    const running = useSelector(isRunning);
    const readyState = useSelector(isReady);
    const score = useSelector(turnScore);
    const isLastTurn = useSelector(lastTurn);
    const dispatch = useDispatch();
    let history = useHistory();

    const onStart = useCallback(() => {
        dispatch(startTurn());
        dispatch(runTimer(ROUND_DUR * 1000));
    }, [dispatch]);

    const onNext = useCallback(() => {
        dispatch(isLastTurn ? endGame() : nextTurn());
        if (isLastTurn) {
            history.push("/done");
        }
    }, [history, dispatch, isLastTurn]);

    return <Box className={classes.circle}>
        {running && <>
            <div className={classes.pie + " " + classes.spinner}/>
            <div className={classes.pie + " " + classes.filler}/>
            <div className={classes.mask}/>
        </>}
        <Grid container direction={"column"} alignItems={"stretch"} className={classes.circleInner}
                style={running ? {border: "none"} : {} }>
                <Grid item style={{height: "25%", flexShrink: 0}} container alignItems={"flex-end"} justify={"center"}>
                    <Typography variant={"h4"} color={"textSecondary"}>Round {round+1}</Typography>
                </Grid>
                <Grid item container alignItems={"center"} justify={"center"} style={{flexGrow: 1}}>
                    <Grid item><Typography align={"center"} variant={"h1"}>
                        {readyState ? <>45<small><small><small>s</small></small></small></> : <>{score}</>}
                    </Typography></Grid>
                </Grid>
                <Grid item style={{height: "25%", flexShrink: 0}} container alignItems={"flex-start"} justify={"center"}>
                    {readyState && <Button variant={"contained"} color={"primary"} size={"medium"} disableElevation onClick={onStart}>START</Button>}
                    {!readyState && !running && <Button variant={"contained"} color={"primary"} disableElevation onClick={onNext}>
                    {isLastTurn ? "END GAME" : "NEXT PLAYER"}
                </Button>}
                </Grid>
        </Grid>
    </Box>
}
