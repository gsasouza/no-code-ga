const getColor = props => {
  if (!props.color) return props.theme.palette['primary'];
  if (['primary', 'secondary', 'accent'].includes(props.color)) return props.theme.palette[props.color || 'primary'];
  return props.color;
};

export default getColor;
