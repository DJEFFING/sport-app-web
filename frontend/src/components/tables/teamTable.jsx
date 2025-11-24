import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { getAllTeams } from "../../services/team/teamService";


function createData(name, tournament_name, max_capacity, current_capacity) {
  return { name, tournament_name, max_capacity, current_capacity };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function TeamTable() {
  const [teams, setTeams] = useState(rows);

    useEffect(() =>{
      const getTeams = async()=>{
        const response = await getAllTeams();
        // console.log("La liste des Equipes du backend : ",response)
        setTeams(response.results)
        
      };
      getTeams();
    },[])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mon</TableCell>
            <TableCell>Tournoi parent</TableCell>
            <TableCell>Capacité Maximal</TableCell>
            <TableCell align="right">Nbr jouer Inscrit</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Show</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.tournament_name}</TableCell>
              <TableCell align="right">{row.max_capacity}</TableCell>
              <TableCell align="right">{row.current_capacity}</TableCell>
              <TableCell align="right">
                <button className="btn btn-warning">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </TableCell>
              <TableCell align="right">
                <button className="btn btn-primary">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </TableCell>
              <TableCell align="right">
                {" "}
                <button className="btn btn-danger">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
