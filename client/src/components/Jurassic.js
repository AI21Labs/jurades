import React, {useEffect} from "react";
import {Box, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {curCard, curGuess, isFetching} from "../store/selectors";
import {correct, wrong} from "../store/actions";
import clsx from 'clsx';
import Tip from "./Tip";
import {compare} from "../utils/stringMatching";


const useStyles = makeStyles((theme) => ({
    guessBox: {
        width: "100%",
        paddingTop: "50%",
        background: 'white',
        border: 'solid 9px black',
        boxShadow: "16px 16px 0 #E8E8E8",
        boxSizing: "border-box",
        position: "relative"
    },
    wrong: {
        border: 'solid 9px red'
    },
    correct: {
        border: 'solid 9px green'
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
    tip: {
        position: "absolute",
        top: "100%",
        left: 30,
        marginTop: 40
    }
}));

export default function Jurassic() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(isFetching);
    const guess = useSelector(curGuess);
    const currentCard = useSelector(curCard);

    useEffect(() => {
        // used for animation
        if (guess) {
            if (compare(currentCard, guess)) {
                setTimeout(() => {
                    dispatch(correct());
                }, 1000);
            } else {
                dispatch(wrong());
            }
        }
    }, [guess, currentCard, dispatch]);

    const isMatch = guess !== null && compare(currentCard, guess);

    return <>{(loading || guess) && <Box className={clsx({
            [classes.guessBox]: true,
            [classes.wrong]: guess !== null && isMatch,
            [classes.correct]: guess !== null && isMatch,
        })}>
        <Box className={classes.text}>
            <Typography variant={"h2"}>
                {loading ? ". . ." : ""}
                {guess && <>Is it <b>{guess}</b>...?</>}
            </Typography>
        </Box>
        <div className={classes.tip}>
            <Tip/>
        </div>
    </Box>}</>
}
