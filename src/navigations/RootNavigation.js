import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import Loading from '../screens/Loading/Loading';
import Register from '../screens/Register/Register';
import Question from '../screens/Question/Question';
import Show from '../screens/Question/Show';
import Welcome from '../screens/Welcome/Welcome';

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
    Welcome: {
      screen: Welcome,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Register: {
      screen: Register,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Question: {
      screen: Question,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Show: {
      screen: Show
    }
  },
  {
    initialRouteName: 'Register'
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
