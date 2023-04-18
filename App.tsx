import {
  ConnectWallet,
  metamaskWallet,
  rainbowWallet,
  ThirdwebProvider,
} from '@thirdweb-dev/react-native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BuyCoffee from './BuyCoffee';
import { trustWallet, TrustWallet } from '@thirdweb-dev/react-native/dist/evm/wallets/wallets/trust-wallet';
import RecentMessages from './RecentMessages';

const App = () => {
  return (
    <ThirdwebProvider
      activeChain="goerli"
      supportedWallets={[metamaskWallet()]}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyles = {
    color: isDarkMode ? Colors.white : Colors.black,
    ...styles.heading,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.view}>
        <ConnectWallet />
        <BuyCoffee/>
      </View>
      <View style={styles.view}>
        <RecentMessages/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
