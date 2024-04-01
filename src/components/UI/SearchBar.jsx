import TextField from "@mui/material/TextField";

export default function SearchBar(){
    return (
        <div>
          <div className="search">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
            />
          </div>
        </div>
      );
}