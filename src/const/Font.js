import React, { StyleSheet, PixelRatio, Dimensions } from 'react-native';
import Color from './Color';
import Const from './Const';
const scale = Dimensions.get('window').width / 375;

export function normalize(size: number): number {
  return Math.round(scale * size);
}

export const Font = StyleSheet.create({
    DEFAULT_FONT_BLACK: {
        fontSize: normalize(14),
        color: Color.PRIMARY_BLACK,
    },
    DEFAULT_FONT_ORANGE: {
        fontSize: normalize(14),
        color: Color.PRIMARY_ORANGE,
    },
    DEFAULT_FONT_GRAY: {
        fontSize: normalize(14),
        color: Color.PRIMARY_GRAY,
    },
    DEFAULT_FONT_WHITE: {
        fontSize: normalize(14),
        color: 'white',
    },
    DEFAULT_FONT_RED: {
        fontSize: normalize(14),
        color: 'red',
    },
    DEFAULT_FONT_BLACK_BOLD: {
        fontSize: normalize(14),
        color: Color.PRIMARY_BLACK,
        fontWeight: 'bold',
    },
    DEFAULT_FONT_WHITE_BOLD: {
        fontSize: normalize(14),
        color: 'white',
        fontWeight: 'bold',
    },
    DEFAULT_FONT_ORANGE_BOLD: {
        fontSize: normalize(14),
        color: Color.PRIMARY_ORANGE,
        fontWeight: 'bold',
    },
    DEFAULT_FONT_BLACK_UNDERLINE: {
        fontSize: normalize(14),
        color: Color.PRIMARY_BLACK,
        textDecorationLine: 'underline',
    },
    DEFAULT_FONT_GRAY_UNDERLINE: {
        fontSize: normalize(14),
        color: Color.PRIMARY_GRAY,
        textDecorationLine: 'underline',
    },
    DEFAULT_FONT_ORANGE_UNDERLINE: {
        fontSize: normalize(14),
        color: Color.PRIMARY_ORANGE,
        textDecorationLine: 'underline',
    },
    DEFAULT_FONT_WHITE_UNDERLINE: {
        fontSize: normalize(14),
        color: 'white',
        textDecorationLine: 'underline',
    },
    DEFAULT_FONT_GRAY_LINETHROUGH: {
        fontSize: normalize(14),
        color: Color.PRIMARY_GRAY,
        textDecorationLine: 'line-through',
    },
    CARD_REGIST_FONT_BLACK: {
        fontSize: normalize(16),
        color: Color.PRIMARY_BLACK,
        fontWeight: 'bold',
    },
});