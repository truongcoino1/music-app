import React, {FunctionComponent, useEffect, useRef} from 'react';
import { Button, SafeAreaView, StyleSheet} from 'react-native';

import Video from 'react-native-video';
import MusicControl, {Command} from 'react-native-music-control';

const App: FunctionComponent = () => {
  const [audio, setAudio] = React.useState(
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  );
  const [pause, setPause] = React.useState(true);
  // const ref = useRef(null);
  // useEffect(() => {

  //   AppState.addEventListener('change', state => {
  //     if (state !== 'active') {
  //       MusicControl.resetNowPlaying();
  //     }
  //   });
  // }, []);

  const service = () => {
    MusicControl.setNowPlaying({
      title: 'Billie Jean',
      artwork: 'https://i.imgur.com/e1cpwdo.png', // URL or RN's image require()
      artist: 'Michael Jackson',
      album: 'Thriller',
      genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
      duration: 294, // (Seconds)
      description: '', // Android Only
      color: 0xffffff, // Android Only - Notification Color
      colorized: true, // Android 8+ Only - Notification Color extracted from the artwork. Set to false to use the color property instead
      date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
      rating: 84, // Android Only (Boolean or Number depending on the type)
      notificationIcon: 'my_custom_icon', // Android Only (String), Android Drawable resource name for a custom notification icon
      isLiveStream: true, // iOS Only (Boolean), Show or hide Live Indicator instead of seekbar on lock screen for live streams. Default value is false.
    });
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', false);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', false);
    MusicControl.enableBackgroundMode(true);
    MusicControl.setNotificationId(1, 'index');
    // on iOS, pause playback during audio interruptions (incoming calls) and resume afterwards.
    // As of {{ INSERT NEXT VERSION HERE}} works for android aswell.
    MusicControl.handleAudioInterruptions(false);
    MusicControl.on(Command.play, () => {
      setPause(false);
    });

    // on iOS this event will also be triggered by audio router change events
    // happening when headphones are unplugged or a bluetooth audio peripheral disconnects from the device
    MusicControl.on(Command.pause, () => {
      setPause(true);
    });

    MusicControl.on(Command.stop, () => {});

    MusicControl.on(Command.nextTrack, () => {
      console.log('dsdsdsdsds');
      setAudio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3');
    });
  };

  const playAudio = () => {
    setPause(!pause);

    service();
  };

  console.log('dsdsdsds12d2s', audio, pause);
  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={{
          uri: audio,
        }} // Can be a URL or a local file.
        style={{width: 300, height: 300}}
        playInBackground={true}
        playWhenInactive
        paused={pause}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
      />
      <Button title="Start audio" onPress={playAudio} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
