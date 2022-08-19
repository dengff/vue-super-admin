export const autoRows = (minRowHeight = '20px') =>
  `minmax(${minRowHeight}, auto)`;

export const frGetter = (value) => {
  value = value * 1;
  if (!value) return;
  return typeof value === 'number' ? `repeat(${value},  1fr` : value;
};

export const gap = ({gap = '8px'}) => gap;

export const flow = ({flow = 'row'}) => flow;

export const formatAreas = (areas) => {
  if (!areas) return;
  return areas.map((area) => `"${area}"`).join(' ');
};
