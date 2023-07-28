import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerView } from '../../components';
import { dataFilm } from '../../constants/Api';
import { GlobalColors, GlobalFontSizes, kDefaultPadding } from '../../constants/Styles';
import textStyles from '../../constants/TextStyles';

const ItemList = ({ data, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={textStyles.textBold15}>{data.Title} <Text style={{ ...textStyles.textBold12, color: GlobalColors.DANGER }}>({data.Year})</Text></Text>
            <View style={styles.viewData}>
                <Text style={{ ...textStyles.textMd12, color: GlobalColors.INFO }}>{data.Genre}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="star" size={GlobalFontSizes[24]} color={GlobalColors.WARNING} />
                    <Text style={{...textStyles.textBold13, marginLeft: 5}}>{data.imdbRating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}

export default function ListDataComponent() {
    const _onPressList = (data) => {
        console.warn(data.Title + ' Has Selected')
    }

    return (
        <ContainerView>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: kDefaultPadding }}>
                {dataFilm.map((data, index) => {
                    return <ItemList key={'pp' + index} data={data} onPress={() => _onPressList(data)} />
                })}
            </ScrollView>
        </ContainerView>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalColors.LIGHT,
        padding: 10,
        marginBottom: 10,
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.24,
        shadowRadius: 4,
        borderRadius: 8
    },
    viewData: {
        flexDirection: 'row',
        // marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})