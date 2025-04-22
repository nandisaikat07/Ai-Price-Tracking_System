export default function MessageBox(props) {
  let color;
  switch (props.variant) {
    case 'danger':
      color = 'red';
      break;
    case 'success':
      color = 'green';
      break;
    default:
      color = 'blue';
  }

  return (
    <div className={`p-4 text-white bg-${color}-500 rounded-md`}>
      {props.children}
    </div>
  );
}
