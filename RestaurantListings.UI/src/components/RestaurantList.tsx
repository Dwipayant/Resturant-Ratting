import { makeStyles, Paper } from "@material-ui/core";
import React from "react";

import { Restaurant } from "../interfaces/restaurant";
import { RestaurantItem } from "./RestaurantItem";

export interface RestaurantListProps {
    restaurants?: Restaurant[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));

export function RestaurantList(props: RestaurantListProps) {
    const { restaurants = [] } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                restaurants.map((restaurant) => {
                    <Paper elevation={5}>
                        <RestaurantItem restaurant={restaurant} />
                    <Paper>
             })
             }
        </div>
    );
}
