import { useLocation, Link } from "react-router-dom";
import styles from "./MainScreen.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MainScreen() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  console.log(data);
  useEffect(() => {
    if (data === null) {
      navigate("/login");
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();

    const sendingData = {
      mail: data.mail,
    };

    console.log(data.mail);

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendingData),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/profile/",
        requestOption
      );
      if (response.ok) {
        const finalData = await response.json();
        console.log(finalData);
        navigate("/profileSettings", { state: finalData });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <div className={styles.div}>
        <Logo />
        <SearchBar />
        <Profile handleClick={handleClick} />
      </div>
      <hr />
      <div className={styles.picturePart}></div>
    </>
  );
}

function Logo() {
  return <div className={styles.divLogo}>Flip Memo</div>;
}

function SearchBar() {
  return (
    <div>
      <form>
        <input
          className={styles.inputSearch}
          type="text"
          placeholder="Search..."
        ></input>
      </form>
    </div>
  );
}

function Profile({ handleClick }) {
  return (
    // <div>
    //   <button onClick={handleClick} className={styles.profile}>
    //     Profile
    //   </button>
    // </div>
    <Link
      to="/profileSettings"
      onClick={handleClick}
      className={styles.profileSettings}
    >
      Profile
    </Link>
  );
}