import React, {useCallback, useState} from "react";
import {Box, makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {players} from "../store/selectors";
import {newPlayer} from "../store/reducers/players";


const useStyles = makeStyles((theme) => ({
    header: {
        fontFamily: theme.typography.fontFamily,
        fontSize: 24,
        color: 'white',
        background: 'black',
        borderRadius: "6px 6px 0 0",
        display: 'inline-block',
        padding: "12px 32px"
    },
    player: {
        display: 'inline-block',
        width: 275,
        border: "solid 6px black",
        padding: 12,
        boxSizing: 'border-box',
        position: "relative",
        fontFamily: theme.typography.fontFamily,
        fontSize: 32,
        marginTop: -6
    },
    input: {
        fontFamily: theme.typography.fontFamily,
        fontSize: 32,
        width: "100%",
        border: "none",
        outline: "none"
    },
    button: {
        width: 75,
        height: 75,
        fontFamily: theme.typography.fontFamily,
        fontSize: 58,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        left: "100%",
        top: -6,
        border: "solid 6px black",
        boxSizing: 'border-box',
        marginLeft: 12,
        color: 'black',
        cursor: "pointer",
        // paddingBottom: 10,
        opacity: 1,
        background: "#ffffff",
        transition: "all 0.1s",
        "&:hover": {
            background: "#F3F3F3"
        },
        "&:disabled": {
            cursor: "default",
            opacity: 0.2
        }
    }
}));

export default function PlayersCreationPanel() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const allPlayers = useSelector(players);

    const [name, setName] = useState("");

    const onInputChange = useCallback((e) => {
        setName(e.target.value);
    }, []);

    const onAddPlayer = useCallback(() => {
        dispatch(newPlayer(name));
        setName("");
    }, [dispatch, name]);

    const onKey = useCallback((e) => {
        if (e.key === "Enter") {
            onAddPlayer();
        }
    }, [onAddPlayer]);

    return <Box>
        <Box className={classes.header}>Players</Box><br/>
        {allPlayers.map((player, idx) => {
            return <><Box className={classes.player} key={idx}>
                {player.name}
            </Box><br/></>
        })}
        {allPlayers.length < 4 && <Box className={classes.player}>
            <input placeholder={"Enter your name"} className={classes.input} type={"text"} onKeyPress={onKey} value={name} onChange={onInputChange}/>
            <button className={classes.button} onClick={onAddPlayer} disabled={name.length < 1}>+</button>
        </Box>}
    </Box>
}
