import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Link as RouterLink} from 'react-router-dom';
import {players} from "../store/selectors";
import {makeStyles, useTheme} from "@material-ui/core";
import {Grid,Typography, Button, Box} from "@material-ui/core";
import Confetti from 'react-confetti'
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    fullBody: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    bar: {
        border: "solid 8px black",
        borderBottom: 'none',
        background: theme.palette.primary.main,
        flex: 1,
        margin: "0 -4px",
        paddingTop: 12
    }
}));

export default function Done() {
    const theme = useTheme();
    const classes = useStyles(theme);
    const history = useHistory();

    const allPlayers = useSelector(players);
    useEffect(() => {
        if (allPlayers.length < 1) {
            history.push("/");
        }
    }, [allPlayers, history]);

    const sorted = allPlayers.slice().sort((a, b) => {return b.score - a.score});

    return <Grid container direction={"column"} justifyContent={"space-between"} alignItems={"center"} className={classes.fullBody}>
        <Grid item>
            <Box textAlign={"center"} padding={"120px 0"}>
            <Typography variant={"h3"} align={"center"}>We have a winner!</Typography>
            <br/>
            <Button component={RouterLink} to={"/"}  size={"large"} variant={"text"} color={"primary"}>START OVER</Button>
            </Box>
        </Grid>
        <Grid container item style={{flex: 1}} direction={"row"} justifyContent={"center"} alignItems={"stretch"}>
            <Grid sm={3} item container direction={"column"} alignItems={"stretch"}>
                <Box marginTop={16}/>
                <Typography variant={"h2"} align={"center"}>{sorted[2]?.name || '-'}</Typography>
                <Box className={classes.bar} style={{background: "#09893C"}}>
                    <Typography variant={"h2"} align={"center"} style={{color: "white"}}>{sorted[2]?.score}</Typography>
                </Box>
            </Grid>
            <Grid sm={3} item container direction={"column"} alignItems={"stretch"}>
                <Typography variant={"h2"} align={"center"}>{sorted[0]?.name}</Typography>
                <Box className={classes.bar}>
                    <Typography variant={"h2"} align={"center"} style={{color: "white"}}>{sorted[0]?.score}</Typography>
                </Box>
            </Grid>
            <Grid sm={3} item container direction={"column"} alignItems={"stretch"}>
                <Box marginTop={8}/>
                <Typography variant={"h2"} align={"center"}>{sorted[1]?.name || "-"}</Typography>
                <Box className={classes.bar}  style={{background: "#0EB04F"}}>
                    <Typography variant={"h2"} align={"center"} style={{color: "white"}}>{sorted[1]?.score}</Typography>
                </Box>
            </Grid>

        </Grid>
        <Box zIndex={-1}><Confetti confettiSource={{x: (window.innerWidth / 2) - 100, y: (window.innerHeight / 2) + 200, w: 200}}
                    initialVelocityY={18} opacity={0.6} colors={["#14D160", "#aaaaaa", "#09893C", "#FFF7DB", "#BEFF98", "#FF98B7"]}/></Box>
    </Grid>
}
