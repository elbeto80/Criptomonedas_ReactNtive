import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Cotizacion = ({valorResultado}) => {
    if( Object.keys(valorResultado).length === 0 ) {
        return false;
    }

    return (
        <View style={ styles.resultado }>
            <Text style={ styles.precio }>
                <Text style={ styles.span }> { valorResultado.PRICE } </Text>
            </Text>

            <Text style={ styles.texto }> Precio más alto del día: {' '}
                <Text style={ styles.span }> { valorResultado.HIGHDAY } </Text>
            </Text>

            <Text style={ styles.texto }> Precio más bajo del día: {' '}
                <Text style={ styles.span }> { valorResultado.LOWDAY } </Text>
            </Text>

            <Text style={ styles.texto }> Variación últimas 24H: {' '}
                <Text style={ styles.span }> { valorResultado.CHANGEPCT24HOUR } % </Text>
            </Text>
            <Text style={ styles.texto }> Ultima actualización: {' '}
                <Text style={ styles.span }> { valorResultado.LASTUPDATE } </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    resultado: {
        backgroundColor: '#5E29E2',
        padding: 20,
        marginTop: 20
    },
    texto: {
        color: '#FFFFFF',
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        marginBottom: 5
    },
    span: {
        fontFamily: 'Lato-Black'
    },
    precio: {
        fontSize:24,
        color: '#FFFFFF',
        marginBottom: 5
    }
})

export default Cotizacion