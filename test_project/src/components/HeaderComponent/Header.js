import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header = () => {

    const [fromPriceUahWithUsd, setFromPriceUahWithUsd] = useState(0)
    const [fromPriceUahWithEur, setFromPriceUahWithEur] = useState(0)
    const [fromPriceUahWithGpb, setFromPriceUahWithGpb] = useState(0)

    const [priceUsd, setPriceUsd] = useState(1)
    const [priceEur, setPriceEur] = useState(1)
    const [priceGbp, setPriceGbp] = useState(1)

    useEffect(() => {
        fetch('https://v6.exchangerate-api.com/v6/2857749dfecf23aa3c2a4261/latest/USD')
            .then((res) => res.json())
            .then((response) => {
                setFromPriceUahWithUsd(response.conversion_rates.UAH);
            }).catch(err => {
                alert('something went wrong ')
            })
    }, [])

    useEffect(() => {
        fetch('https://v6.exchangerate-api.com/v6/2857749dfecf23aa3c2a4261/latest/EUR')
            .then((res) => res.json())
            .then((response) => {
                setFromPriceUahWithEur(response.conversion_rates.UAH);
            }).catch(err => {
                alert('something went wrong ')
            })
    }, [])

    useEffect(() => {
        fetch('https://v6.exchangerate-api.com/v6/2857749dfecf23aa3c2a4261/latest/GBP')
            .then((res) => res.json())
            .then((response) => {
                setFromPriceUahWithGpb(response.conversion_rates.UAH);
            }).catch(err => {
                alert('something went wrong ')
            })
    }, [])

    return (
        <AppBar style={{ background: '#ffff32' }}>
            <Toolbar>
                <Typography variant="h6"
                    component="div" sx={{ flexGrow: 12 , color: '#000000' }}>
                    Exchange rate
                </Typography>
                <Typography variant="h6"
                    component="div" sx={{ flexGrow: 25 , color: '#000000' }}>
                    {priceEur}€ = {fromPriceUahWithEur.toFixed(3)}UAH
                </Typography>
                <Typography variant="h6"
                    component="div" sx={{ flexGrow: 30, color: '#000000' }}>
                    {priceUsd}$ = {fromPriceUahWithUsd.toFixed(3)}UAH
                </Typography>
                <Typography variant="h6"
                    component="div" sx={{ flexGrow: 30, color: '#000000' }}>
                    {priceGbp}£ = {fromPriceUahWithGpb.toFixed(3)}UAH
                </Typography>
            </Toolbar>
        </AppBar>
    );
}