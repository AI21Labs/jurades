import React, {useEffect} from "react";
import {Box, Grid, makeStyles} from "@material-ui/core";
import Cards from "../components/Cards";
import Circle from "../components/Circle";
import Jurassic from "../components/Jurassic";
import InputComponent from "../components/InputComponent";
import {useHistory} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {players} from "../store/selectors";
import PlayersList from "../components/PlayersList";
import {startGame} from "../store/actions";
import Logo from "../components/Logo";
import dino from "../assets/images/GameDino.png";

const useStyles = makeStyles((theme) => ({
    fullBody: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    dino: {
        position: "absolute",
        width: "90%",
        left: "30%",
        top: -80
    }
}));


export default function Game() {
    const classes = useStyles();

    const allPlayers = useSelector(players);
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        if (allPlayers.length < 1) {
            history.push("/");
        }
    }, [allPlayers, history]);

    useEffect(() => {
        dispatch(startGame());
    }, [dispatch]);

    return <Grid container direction={"column"} alignItems={"stretch"} justify={"space-between"}
                 className={classes.fullBody} wrap={"nowrap"}>
        <Grid item container direction={"row"} alignItems={"center"} style={{padding: 16}}>
            <Grid item md={3}>
                <Box display={"flex"} justifyContent={"flex-start"}>
                    <Logo style={{height: 46, width: 'auto'}}/>
                </Box>
            </Grid>
            <Grid item md={9}>
                <PlayersList/>
            </Grid>
        </Grid>
        <Grid item style={{flex: 1, overflow: "hidden"}} container alignItems={"center"}>
            <Grid item sm={4} style={{padding: 42}}>
                <Cards/>
            </Grid>
            <Grid item sm={4} style={{padding: 28}}>
                <Circle/>
            </Grid>
            <Grid item sm={4} style={{padding: 42}}>
                <Jurassic/>
            </Grid>
        </Grid>
        <Grid item style={{flexShrink: 0}} container>
            <Grid item sm={8} style={{padding: 16}}>
                <InputComponent/>
            </Grid>
            <Grid item sm={4} style={{overflow: "visible", position: 'relative'}}>
                <img src={dino} className={classes.dino} alt={""}/>
            </Grid>
        </Grid>
    </Grid>
}
