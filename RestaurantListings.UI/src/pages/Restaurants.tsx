import React, { useCallback, useEffect, useState } from "react";

import { getRestaurants } from "../api/restaurants";
//import { Container } from "../components/Container";
import { RestaurantList } from "../components/RestaurantList";
import {
    RestaurantFilters,
    RestaurantFiltersState,
} from "../components/RestaurantFilters";
import { Restaurant } from "../interfaces/restaurant";
import { Container, CssBaseline, Grid } from "@material-ui/core";

export function Restaurants() {
    const [tags, setTags] = useState<string[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        async function fetchRestaurants() {
            const data = await getRestaurants();
            setRestaurants(data);
            setTags(data.flatMap((x) => x.tags));
        }

        fetchRestaurants();
    }, []);

    const handleFiltersChange = useCallback((value: RestaurantFiltersState) => {
        setRestaurants((nextRestaurants) => {
            if (value.tags.length) {
                value.tags.forEach((tag) => {
                    nextRestaurants = nextRestaurants.filter((r) => r.tags.includes(tag));
                });
            }

            if (value.isFamilyFriendly) {
                nextRestaurants = nextRestaurants.filter((r) => r.familyFriendly);
            }

            if (value.isVeganFriendly) {
                nextRestaurants = nextRestaurants.filter((r) => r.veganFriendly);
            }

            return nextRestaurants;
        });
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container >
                <Grid container item xs={12}>
                <Grid item xs={4} sm={3}>
                    <RestaurantFilters tags={tags} onChange={handleFiltersChange} />
                </Grid>
                <Grid container item xs={8} sm={9}>
                    <RestaurantList restaurants={restaurants} />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}
