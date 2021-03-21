// FFMPEG allows expressions to have a maximum depth of 100.
// As defined here: https://github.com/FFmpeg/FFmpeg/blob/2014b0135293c41d261757bfa1aaba51653bab8e/libavutil/eval.c#L706
// With one depth added by the if/else statement,
// this means we can have a maximum of 99 different volumes.
// Therefore we round the volumes (which can only be between 0 and 1)
// so that there are only 99 possible values.

export const MAX_FFMPEG_STACK_DEPTH = 99;

export const roundVolumeToAvoidStackOverflow = (volume: number): number => {
	return Number(
		(
			Math.round(volume * MAX_FFMPEG_STACK_DEPTH) / MAX_FFMPEG_STACK_DEPTH
		).toFixed(3)
	);
};