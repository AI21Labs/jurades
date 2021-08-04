import React from "react";
import {useSelector} from "react-redux";
import {Button, Typography, makeStyles, useTheme, Grid, Box} from "@material-ui/core";
import homepageDino from "../assets/images/HomepageDino.png";
import {Link as RouterLink} from 'react-router-dom';
import {players} from "../store/selectors";
import Logo from "../components/Logo";
import PlayersCreationPanel from "../components/PlayersCreationPanel";

const useStyles = makeStyles((theme) => ({
    fullBody: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    startButton: {
        position: 'absolute',
        bottom: 40,
        right: 40
    }
}));

export default function Welcome() {
    const theme = useTheme();
    const classes = useStyles(theme);
    const allPlayers = useSelector(players);

    return <Grid container direction={"row"} className={classes.fullBody} alignItems={"stretch"}>
        <Grid item md={5} style={{overflow: 'hidden'}} container alignItems={"flex-end"} justify={"flex-end"}>
            <Grid item><img src={homepageDino} style={{marginBottom: -35}} width={809}/></Grid>
        </Grid>
        <Grid item md={7} style={{padding: "0 16px", position: "relative"}}>
            <Box marginTop={7}/>
            <Logo/>
            <Box marginTop={5}/>
            <Typography variant={"h3"}>Online AI Charades game</Typography>
            <Typography variant={"h4"}><i>Powered by AI21Labs Jurassic Language Model</i></Typography>
            <Box marginTop={8}/>
            <PlayersCreationPanel/>
            <Button className={classes.startButton} disableElevation component={RouterLink} to={"/game"} size={"large"} variant={"contained"}
                    color={"primary"} disabled={allPlayers.length < 1}>START GAME</Button>
        </Grid>
    </Grid>
}
