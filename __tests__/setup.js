// Mock global fetch
global.fetch = jest.fn();

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => {
  const mockStorage = {
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
  };
  return {
    createMMKV: jest.fn(() => mockStorage),
    storage: mockStorage,
  };
});

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

// Mock @d11/react-native-fast-image
jest.mock('@d11/react-native-fast-image', () => {
  const React = require('react');
  const { View } = require('react-native');
  const FastImageMock = (props) => {
    return React.createElement(View, props);
  };
  FastImageMock.displayName = 'FastImage';
  FastImageMock.priority = {
    low: 'low',
    normal: 'normal',
    high: 'high',
  };
  FastImageMock.cacheControl = {
    immutable: 'immutable',
    web: 'web',
    cacheOnly: 'cacheOnly',
  };
  FastImageMock.resizeMode = {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
  };
  return FastImageMock;
});

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    createStaticNavigation: jest.fn((Stack) => {
      const NavigationMock = ({ children }) => {
        return React.createElement(React.Fragment, null, children);
      };
      return NavigationMock;
    }),
    StaticParamList: {},
  };
});

// Mock @react-navigation/native-stack
jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: jest.fn(() => ({
      Navigator: ({ children }) => children,
      Screen: () => null,
    })),
  };
});
