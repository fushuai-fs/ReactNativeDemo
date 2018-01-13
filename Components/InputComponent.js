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

    }

    componentDidMount() {
     }


    render() {
        const styles= getStyles(this.props.inputHeight)
        return (
            <Animated.View ref="inputContainer"
                style={[ styles.container,
                     this.props.backgroundColor && {backgroundColor: this.props.backgroundColor}
                ]}
            >
                <AnimatedTextInput ref="input_keyword" style={[
                    styles.input,
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
            padding: 0,margin:0
        },
        input: {
            height: containerHeight ,
            paddingTop: 1,
            paddingBottom: 1,
            // paddingRight: 15,
            borderColor: '#444',
            backgroundColor: '#f7f7f7',
            borderRadius: 5,
            fontSize: 24
        },
    };

}
InputComponent.propTypes={
    // 组件的高
    inputHeight: PropTypes.number,
    // 组件的背景颜色
    backgroundColor: PropTypes.string,
    placeholder:PropTypes.string,
}

