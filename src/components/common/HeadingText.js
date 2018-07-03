import React from 'react';
import { Text, View } from 'react-native';

const HeadingText = (props) => {
	const { textStyle, viewStyle } = styles;

	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{props.title}</Text>
		</View>
	);
};


const styles = {
	viewStyle: {
		borderBottomWidth: 1,
		padding: 5,
		backgroundColor: '#fff',
		flexDirection: 'row',
		borderColor: '#ddd',
		position: 'relative',
		justifyContent: 'center',
	},
	textStyle: {
		fontSize: 24
	},
};

export { HeadingText };
