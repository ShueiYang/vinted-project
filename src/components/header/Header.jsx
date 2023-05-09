import Navbar from "./NavBar";


const Header = ({token, handleToken, setSearch, user }) => {

  return (
    <header className="fixed w-full h-14 top-0 z-10 bg-[#fff]">
        <Navbar 
          token={token}
          user={user} 
          handleToken={handleToken}
          setSearch={setSearch}
        />     
    </header>
    
  )
}

export default Header;