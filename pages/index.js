import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import Header from '../components/Header';


const styles = {
  container: `h-full w-full flex flex-wrap flex-col bg-[#fff]`,
  main: `flex h-full w-full flex-col`
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.main}>
        <Main/>
      </div>
    </div>
  )
}
