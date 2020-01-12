import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import InitialScreen from '../screens/Initial';
import RegisterScreen from '../screens/Register';
import QuestionScreen from '../screens/Question';
import WelcomeScreen from '../screens/Welcome';
import FinishScreen from '../screens/Finish';

const Initial = createStackNavigator({
  Initial: {
    screen: InitialScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

const App = createStackNavigator(
  {
    Register: RegisterScreen,
    Welcome: WelcomeScreen,
    Question: QuestionScreen,
    Finish: FinishScreen
  },
  {
    initialRouteName: 'Register',
    defaultNavigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

const RootNavigation = createAppContainer(
  createSwitchNavigator(
    {
      Initial,
      App
    },
    {
      initialRouteName: 'Initial',
      resetOnBlur: true
    }
  )
);

export default RootNavigation;
