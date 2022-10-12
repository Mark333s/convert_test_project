import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Header} from "../HeaderComponent/Header";
import {Block} from '../BlockFields/Blocks';
import '../../../src/index.scss'

export const Converting = () => {
    const [fromCurrency, setFromCurrency] = useState('UAH')
    const [toCurrency, setToCurrency] = useState('USD')
    const [fromPrice, setFromPrice] = useState(0)
    const [toPrice, setToPrice] = useState(0)

    const countsRef = useRef({})

    useEffect(() => {
        fetch('https://v6.exchangerate-api.com/v6/2857749dfecf23aa3c2a4261/latest/USD')
            .then((res) => res.json())
            .then((response) => {
                countsRef.current = response.conversion_rates;
            }).catch(err => {
            console.log(err)
            alert('something went wrong')
        })
    },[])

    useEffect(() => {
        onChangeFromPrice(fromPrice)
    }, [fromPrice, fromCurrency])

    useEffect(() => {
        onChangeToPrice(toPrice)
    }, [toPrice, toCurrency])

    const onChangeToPrice = (value) => {
        const result = (countsRef.current[fromCurrency] / countsRef.current[toCurrency]) * value;
        setFromPrice((Math.round(parseFloat(result) * 100) / 100))
        setToPrice(value)
    }
    
    const onChangeFromPrice = (value) => {
        const price = value / countsRef.current[fromCurrency]
        const result = price * countsRef.current[toCurrency]
        setFromPrice(value)
        setToPrice(result)
    }


    return (
        <div>
            <Header toPrice={toPrice} fromPrice={fromPrice} />
            <div className="App">
                <Block value={fromPrice}
                       currency={fromCurrency}
                       onChangeCurrency={setFromCurrency}
                       onChangeValue={onChangeFromPrice}
                />
                <Block value={toPrice}
                       currency={toCurrency}
                       onChangeCurrency={setToCurrency}
                       onChangeValue={onChangeToPrice}
                />
            </div>
        </div>
    );
}