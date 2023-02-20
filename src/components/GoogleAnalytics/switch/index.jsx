import classNames from 'classnames';
import styles from './styles.module.css';

const Switch = ({ isOn, handleToggle, onColor = '#4c5abe', disabled = false }) => {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                className={styles.reactSwitchCheckbox}
                id={`react-switch-new`}
                type="checkbox"
                disabled={disabled}
            />
            <label
                style={{ background: isOn && onColor }}
                className={classNames(styles.reactSwitchLabel, { [styles.disabled]: disabled })}
                htmlFor={`react-switch-new`}
            >
                <span className={styles.reactSwitchButton} />
            </label>
        </>
    );
};

export default Switch;
