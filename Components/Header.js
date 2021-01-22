import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'

const Header = () => {
    return (
        <View>
            <Text style={ styles.encabezado }>Criptomonedas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS === 'ios' ? 45 : 12,
        textAlign: 'center',
        fontFamily: 'Lato-Black',
        backgroundColor: '#5E29E2',
        paddingBottom: 12,
        textTransform: 'uppercase',
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 25
    }
})

export default Header