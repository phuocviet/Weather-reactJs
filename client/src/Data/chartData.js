
export const minWidth = 400
export const height = (window.innerHeight *22) / 100;

export const chartData = [
    {
      tide: 2,
      hour: "Mon 12:00 pm",
      x: 0,
    },
    {
      tide: 2,
      hour: "Mon 6:00 am",
      x: minWidth,
    },
    {
      tide: 0.7,
      hour: "Mon 12:00 am",
      x: minWidth * 2,
    },
    {
      tide: 1.9,
      hour: "Mon 6:00 pm",
      x: minWidth * 3,
    },
    {
      tide: 0.9,
      hour: "Tue 12:00 pm",
      x: minWidth * 4,
    },
    {
      tide: 0.5,
      hour: "Tue 6:00 am",
      x: minWidth * 5,
    },
    {
      tide: 0.6,
      hour: "Tue 12:00 am",
      x: minWidth * 6,
    },
    {
      tide: 1.1,
      hour: "Tue 6:00 pm",
      x: minWidth * 7,
    },
    {
      tide: 0.8,
      hour: "Wed 12:00 pm",
      x: minWidth * 8,
    },
    {
      tide: 1.3,
      hour: "Wed 6:00 am",
      x: minWidth * 9,
    },
    {
      tide: 0.8,
      hour: "Wed 12:00 am",
      x: minWidth * 10,
    },
    {
      tide: 1.2,
      hour: "Wed 6:00 pm",
      x: minWidth * 11,
    },
    {
      tide: 0.8,
      hour: "Thur 12:00 pm",
      x: minWidth * 12,
    },
  ];
export const nightTime = [
  {
    x: 0,
    h: height,
    w: minWidth
  },
  {
    x: minWidth * 3,
    h: height,
    w: minWidth * 2
  },
  {
    x: minWidth * 7,
    h: height,
    w: minWidth * 2
  },
  {
    x: minWidth *11,
    h: height,
    w: minWidth
  },
]
export const ySunLevel = [ 0, 2, 0, -2, 0, 2, 0, -2, 0, 2, 0]
export const xSunLevel = [
    minWidth,
    minWidth * 2,
    minWidth * 3,
    minWidth * 4,
    minWidth * 5,
    minWidth * 6,
    minWidth * 7,
    minWidth * 8,
    minWidth * 9,
    minWidth * 10,
    minWidth * 11
]
export const xTideLevel = [
    0,
    minWidth,
    minWidth * 2,
    minWidth * 3,
    minWidth * 4,
    minWidth * 5,
    minWidth * 6,
    minWidth * 7,
    minWidth * 8,
    minWidth * 9,
    minWidth * 10,
    minWidth * 11,
    minWidth * 12
];

export const formatTime = (time) => {
  const fmTime = time % 24 
  const decimal = fmTime % 1
  const hr = Math.floor(fmTime)
  const min = Math.floor(60 * decimal)
  if (hr > 12){
    return `${hr -12}:${min>10? "" : "0"}${min}pm`
  }else if(hr === 0){
    return `${12}:${min > 10 ? "" : "0"}${min} pm`;
  }
  return `${hr}:${min > 10 ? "" : "0"}${min} am`;
};

export const convertScrollToTime = (scrollPercent) => {
  return scrollPercent * 60 + 6;
};