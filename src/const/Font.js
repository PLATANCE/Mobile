import React, { StyleSheet, PixelRatio } from 'react-native';
import Color from './Color';
import Const from './Const';

const Font = StyleSheet.create({
    DEFAULT_FONT_BLACK: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: Color.PRIMARY_BLACK,
    },
    DEFAULT_FONT_ORANGE: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: Color.PRIMARY_ORANGE,
    },
    DEFAULT_FONT_GRAY: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: Color.PRIMARY_GRAY,
    },
    DEFAULT_FONT_WHITE: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: 'white',
    },
    DEFAULT_FONT_RED: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: 'red',
    },
    DEFAULT_FONT_BLACK_BOLD: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: Color.PRIMARY_BLACK,
        fontWeight: 'bold',
    },
    DEFAULT_FONT_WHITE_BOLD: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: 'white',
        fontWeight: 'bold',
    },
    DEFAULT_FONT_ORANGE_BOLD: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: Color.PRIMARY_ORANGE,
        fontWeight: 'bold',
    },
    DEFAULT_FONT_BLACK_UNDERLINE: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: Color.PRIMARY_BLACK,
        textDecorationLine: 'underline',
    },
    DEFAULT_FONT_GRAY_UNDERLINE: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: Color.PRIMARY_GRAY,
        textDecorationLine: 'underline',
    },
    DEFAULT_FONT_ORANGE_UNDERLINE: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: Color.PRIMARY_ORANGE,
        textDecorationLine: 'underline',
    },
    DEFAULT_FONT_WHITE_UNDERLINE: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: 'white',
        textDecorationLine: 'underline',
    },
    DEFAULT_FONT_GRAY_LINETHROUGH: {
        fontSize: 14 * Const.DEVICE_RATIO,
        color: Color.PRIMARY_GRAY,
        textDecorationLine: 'line-through',
    },
});

module.exports = Font;