// /**
//  * Learn more about deep linking with React Navigation
//  * https://reactnavigation.org/docs/deep-linking
//  * https://reactnavigation.org/docs/configuring-links
//  */
//
// import { LinkingOptions } from '@react-navigation/native';
// import * as Linking from 'expo-linking';
// import {HomeBottomTabParamList} from "./ScreenParams";
//
//
// const linking: LinkingOptions<HomeBottomTabParamList> = {
//   prefixes: [Linking.createURL('/')],
//   config: {
//     screens: {
//       Root: {
//         screens: {
//           TabOne: {
//             screens: {
//               TabOneScreen: 'HomeScreen',
//             },
//           },
//           TabTwo: {
//             screens: {
//               TabTwoScreen: 'NotFound',
//             },
//           },
//         },
//       },
//       Modal: 'modal',
//       NotFound: '*',
//     },
//   },
// };
//
// export default linking;
