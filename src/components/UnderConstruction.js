import { Image } from 'react-native'
import React from 'react'
import { ContainerView } from './'
import { GlobalImages } from '../constants/Images'

const UnderConstruction = () => {
    return (
        <ContainerView style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image 
                source={GlobalImages.IMG_UNDERCONSTRUCTION} 
                style={{ width: '70%', height: '50%' }} 
                resizeMode='contain' 
            />
        </ContainerView>
    )
}

export default UnderConstruction