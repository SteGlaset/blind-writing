import logo from '~/assets/icons/logo.svg';
import cl from './Header.module.css';
import Container from '~/components/ui/Container/Container';

const Header = () => {
  return (
    <header>
      <Container className={cl.headerWrapper}>
        <img className={cl.logoIcon} src={logo} alt='Blind Writing Logo' />
        <h1 className={cl.logoTitle}>Blind Writing</h1>
      </Container>
    </header>
  );
};

export default Header;
