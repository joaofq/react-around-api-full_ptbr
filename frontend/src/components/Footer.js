function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">© {year} Around The U.S.</p>
    </footer>
  );
}

export default Footer;
