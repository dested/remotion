---
title: getAudioData()
id: get-audio-data
---

:::warning
This function is part of Remotion 2.0 which is not yet released. The information on this page might not yet accurately reflect the current state of Remotions API.
:::warning

_Part of the `@remotion/media-utils`_ package of helper functions.

Takes an audio `src`, loads it and returns data and metadata for the specified source.

## Arguments

### `src`

A string pointing to an audio asset.

## Return value

`Promise<AudioData>` - object with information about the audio data:

- `channelWaveforms`: `Float32Array[]` an array with waveform information for each channel.
- `sampleRate`: `number` How many samples per second each waveform contains.
- `durationInSeconds`: `number` The duration of the audio in seconds.
- `numberOfChannels`: `number` The number of channels contained in the audio files. This corresponds to the length of the `channelWaveforms` array.
- `resultId`: `string` Unique identifier of this audio data fetching call. Other functions can cache expensive operations if they get called with the same resultId multiple times.
- `isRemote`: Whether the audio was imported locally or from a different origin.

## Example

```tsx
import {getAudioData} from '@remotion/media-utils';
import music from './music.mp3';

await getAudioData(music); /* {
  channelWaveforms: [Float32Array(4410000), Float32Array(4410000)],
  sampleRate: 44100,
  durationInSeconds: 100.0000,
  numberOfChannels: 2,
  resultId: "0.432878981",
  isRemote: false
} */
await getAudioData('https://example.com/remote-audio.aac'); /* {
  channelWaveforms: [Float32Array(4800000)],
  sampleRate: 48000,
  durationInSeconds: 100.0000,
  numberOfChannels: 1,
  resultId: "0.432324444",
  isRemote: true
} */
```

## Caching behavior

This function is memoizing the results it returns.
If you pass in the same argument to `src` multiple times, it will return a cached version from the second time on, regardless of if the file has changed. To clear the cache, you have to reload the page.

## Alternatives

If you need only the duration, prefer [`getAudioDuration()`](get-audio-duration) which is faster because it doesn't need to read waveform data.

Use the [`useAudioData()`](use-audio-data) helper hook to not have to do state management yourself and to wrap the call in [`delayRender()`](delay-render).

## See also

- [Using audio](using-audio)
- [Audio visualization](audio-visualization)
- [`<Audio/>`](audio)