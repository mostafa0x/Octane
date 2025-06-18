import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import '../global.css';

export default function Home() {
  return (
    <>
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <StatusBar style="auto" />
    </>
  );
}
