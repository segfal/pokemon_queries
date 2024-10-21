import pokelogo from '../assets/pokelogo.webp'
import styled from 'styled-components';

const Navbar = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(0,0,0,0);
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;
const Logo = styled.img`
  width: 250px;
  height: auto;
`;

const Navigation: React.FC = () => {

    return (
        <Navbar>
            <Logo src={pokelogo} alt="Pokémon Logo" />
        </Navbar>
    )
}
export default Navigation;
