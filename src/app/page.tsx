import Image from "next/image";
import logo from "@/../public/mytourbuddy.svg";

const HomePage = () => {
  return (
    <div>
      <Image src={logo} alt="tourbuddy logo" width={100} height={100} />
      <p>Heyy im your tour buddy 🦧</p>
    </div>
  );
};

export default HomePage;
