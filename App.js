import React, { useState, useEffect} from 'react';
import { StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import Formulario from './Components/Formulario';
import Cotizacion from './Components/Cotizacion';
import Header from './Components/Header';
import axios from 'axios';

const App = () => {
    const [moneda, setMoneda] = useState('');
    const [criptoMoneda, setCriptoMoneda] = useState('');
    const [consultarApi, setConsultarApi] = useState(false);
    const [valorResultado, setValorResultado] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        const consultaApiValor = async () => {
            if( consultarApi ) {
                setCargando(true);
                
                const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
                
                setTimeout(() => {
                    axios.get(url)
                    .then(function (resultado) {
                            // console.log(resultado.data.DISPLAY[criptoMoneda][moneda]);
                            setValorResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
                            setConsultarApi(false);
                            setCargando(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert(error);
                    });
                }, 2000);
            }
        }

        consultaApiValor();
    }, [consultarApi]);

    const componente = cargando ? <ActivityIndicator size="large" color="#5E29E2" style={{ marginTop: 20 }} /> : <Cotizacion valorResultado={valorResultado} />

    return (
        <>
            <ScrollView>
                <Header />

                <Image
                    source={ require('./assets/img/cryptomonedas.png') }
                    style={ styles.image }
                />

                <Formulario moneda={moneda} setMoneda={setMoneda} criptoMoneda={criptoMoneda} setCriptoMoneda={setCriptoMoneda} setConsultarApi={setConsultarApi} />

                { componente }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150,
    }
})

export default App