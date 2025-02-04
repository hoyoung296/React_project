import '../../css/main.css';

function HeaderCom({ onChange, mySubmit, input}) {
    return <>
        <header className='header_body'>
            <div className='logo'>MOVIE</div>
            <form onSubmit={mySubmit}>
                <input type="text" className='search' value={input.search} name="search" onChange={onChange} />
            </form>
            <div className='profile_img'>프사</div>
        </header>
    </>
};
export default HeaderCom;