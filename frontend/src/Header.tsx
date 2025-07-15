import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
          <header className="site-header">
        <div className="logo">🦸 FlipHQ</div>
        <nav>
          <a href="/">Início</a>
          <a href="/products">HQs</a>
          <a href="/blog">Blog</a>
          <button className="btn-cta">Publicar minha HQ</button>
        </nav>
      </header>
    );
}