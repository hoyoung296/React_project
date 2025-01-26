import '../css/main.css';

function Header() {
    return (
    <header className='header_body'>
        <div className='logo'>MOVIE</div>
        <input type="text" className='search'/>
        <div className='profile_img'>프사</div>
    </header>
    )
};
export default Header;