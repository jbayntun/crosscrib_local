import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import StartScreen from './src/screens/StartScreen';
import LocalScreen from './src/screens/LocalScreen';

const navigator = createStackNavigator({
        Start: StartScreen,
        Local: LocalScreen
    }, {
        initialRouteName: 'Start',
        defaultNavigationOptions: {
            title: 'Cross Crib',
    }
});

export default createAppContainer(navigator);