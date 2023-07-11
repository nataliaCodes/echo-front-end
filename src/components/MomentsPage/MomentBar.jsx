import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { Range } = Slider;
const style = { width: 600, margin: 50 };
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const RangeWithTooptip = createSliderWithTooltip(Range);

export default function MomentBar(props) {

  const onSliderChange = (value) => {
    const min = value[0];
    const max = value[1];
    props.setVideoInfo(prev => ({ ...prev, startTime: min, endTime: max }));
  };

  const hrTime = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  return (
    <div style={style} >
      <RangeWithTooptip
        className="rangeSlider"
        defaultValue={[props.videoInfo.startTime, props.videoInfo.endTime]}
        value={[props.videoInfo.startTime, props.videoInfo.endTime || props.videoInfo.duration]}
        allowCross={false}
        onChange={onSliderChange}
        min={0}
        max={props.videoInfo.duration}
        tipFormatter={value => `${hrTime(value)}`}
      />
    </div>
  );
};
