import React from "react";
import { Animated, Easing, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from "react-navigation-redux-helpers";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { AppIcon, AppStyles } from "../AppStyles";
import { Configuration } from "../Configuration";
import DrawerContainer from "../components/DrawerContainer";
import AddProductScreen from "../screens/AddProductScreen";
import SearchProductScreen from "../screens/SearchProductScreen";
import ViewAddedProductScreen from "../screens/ViewAddedProduct";
import Icon from "react-native-vector-icons/FontAwesome";


const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

const middleware = createReactNavigationReduxMiddleware(
  state => state.nav
);

// login stack
const LoginStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Welcome: { screen: WelcomeScreen }
  },
  {
    initialRouteName: "Welcome",
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    AddProduct: {screen: AddProductScreen}  },
  {
    initialRouteName: "Home",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
        Home: {
          screen: HomeStack,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name= "home" size={25} color={tintColor} />
            )
          }
        },

        Search: {
          screen: SearchProductScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name="search" size={25} color={tintColor} />
            )
          }
        },
        Profile: {
          screen: ViewAddedProductScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name="user" size={25} color={tintColor} />
            )
          }
        },
      },
      {
        initialRouteName: 'Home',
        tabBarOptions: {
          activeTintColor: '#334EFF'
        }
      }
);

// drawer stack
const DrawerStack = createDrawerNavigator(
  {
    Tab: TabNavigator
  },
  {
    drawerPosition: "left",
    initialRouteName: "Tab",
    drawerWidth: 200,
    contentComponent: DrawerContainer
  }
);

// Manifest of possible screens
const RootNavigator = createStackNavigator(
  {
    LoginStack: { screen: LoginStack },
    DrawerStack: { screen: DrawerStack }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "DrawerStack",
    transitionConfig: noTransitionConfig,
    navigationOptions: ({ navigation }) => ({
      color: "black"
    })
  }
);

const AppWithNavigationState = createReduxContainer(RootNavigator, "root");

const mapStateToProps = state => ({
  state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "black",
    flex: 1,
  }
});

export { RootNavigator, AppNavigator, middleware };
