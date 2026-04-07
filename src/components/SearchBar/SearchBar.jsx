import { HiOutlineSearch } from "react-icons/hi"
import styles from "./SearchBar.module.css"

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.searchWrapper}>
      <HiOutlineSearch className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  )
}

export default SearchBar