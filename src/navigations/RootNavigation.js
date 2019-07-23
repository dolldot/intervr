import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import Loading from '../screens/Loading/Loading';
import Register from '../screens/Register/Register';
import Question from '../screens/Question';
import Welcome from '../screens/Welcome/Welcome';
import Finish from '../screens/Question/Finish';

const Initial = createStackNavigator({
  Loading: {
    screen: Loading,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

const App = createStackNavigator(
  {
    Register,
    Loading,
    Welcome,
    Question,
    Finish
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
      Initial: Initial,
      App: App
    },
    {
      initialRouteName: 'Initial',
      resetOnBlur: true
    }
  )
);

export default RootNavigation;
