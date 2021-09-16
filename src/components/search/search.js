import './search.css';

function Search() {
  return (
    <div>
      <input className="search" type="text" placeholder="Search by Name"/>
      <input className="search" type="text" placeholder="Search by Tag"/>
    </div>
  );
}

export default Search;
