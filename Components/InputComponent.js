import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Animated,
    Dimensions,
    Keyboard,
    Image,
    View,
    ViewPropTypes
} from 'react-native';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const containerHeight = 40;

export default class InputComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            expanded: false,
        };
        const { width } = Dimensions.get('window');
        this.contentWidth = width;
        this.middleWidth = width / 2;
        this.cancelButtonWidth = this.props.cancelButtonWidth || 70;
        this.inputFocusWidthAnimated = new Animated.Value(this.contentWidth - 10);
        this.inputFocusPlaceholderAnimated = new Animated.Value(
            this.middleWidth - this.props.placeholderCollapsedMargin
        );
        this.shadowHeight = this.props.shadowOffsetHeightCollapsed;

    }

    componentDidMount() {
     }


    render() {
        const styles= getStyles(this.props.inputHeight)
        return (
            <Animated.View ref="inputContainer"
                style={[ styles.container,
                     this.props.backgroundColor && {backgroundColor: this.props.backgroundColor},
                    this.props.inputBorderRadius && {
                        borderRadius: this.props.inputBorderRadius
                    }
                ]}
            >
                <AnimatedTextInput ref="input_keyword" style={[
                    styles.input,
                    this.props.placeholderTextColor && {
                        color: this.props.placeholderTextColor
                    },
                    this.props.inputStyle && this.props.inputStyle,
                    this.props.inputHeight && { height: this.props.inputHeight },
                    this.props.inputBorderRadius && {
                        borderRadius: this.props.inputBorderRadius
                    },
                    {
                        width: this.inputFocusWidthAnimated,
                        paddingLeft: this.inputFocusPlaceholderAnimated
                    },
                    this.props.shadowVisible && {
                        shadowOffset: {
                            width: this.props.shadowOffsetWidth,
                            height: this.shadowHeight
                        },
                        shadowColor: this.props.shadowColor,
                        shadowOpacity: this.shadowOpacityAnimated,
                        shadowRadius: this.props.shadowRadius
                    }
                ]}

                                   value={this.state.keyword}
                                   onChangeText={this.onChangeText}
                                   onSubmitEditing={this.onSearch}
                                   autoCorrect={false}
                                   autoCapitalize={this.props.autoCapitalize}
                                   onFocus={this.onFocus}
                                   returnKeyType={this.props.returnKeyType || 'search'}
                                   keyboardType={this.props.keyboardType || 'default'}
                                   blurOnSubmit={this.props.blurOnSubmit}
                                   selectionColor={this.props.selectionColor}
                                   placeholder={this.props.placeholder || 'Search'}
                                   placeholderTextColor={this.props.placeholderTextColor || styles.placeholderColor}
                                   underlineColorAndroid="transparent"
                                   editable={this.props.editable}


                />

            </Animated.View>
        );
    }

}
const getStyles = (inputHeight) => {
    if(typeof(inputHeight) =='number'){alert('number')}
    let middleHeight = 20
    if (typeof inputHeight == 'number')
        middleHeight = (10 + inputHeight) / 2;

    return {
        container: {
            backgroundColor: '#667185',
            height: containerHeight,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 0,
            margin:0,
            borderRadius: 5,
        },
        input: {
            height: containerHeight ,
            paddingTop: 1,
            paddingBottom: 1,
            // paddingRight: 15,
            borderColor: '#444',
            backgroundColor: '#f7f7f7',
            borderRadius: 5,
            fontSize: 18
        },
    };

}
InputComponent.propTypes={
    /**
     * styles
     */
    // 组件的背景颜色
    backgroundColor: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    inputStyle: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
        ViewPropTypes.style,
        Text.propTypes.style
    ]),

    // 组件的高
    inputHeight: PropTypes.number,
    placeholder:PropTypes.string,
    returnKeyType: PropTypes.string,
    keyboardType: PropTypes.string,
    autoCapitalize: PropTypes.string,
    inputBorderRadius: PropTypes.number,
    contentWidth: PropTypes.number,
    middleWidth: PropTypes.number,
    editable: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    keyboardShouldPersist: PropTypes.bool,
    useClearButton: PropTypes.bool,

    shadowOffsetHeightCollapsed: PropTypes.number,

    /**
     * onChangeText
     * return a Promise
     */
    onChangeText: PropTypes.func,
}

InputComponent.defaultProps = {
    editable: true,
    blurOnSubmit: true,
    keyboardShouldPersist: false,
    shadowOffsetHeightCollapsed: 2,
    useClearButton: true,
};