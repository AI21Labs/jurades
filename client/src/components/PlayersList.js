import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import {useSelector} from "react-redux";
import {curPlayer, players} from "../store/selectors";
import { alpha } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    player: {
        width: 275,
        border: "solid 5px black",
        padding: 12,
        boxSizing: 'border-box',
        position: "relative",
        fontFamily: theme.typography.fontFamily,
        fontSize: 32,
        marginLeft: -6,
        background: "white",
        transition: "all 0.1s"
    },
    selected: {
        background: alpha(theme.palette.primary.main, 0.21)
    }
}));

export default function PlayersList() {
    const classes = useStyles();
    const allPlayers = useSelector(players);
    const currentPlayer = useSelector(curPlayer);

    return <Grid container justify={"flex-end"} wrap={"nowrap"}>{allPlayers.map((player, idx) => {
            return <Grid container item  justify={"space-between"} className={classes.player + " " + (idx === currentPlayer ? classes.selected : "")} key={idx}>
                <Grid item>{player.name}</Grid>
                <Grid item><b>{player.score}</b></Grid>
            </Grid>
        })}
    </Grid>
}
