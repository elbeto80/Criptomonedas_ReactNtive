import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({ moneda, setMoneda, criptoMoneda, setCriptoMoneda, setConsultarApi }) => {
    const [listaCriptoMonedas, setListaCriptoMonedas] = useState([]);

    useEffect(() => {
        const consultarApiCrypto = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            await axios.get(url)
            .then(function (resultado) {
                // console.log(resultado.data.Data);
                setListaCriptoMonedas(resultado.data.Data);
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
        }
        consultarApiCrypto();
    }, []);

    const contizarValor = async () => {
        const validacion = await validarCampos();

        if( !validacion ) {
            Alert.alert(
                'Error', // Titulo de la alerta,
                'Ambos campos son obligatorios', // mensaje de alerta
                [
                    { text: 'Aceptar'} // Arreglo de botones
                ]
            );
            return false;
        }

        setConsultarApi(true);
    }

    const validarCampos = async () => {
        const validacion = true;
        if( moneda === '' || criptoMoneda === '' ) {
            return false
        }
        return validacion;
    }

    return (
        <View style={ styles.contenido }>
            <Text style={ styles.label } >Moneda</Text>
            <Picker
                selectedValue={ moneda }
                onValueChange={ moneda => setMoneda(moneda) }
                itemStyle={{ height: 100 }}
            >
                <Picker.Item label='- Seleccionar -' value='' />
                <Picker.Item label='Peso Colombiano' value='COP' />
                <Picker.Item label='Dolar USA' value='USD' />
                <Picker.Item label='Peso Mexicano' value='MXN' />
                <Picker.Item label='Euro' value='EUR' />
                <Picker.Item label='Libra esterlina' value='GBP' />
            </Picker>

            <Text style={ styles.label } >Criptomoneda</Text>
            <Picker
                selectedValue={ criptoMoneda }
                onValueChange={ criptoMoneda => setCriptoMoneda(criptoMoneda) }
                itemStyle={{ height: 100 }}
            >
                <Picker.Item label='- Seleccionar -' value='' />
                {
                    listaCriptoMonedas.map( info => (
                        <Picker.Item label={info.CoinInfo.FullName} value={info.CoinInfo.Name} key={info.CoinInfo.Id} />
                    ))
                }
            </Picker>

            <TouchableHighlight
                style={ styles.btnContizar }
                onPress={ () => contizarValor() }
            >
                <Text style={ styles.txtContizar }>Contizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 20,
        marginVertical: 12,
    },
    contenido: {
        marginHorizontal: '2.5%'
    },
    btnContizar: {
        backgroundColor: '#5E29E2',
        marginTop:30,
        padding: 10
    },
    txtContizar: {
        color: '#FFFFFF',
        fontFamily: 'Lato-Black',
        textAlign: 'center',
        fontSize: 15,
        textTransform: 'uppercase'
    }
})

export default Formulario