import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

function Loader() {
  return (
    <div className={s.loader}>
      <TailSpin color="#00BFFF" height={100} width={100} />
    </div>
  );
}

export default Loader;
