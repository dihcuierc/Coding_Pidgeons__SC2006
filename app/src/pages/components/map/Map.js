import logo from '../../../assets/images/icons/logo.svg';
import styles from "../../../assets/css/app.module.css"
import picStyle from "../../../assets/css/Pic.module.css"

function Map() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <img src={logo} className={picStyle.logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={styles.link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React hee hee haa haa
        </a>
      </header>
    </div>
  );
}

export default Map;
